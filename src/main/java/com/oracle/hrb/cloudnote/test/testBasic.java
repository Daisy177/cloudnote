package com.oracle.hrb.cloudnote.test;

import com.oracle.hrb.cloudnote.utils.Md5Util;
import com.oracle.hrb.cloudnote.utils.SHA256Util;
import org.junit.jupiter.api.Test;

import java.util.UUID;

public class testBasic {
    @Test
    public void testMD5(){
        String password="123456";
        password= Md5Util.md5(password);
        System.out.println(password);
        //加盐
        password= Md5Util.md5(password);
        System.out.println(password);
    }
    @Test
    public void testSHA256(){
        String password="123456";
        password= SHA256Util.sha256(password);
        System.out.println(password);
        String s="7f64a9df5ca456562778b9b7cfe4b1f83b8ca2d821f2a837b68d4d9a033378cd";
        System.out.println(s.length());
    }
    @Test
    public void testUUID(){
        String id= UUID.randomUUID().toString();
        //所有字符串的修改都要用变量接一下
        id=id.replace("-","");
        System.out.println(id);
    }
}
