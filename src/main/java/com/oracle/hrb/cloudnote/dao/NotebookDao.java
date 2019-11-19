package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.Notebook;

import java.util.List;

public interface NotebookDao {
    void add(Notebook notebook);
    void update(Notebook notebook);
    void delete(String id);
    List<Notebook> findByUserSpecial(String userId);
    List<Notebook> findByUserNormal(String userId);
}
