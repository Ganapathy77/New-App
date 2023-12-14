


import java.io.IOException;
import java.util.Iterator;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.adventnet.ds.query.*;
import com.adventnet.persistence.*;
import com.adventnet.mfw.bean.BeanUtil;
import org.json.JSONObject;

/**
 * Servlet implementation class Signup
 */
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Checking for username
		String username = request.getParameter("username");

		boolean isUniqueUserName = false;
		try{
			Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
			SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Userdetails"));
			selectQuery.addSelectColumn(Column.getColumn(null,"*"));
			Criteria criteria = new Criteria(Column.getColumn("Userdetails", "USER_NAME"),username, 0);
			selectQuery.setCriteria(criteria);
			DataObject dataObject = persistence.get(selectQuery);
			Iterator iterator = dataObject.getRows("Userdetails");
			if (!iterator.hasNext()){
				isUniqueUserName = true;
			}
		}catch (Exception e){
			System.out.println("Exception while checking whether the username is unique ...");
			e.printStackTrace();
		}

		//Checking for unique email
		String user_email = request.getParameter("useremail");

		boolean isUniqueUserEmail = false;
		if(isUniqueUserName){
			try{
				Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
				SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Userdetails"));
				selectQuery.addSelectColumn(Column.getColumn(null,"*"));
				Criteria criteria = new Criteria(Column.getColumn("Userdetails", "USER_EMAIL"),user_email, 0);
				selectQuery.setCriteria(criteria);
				DataObject dataObject = persistence.get(selectQuery);
				Iterator iterator = dataObject.getRows("Userdetails");
				if (!iterator.hasNext()){
					isUniqueUserEmail = true;
				}
			}catch (Exception e){
				System.out.println("Exception while checking whether the user_email is unique ...");
				e.printStackTrace();
			}
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("isUniqueUser" , isUniqueUserName);
		jsonObject.put("isUniqueEmail", isUniqueUserEmail);
		boolean isSuccess = false;
		if(isUniqueUserName && isUniqueUserEmail){
			String password = request.getParameter("password");
			try{

				System.out.println(username + password);
				Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
				DataObject dataObject = persistence.constructDataObject();
				Row row = new Row("Userdetails");
				row.set("USER_NAME", username);
				row.set("PASSWORD", password);
				row.set("USER_EMAIL", user_email);
				dataObject.addRow(row);
				persistence.update(dataObject);
				isSuccess = true;
			}catch (Exception e){
				System.out.println("Exception while inserting username and password into the DB ...");
				e.printStackTrace();
				isSuccess = false;
			}
		}
		jsonObject.put("isSuccess", isSuccess);
		response.getWriter().print(jsonObject);
		response.addHeader("Access-Control-Allow-Origin" , "*");
		response.setContentType("application/json");
		}
	}
