package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.User;

public interface UserDao {
    void add(User user);
    void update(User user);
    User findById(String id);
    User findByName(String name);
    User findByNickname(String name);
}
