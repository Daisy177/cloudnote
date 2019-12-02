package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.ActivityNote;

import java.util.List;

public interface ActivityNoteDao {
    void add(ActivityNote activityNote);
    List<ActivityNote> findByActivityId(String id);
    ActivityNote findByActivityIdAndShareId(ActivityNote activityNote);
}
