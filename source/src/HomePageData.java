

import com.adventnet.ds.query.*;
import com.adventnet.mfw.bean.BeanUtil;
import com.adventnet.persistence.DataObject;
import com.adventnet.persistence.Persistence;
import com.adventnet.persistence.Row;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class HomePageData extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected  void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HomePageData Servlet called ...");
        JSONArray resultArr = new JSONArray();
        JSONObject result = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        boolean isSuccess = false;
        try{
            Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
            SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Videodetails"));
            selectQuery.addSelectColumn(Column.getColumn(null, "*"));
            DataObject dataObject = persistence.get(selectQuery);
            Iterator iterator = dataObject.getRows("Videodetails");
            while (iterator.hasNext()){
                JSONObject jsonObject = new JSONObject();
                Row row = (Row)iterator.next();
                jsonObject.put("id",row.get("VIDEO_ID"));
                jsonObject.put("thumbnail",row.get("VIDEO_THUMBNAIL"));
                jsonObject.put("url",row.get("VIDEO_URL"));
                jsonObject.put("summary",row.get("VIDEO_SUMMARY"));
                jsonObject.put("title",row.get("VIDEO_TITLE"));
                jsonObject.put("uploaded-by",row.get("UPLOADED_BY"));
                jsonObject.put("private-public",row.get("PRIVATE_PUBLIC"));
                jsonObject.put("uploaded-by",row.get("UPLOADED_BY"));
                jsonObject.put("uploaded-on",row.get("UPLOADED_ON"));
                jsonObject.put("views",row.get("VIEWS"));
                jsonArray.put(jsonObject);
                isSuccess = true;
                System.out.println("Videodetails : " + jsonArray);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        try{
            Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
            SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Indexvideodetails"));
            selectQuery.addSelectColumn(Column.getColumn(null, "*"));
            DataObject dataObject = persistence.get(selectQuery);
            Iterator iterator = dataObject.getRows("Indexvideodetails");
            while (iterator.hasNext()){
                JSONObject jsonObject = new JSONObject();
                Row row = (Row)iterator.next();
                jsonObject.put("id",row.get("VIDEO_ID"));
                jsonObject.put("thumbnail",row.get("VIDEO_THUMBNAIL"));
                jsonObject.put("url",row.get("VIDEO_URL"));
                jsonObject.put("summary",row.get("VIDEO_SUMMARY"));
                jsonObject.put("title",row.get("VIDEO_TITLE"));
                jsonObject.put("uploaded-by",row.get("UPLOADED_BY"));
                jsonObject.put("private-public",row.get("PRIVATE_PUBLIC"));
                jsonObject.put("uploaded-on",row.get("UPLOADED_ON"));
                jsonObject.put("views",row.get("VIEWS"));
                jsonArray.put(jsonObject);
                isSuccess = true;
                System.out.println("Indexvideodetails : " + jsonArray);
            }
        }catch (Exception e) {
            e.printStackTrace();
            isSuccess = true;
        }
        System.out.println("Jsonarr length : " + jsonArray.length());
        ArrayList<JSONObject> listArr = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            listArr.add((JSONObject) jsonArray.get(i));
        }
        System.out.println("list length : " + listArr.size());
        Collections.shuffle(listArr);
        for (int i = 0; i < listArr.size(); i++) {
            resultArr.put(listArr.get(i));
        }
        System.out.println("Resultarr length : " + resultArr.length());
        result.put("isSuccess", isSuccess);
        result.put("resultData", resultArr);
        response.getWriter().print(result);
        response.addHeader("Access-Control-Allow-Origin" , "*");
        response.setContentType("application/json");
    }
}
