package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.FavoritesDao;
import com.oracle.hrb.cloudnote.entity.Favorites;
import com.oracle.hrb.cloudnote.entity.Share;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class FavoritesService {
    @Autowired
    private FavoritesDao favoritesDao;
@Transactional
    public boolean favorites(String notebookId,String shareId){
        Favorites favorites = new Favorites();
        favorites.setNotebookId(notebookId);
        Share share = new Share();
        share.setId(shareId);
        favorites.setShare(share);
        Favorites one =favoritesDao.findOne(favorites);
        if (one !=null){
            return false;
        }
        favorites.setId(UUID.randomUUID().toString());
        favoritesDao.add(favorites);
        return true;
    }
    @Transactional
    public List<Favorites> favoritesList(String notenookId){
        return favoritesDao.findByNotebookId(notenookId);
    }
}
