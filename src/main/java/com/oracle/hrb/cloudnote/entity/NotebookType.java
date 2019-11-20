package com.oracle.hrb.cloudnote.entity;

public class NotebookType {
    private String id;
    private String name;
    private String tDesc;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String gettDesc() {
        return tDesc;
    }

    public void settDesc(String tDesc) {
        this.tDesc = tDesc;
    }

    @Override
    public String toString() {
        return "NotebookType{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", tDesc='" + tDesc + '\'' +
                '}';
    }
}
