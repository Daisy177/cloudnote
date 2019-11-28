package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.Activity;
import com.oracle.hrb.cloudnote.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    @Autowired
    private ActivityService activityService;
    @GetMapping
    public List<Activity> activityList(){
        //System.out.println("执行活动控制层");
        return activityService.activityList();
    }
}
