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

public class PlayPageData extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected  void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        System.out.println("Load video called ");
        String video_id = request.getParameter("video-id");
        String uploaded_by = request.getParameter("uploaded-by");
        boolean isLoggedIn = Boolean.parseBoolean(request.getParameter("isLoggedIn"));
        String tableName = "Videodetails";
        if(uploaded_by.equals("Admin")){
            tableName = "Indexvideodetails";
        }
        System.out.println("Video id got : " + video_id);
        JSONObject result = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        boolean isSuccess = false;
        try{
            Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
            SelectQuery selectQuery = new SelectQueryImpl(Table.getTable(tableName));
            selectQuery.addSelectColumn(Column.getColumn(null, "*"));
            Criteria criteria = new Criteria(Column.getColumn(tableName ,"VIDEO_ID"), video_id, 0);
            criteria = criteria.and(new Criteria(Column.getColumn(tableName, "UPLOADED_BY"),uploaded_by, 0));
            selectQuery.setCriteria(criteria);
            System.out.println("Criteria : " + criteria);
            System.out.println("selectquery : " + selectQuery);
            DataObject dataObject = persistence.get(selectQuery);
            System.out.println("dataobject : " + dataObject);
            Iterator iterator = dataObject.getRows(tableName);
            while (iterator.hasNext()){
                JSONObject jsonObject = new JSONObject();
                Row row = (Row) iterator.next();
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
                System.out.println("Video from " + tableName + " table" + jsonArray + jsonObject );
                isSuccess = true;
                int views = Integer.parseInt((String) row.get("VIEWS"));
                views = ++views;
                System.out.println(views);
                row.set("VIEWS", views);
                dataObject.updateRow(row);
                persistence.update(dataObject);
                jsonObject.put("views", views);
                jsonArray.put(jsonObject);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("isSuccess after " + tableName + " : " + isSuccess);
//        if(!isSuccess){
//            try{
//                Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
//                SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Indexvideodetails"));
//                selectQuery.addSelectColumn(Column.getColumn(null, "*"));
//                Criteria criteria = new Criteria(Column.getColumn("Indexvideodetails" ,"VIDEO_ID"), video_id, 0);
//                criteria = criteria.and(new Criteria(Column.getColumn("Indexvideodetails" , "UPLOADED_BY"), uploaded_by, 0));
//                selectQuery.setCriteria(criteria);
//                System.out.println("Criteria : " + criteria);
//                System.out.println("selectquery : " + selectQuery);
//                DataObject dataObject = persistence.get(selectQuery);
//                System.out.println("dataobject : " + dataObject);
//                Iterator iterator = dataObject.getRows("Indexvideodetails");
//                if (iterator.hasNext()){
//                    JSONObject jsonObject = new JSONObject();
//                    Row row = (Row) iterator.next();
//                    jsonObject.put("id",row.get("VIDEO_ID"));
//                    jsonObject.put("thumbnail",row.get("VIDEO_THUMBNAIL"));
//                    jsonObject.put("url",row.get("VIDEO_URL"));
//                    jsonObject.put("summary",row.get("VIDEO_SUMMARY"));
//                    jsonObject.put("title",row.get("VIDEO_TITLE"));
//                    jsonObject.put("uploaded-by",row.get("UPLOADED_BY"));
//                    jsonObject.put("private-public",row.get("PRIVATE_PUBLIC"));
//                    jsonObject.put("uploaded-by",row.get("UPLOADED_BY"));
//                    jsonObject.put("uploaded-on",row.get("UPLOADED_ON"));
//                    jsonObject.put("views",row.get("VIEWS"));
//
//                    System.out.println("Video from Indexvideodetails table" + jsonArray + jsonObject );
//                    isSuccess = true;
//                    int views = Integer.parseInt((String) row.get("VIEWS"));
//                    views = ++views;
//                    System.out.println(views);
//                    row.set("VIEWS", views);
//                    dataObject.updateRow(row);
//                    persistence.update(dataObject);
//                    jsonObject.put("views", views);
//                    jsonArray.put(jsonObject);
//                }
//
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//        }
        if(isSuccess){
            System.out.println("isSuccess after Indexvideodetails : " + isSuccess);
        }
        result.put("isSuccess", isSuccess);
        result.put("playVideoData", jsonArray.get(0));
        JSONObject recommendedVideosData =  getRecommendedVideoData(isLoggedIn);
        result.put("isRecommendedSuccess", recommendedVideosData.get("isRecommendedSuccess"));
        result.put("recommendedVideoData", recommendedVideosData.get("recommendedVideoData"));
        response.getWriter().print(result);
        response.addHeader("Access-Control-Allow-Origin" , "*");
        response.setContentType("application/json");
    }
    private JSONObject getRecommendedVideoData(boolean isLoggedIn) {
        System.out.println("HomePageData Servlet called ...");
        JSONArray resultArr = new JSONArray();
        JSONObject result = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        boolean isSuccess = false;
        if(isLoggedIn) {
            try {
                Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
                SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Videodetails"));
                selectQuery.addSelectColumn(Column.getColumn(null, "*"));
                DataObject dataObject = persistence.get(selectQuery);
                Iterator iterator = dataObject.getRows("Videodetails");
                while (iterator.hasNext()) {
                    JSONObject jsonObject = new JSONObject();
                    Row row = (Row) iterator.next();
                    jsonObject.put("id", row.get("VIDEO_ID"));
                    jsonObject.put("thumbnail", row.get("VIDEO_THUMBNAIL"));
                    jsonObject.put("url", row.get("VIDEO_URL"));
                    jsonObject.put("summary", row.get("VIDEO_SUMMARY"));
                    jsonObject.put("title", row.get("VIDEO_TITLE"));
                    jsonObject.put("uploaded-by", row.get("UPLOADED_BY"));
                    jsonObject.put("private-public", row.get("PRIVATE_PUBLIC"));
                    jsonObject.put("uploaded-by", row.get("UPLOADED_BY"));
                    jsonObject.put("uploaded-on", row.get("UPLOADED_ON"));
                    jsonObject.put("views", row.get("VIEWS"));
                    jsonArray.put(jsonObject);
                    isSuccess = true;
                    System.out.println("Videodetails : " + jsonArray);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
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
        result.put("isRecommendedSuccess", isSuccess);
        result.put("recommendedVideoData", resultArr);
        return result;
    }
}
