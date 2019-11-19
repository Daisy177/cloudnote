package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.UserDao;
import com.oracle.hrb.cloudnote.entity.User;
import com.oracle.hrb.cloudnote.utils.SHA256Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserDao userdao;

    @Transactional(readOnly = true)
    public Map<String,Object> login(String name,String password){
        Map<String,Object> result=new HashMap<>();
        if(name==null||name.trim().length()==0){
            result.put("success",false);
            result.put("name_null",true);
            return result;
        }
        if(password==null||password.trim().length()==0){
            result.put("success",false);
            result.put("password_null",true);
            return result;
        }
        User user=userdao.findByName(name);
        password= SHA256Util.sha256(password);
        password= SHA256Util.sha256(password);
        if(user==null||!user.getPassword().equals(password)){
            result.put("success",false);
            result.put("name_password_error",true);
            return result;
        }
        result.put("success",true);
        result.put("user",user);
        return result;
    }
    @Transactional
    public Map<String,Object> register(String name,String nickname,String password){
        Map<String,Object> result=new HashMap<>();
        if(name==null||name.trim().length()==0){
            result.put("success",false);
            result.put("name_null",true);
            return result;
        }
        if(nickname==null||nickname.trim().length()==0){
            result.put("success",false);
            result.put("nickname_null",true);
            return result;
        }
        if(password==null||password.trim().length()==0){
            result.put("success",false);
            result.put("password_null",true);
            return result;
        }
        User user=userdao.findByName(name);
        if(user!=null){
            result.put("success",false);
            result.put("name_repeat",true);
            return result;
        }
        User u=new User();
        u.setId(UUID.randomUUID().toString());
        u.setName(name);
        u.setNickname(nickname);
        password= SHA256Util.sha256(password);
        password= SHA256Util.sha256(password);
        u.setPassword(password);
        userdao.add(u);
        result.put("success",true);
        return result;
    }
    @Transactional
    public void changePassword(String userId, String newPassword){
        newPassword= SHA256Util.sha256(newPassword);
        newPassword= SHA256Util.sha256(newPassword);
        User u=new User();
        u.setId(userId);
        u.setPassword(newPassword);
        userdao.update(u);
    }
    @Transactional
    public boolean checkName(String name){
        return userdao.findByName(name)==null;
    }
}
