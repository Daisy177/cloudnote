package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.ActivityNoteDao;
import com.oracle.hrb.cloudnote.dao.UpDownDao;
import com.oracle.hrb.cloudnote.entity.ActivityNote;
import com.oracle.hrb.cloudnote.entity.Share;
import com.oracle.hrb.cloudnote.entity.UpDown;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ActivityNoteService {
    @Autowired
    private ActivityNoteDao activityNoteDao;
    @Autowired
    private ShareService shareService;
    @Autowired
    private UpDownDao upDownDao;

    @Transactional
    public boolean addActivityNote(String activityId, String noteId, String userName) {
        ActivityNote an = new ActivityNote();
        an.setActivityId(activityId);
        if (shareService.findByNoteId(noteId) == null) {
            boolean b = shareService.addShare(noteId, userName);
            if (b == false) {
                return false;
            }
        }
        Share share = shareService.findByNoteId(noteId);
        an.setShare(share);
        ActivityNote activityNote = activityNoteDao.findByActivityIdAndShareId(an);
        if (activityNote != null) {
            return false;
        }
        an.setId(UUID.randomUUID().toString());
        activityNoteDao.add(an);
        return true;
    }

    @Transactional
    public List<Map<String,Object>> activityNoteList(String activityId, String userId) {
        List<ActivityNote> list = activityNoteDao.findByActivityId(activityId);
        List result = new ArrayList();
        for (ActivityNote an:list){
            UpDown ud = new UpDown();
            ud.setActivityNoteId(an.getId());
            ud.setState(1);
            an.setUp(upDownDao.countState(ud));
            ud.setState(2);
            an.setDown(upDownDao.countState(ud));
            ud.setUserId(userId);
            UpDown upDown = upDownDao.findByActivityNoteIdAndUserId(ud);
            Map<String,Object> map = new HashMap<>();
            map.put("activityNote",an);
            map.put("upDown",upDown);
            result.add(map);
        }
        return result;
    }
}
