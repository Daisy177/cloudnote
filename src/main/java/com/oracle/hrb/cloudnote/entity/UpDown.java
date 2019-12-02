package com.oracle.hrb.cloudnote.entity;

public class UpDown {
    private String id;
    private String activityNoteId;
    private String userId;
    private int state;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getActivityNoteId() {
        return activityNoteId;
    }

    public void setActivityNoteId(String activityNoteId) {
        this.activityNoteId = activityNoteId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "UpDown{" +
                "id='" + id + '\'' +
                ", activityNoteId='" + activityNoteId + '\'' +
                ", userId='" + userId + '\'' +
                ", state=" + state +
                '}';
    }
}
