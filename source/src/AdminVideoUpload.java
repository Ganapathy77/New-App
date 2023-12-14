


import java.io.IOException;
import java.util.Iterator;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.adventnet.ds.query.*;
import com.adventnet.persistence.*;
import com.adventnet.mfw.bean.BeanUtil;
import org.json.JSONObject;

/**
 * Servlet implementation class Signup
 */
public class AdminVideoUpload extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //Checking for username
        String video_title = request.getParameter("video-title");
        System.out.println("Video Title is : " + video_title);

        boolean isUniqueVideoTitle = false;
        try{
            Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
            SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Indexvideodetails"));
            selectQuery.addSelectColumn(Column.getColumn(null,"*"));
            Criteria criteria = new Criteria(Column.getColumn("Indexvideodetails", "VIDEO_TITLE"),video_title, 0);
            selectQuery.setCriteria(criteria);
            DataObject dataObject = persistence.get(selectQuery);
            Iterator iterator = dataObject.getRows("Indexvideodetails");
            if (!iterator.hasNext()){
                isUniqueVideoTitle = true;
            }
        }catch (Exception e){
            System.out.println("Exception while checking whether the video title is unique ...");
            e.printStackTrace();
        }
        if(isUniqueVideoTitle){
            try{
                Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
                SelectQuery selectQuery = new SelectQueryImpl(Table.getTable("Videodetails"));
                selectQuery.addSelectColumn(Column.getColumn(null,"*"));
                Criteria criteria = new Criteria(Column.getColumn("Videodetails", "VIDEO_TITLE"),video_title, 0);
                selectQuery.setCriteria(criteria);
                DataObject dataObject = persistence.get(selectQuery);
                Iterator iterator = dataObject.getRows("Videodetails");
                if (!iterator.hasNext()){
                    isUniqueVideoTitle = true;
                }
                else{
                    isUniqueVideoTitle = false;
                }
            }catch (Exception e){
                System.out.println("Exception while checking whether the video title is unique ...");
                e.printStackTrace();
            }
        }
        JSONObject jsonObject = new JSONObject();
        boolean isSuccess = false;
        if(isUniqueVideoTitle){
            try{
                String username = "Admin";
                String video_url = request.getParameter("video-url");
                String video_summary = request.getParameter("video-summary");
                String video_thumbnail = request.getParameter("video-thumbnail");
                String private_public = request.getParameter("private-public");
                String uploadedOn = Long.toString(System.currentTimeMillis());
                System.out.println(username);
                System.out.println(video_title+ " " + video_summary + " " + video_thumbnail + " "+ video_url + " " + private_public + " " + username );

                Persistence persistence = (Persistence) BeanUtil.lookup("Persistence");
                DataObject dataObject = persistence.constructDataObject();
                Row row = new Row("Indexvideodetails");
                row.set("UPLOADED_BY", username);
                row.set("VIDEO_TITLE", video_title);
                row.set("VIDEO_URL", video_url);
                row.set("VIDEO_THUMBNAIL", video_thumbnail);
                row.set("VIDEO_SUMMARY", video_summary);
                row.set("PRIVATE_PUBLIC",private_public);
                row.set("UPLOADED_ON",uploadedOn);
                dataObject.addRow(row);
                persistence.update(dataObject);
                System.out.println(row);
                System.out.println(video_title+ " " + video_summary + " " + video_thumbnail + " "+ video_url + " " + private_public + " " + username );
//				dataObject.updateRow(row);
                System.out.println(dataObject);
//				persistence.update(dataObject);
                System.out.println(persistence);
                isSuccess = true;
            }catch (Exception e){
                System.out.println("Exception while inserting video details into the DB ...");
                e.printStackTrace();
            }
        }
        jsonObject.put("isSuccess", isSuccess);
        response.getWriter().print(jsonObject);
        response.addHeader("Access-Control-Allow-Origin" , "*");
        response.setContentType("application/json");
    }
}
