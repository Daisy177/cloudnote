package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.Favorites;

import java.util.List;

public interface FavoritesDao {
    void add(Favorites favorites);
    List<Favorites> findByNotebookId(String id);
    void delete(String id);
    Favorites findOne(Favorites favorites);
}
