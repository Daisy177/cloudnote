package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.ActivityDao;
import com.oracle.hrb.cloudnote.entity.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityDao activityDao;

    @Transactional(readOnly = true)
    public List<Activity> activityList() {
        //System.out.println("执行活动");
        return activityDao.findAll();
    }

}
