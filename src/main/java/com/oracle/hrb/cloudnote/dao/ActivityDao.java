package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.Activity;

import java.util.List;

public interface ActivityDao {
    List<Activity> findAll();
}
