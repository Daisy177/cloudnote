package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.NotebookType;

import java.util.List;

public interface NotebookTypeDao {
    NotebookType findNormal();
    List<NotebookType> findSpecial();
}
