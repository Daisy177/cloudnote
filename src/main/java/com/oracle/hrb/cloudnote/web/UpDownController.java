package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.UpDown;
import com.oracle.hrb.cloudnote.entity.User;
import com.oracle.hrb.cloudnote.service.UpDownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/upDown")
public class UpDownController {
    @Autowired
    private UpDownService upDownService;

    @PostMapping
    public void changeState(UpDown upDown, HttpSession session){
        User user = (User) session.getAttribute("user");
        upDown.setUserId(user.getId());
        upDownService.state(upDown);
    }
}
