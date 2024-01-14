package lk.ijse.posbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.posbackend.dto.UserDTO;
import lk.ijse.posbackend.util.CrudUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@WebServlet(name = "User", urlPatterns = "/user", loadOnStartup = 4)
public class UserController extends HttpServlet {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean isVerified = false;
        try {
            isVerified = CrudUtil.getInstance().checkUser(req.getParameter("username"), req.getParameter("password"));
            if(isVerified){
                logger.info("User Verified");
            }else{
                logger.info("User Not Verified");
            }

        }catch (Exception e){
            e.printStackTrace();
            logger.error("User Not Verified - Error");
        }finally {
            resp.getWriter().write(isVerified ? "verified" : "not verified");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean isSaved = false;
        try {
            UserDTO user = objectMapper.readValue(req.getInputStream(), UserDTO.class);

            isSaved = CrudUtil.getInstance().save(UserDTO.class, user.getEmail(), user.getUsername(), user.getPassword());
            if(isSaved){
                logger.info("User Saved");
            }else{
                logger.info("User Not Saved");
            }

        }catch (Exception e){
            e.printStackTrace();
            logger.error("User Not Saved - Error");
        }finally {
            resp.getWriter().write(isSaved ? "saved" : "not saved");
        }
    }
}
