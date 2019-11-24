package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.Note;
import com.oracle.hrb.cloudnote.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/note")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping
    public Object noteList(String notebookId){
        return noteService.noteList(notebookId);
    }

    @PostMapping
    public Object addNote(Note note){
        noteService.addNote(note);
        return note;
    }

    @PutMapping
    public Object updateNote(Note note){
        noteService.updateNote(note);
        return note;
    }

    @PutMapping("/move")
    public void moveNote(Note note){
        noteService.moveNote(note);
    }
}
