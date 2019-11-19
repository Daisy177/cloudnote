package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.User;
import com.oracle.hrb.cloudnote.service.UserService;
import com.oracle.hrb.cloudnote.utils.SHA256Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public Object login(String name, String password, HttpSession session) {
        //System.out.println(name);
        Map<String, Object> result = userService.login(name, password);
        session.setAttribute("user",result.get("user"));
        return result;
    }

    @RequestMapping("/reg")
    public Object register(String name, String nickname,String password) {
        Map<String, Object> result = userService.register(name,nickname,password);
        return result;
    }

    @RequestMapping("/changePassword")
    public Object changePassword(String userId, String lastPassword,String newPassword, HttpSession session) {
        Map<String, Object> result =new HashMap<>();
        User user= (User) session.getAttribute("user");
        lastPassword= SHA256Util.sha256(lastPassword);
        lastPassword= SHA256Util.sha256(lastPassword);
        if(user==null||!user.getId().equals(userId)){
            result.put("success",false);
            result.put("authority",false);
        }else  if(!user.getPassword().equals(lastPassword)){
            result.put("success",false);
            result.put("last_password_error",true);
        }else{
            userService.changePassword(userId,newPassword);
            result.put("success",true);
        }
        return result;
    }

    @RequestMapping("/logout")
    public Object logout(HttpSession session) {
        session.invalidate();
        return true;
    }

    @RequestMapping("/checkName")
    public Object checkName(String name) {
        return userService.checkName(name);
    }
}
