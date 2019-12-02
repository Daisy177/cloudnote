package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.UpDown;

public interface UpDownDao {
    void add(UpDown upDown);
    void update(UpDown upDown);
    UpDown findByActivityNoteIdAndUserId(UpDown upDown);
    int countState(UpDown upDown);
}
