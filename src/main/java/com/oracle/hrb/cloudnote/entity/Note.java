package com.oracle.hrb.cloudnote.entity;

import java.util.Date;

public class Note {
     private String id;
     private String notebookId;
     private String title;
     private String body;
     private Date modifyTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNotebookId() {
        return notebookId;
    }

    public void setNotebookId(String notebookId) {
        this.notebookId = notebookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    @Override
    public String toString() {
        return "Note{" +
                "id='" + id + '\'' +
                ", notebookId='" + notebookId + '\'' +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", modifyTime=" + modifyTime +
                '}';
    }
}
