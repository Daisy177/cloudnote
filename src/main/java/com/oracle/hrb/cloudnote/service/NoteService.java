package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.NoteDao;
import com.oracle.hrb.cloudnote.entity.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    @Autowired
    private NoteDao noteDao;

    @Transactional
    public void addNote(Note note){
        if(note.getTitle()==null||note.getTitle().trim().length()==0){
            note.setTitle("新建笔记");
        }
        note.setId(UUID.randomUUID().toString());
        note.setModifyTime(new Date());
        noteDao.add(note);
    }
    @Transactional
    public void updateNote(Note note){
        if(note.getTitle()==null||note.getTitle().trim().length()==0){
            note.setTitle("新建笔记");
        }
        note.setModifyTime(new Date());
        noteDao.update(note);
    }
    @Transactional
    public void deleteNote(String id){
        noteDao.delete(id);
    }
    @Transactional
    public void deleteByNotebookIdNote(String notebookId){
        noteDao.deleteByNotebookId(notebookId);
    }
    @Transactional
    public void moveNote(Note note){
        noteDao.move(note);
    }
    @Transactional
    public List<Note> noteList(String notebookId){
        return noteDao.findByNotebookId(notebookId);
    }
}
