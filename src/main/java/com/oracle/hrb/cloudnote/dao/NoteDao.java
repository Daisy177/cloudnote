package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.Note;

import java.util.List;

public interface NoteDao {
    void add(Note note);
    void update(Note note);
    void delete(String id);
    void deleteByNotebookId(String notebookId);
    void move(Note note);
    List<Note> findByNotebookId(String id);
}
