
import com.adventnet.ds.query.*;
import com.adventnet.mfw.bean.BeanUtil;
import com.adventnet.persistence.DataObject;
import com.adventnet.persistence.Persistence;
import com.adventnet.persistence.Row;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;





public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username + password);
		JSONObject jsonObject = new JSONObject();
		boolean isLoginSuccess = false;
		String usernameFromDB = "", userEmialFromDB = "", passwordFromDB;
		try{
			Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
			SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Userdetails"));
			selectQuery.addSelectColumn(Column.getColumn(null,"*"));
			Criteria criteria = new Criteria(Column.getColumn("Userdetails", "USER_NAME"),username, 0);
			criteria = criteria.or(new Criteria(Column.getColumn("Userdetails", "USER_EMAIL"),username, 0));
			selectQuery.setCriteria(criteria);
			DataObject dataObject = persistence.get(selectQuery);
			Iterator iterator = dataObject.getRows("Userdetails");
			while (iterator.hasNext()){
				Row row = (Row)iterator.next();
				usernameFromDB = (String) row.get("USER_NAME");
				userEmialFromDB = (String) row.get("USER_EMAIL");
				passwordFromDB = (String) row.get("PASSWORD");
				if((username.equals(usernameFromDB) || username.equals(userEmialFromDB)) && password.equals(passwordFromDB)){
					isLoginSuccess = true;
					System.out.println("Valid user ... : User entered credentials : Username - " + username + ", Password - " + password + " ::: Credentials matched from DB : UsernameFromDB - " + usernameFromDB + ", UserEmailFromDB - " + userEmialFromDB + ", PasswordFromDB - " + passwordFromDB);
					break;
				}
			}
			if(!isLoginSuccess){
				System.out.println("No such user matched ...");
			}
			jsonObject.put("isLoginSuccess",isLoginSuccess);
			jsonObject.put("username",usernameFromDB);
			jsonObject.put("email",userEmialFromDB);
		} catch (Exception e){
			System.out.println("Exception while validating user credentials with the DB ...");
			e.printStackTrace();
		}

		if(isLoginSuccess){
			response.getWriter().print(jsonObject);
		}

		else {
			response.getWriter().print(jsonObject);
		}
		response.addHeader("Access-Control-Allow-Origin" , "*");
		response.setContentType("application/json");
	}

}
