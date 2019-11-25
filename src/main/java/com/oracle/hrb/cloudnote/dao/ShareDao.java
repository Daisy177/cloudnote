package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.Share;

import java.util.List;

public interface ShareDao {
    void add(Share share);
    List<Share> findLikeTitle(String title);
}
