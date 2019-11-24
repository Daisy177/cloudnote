package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.Notebook;
import com.oracle.hrb.cloudnote.entity.User;
import com.oracle.hrb.cloudnote.service.NotebookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notebook")
public class NotebookController {
    @Autowired
    private NotebookService notebookService;
    @GetMapping
    public Object notebookList(HttpSession session){
        User user = (User) session.getAttribute("user");
        List<Notebook> special = notebookService.findSpecial(user.getId());
        List<Notebook> normal = notebookService.findNormal(user.getId());
        Map<String,Object> result=new HashMap<>();
        result.put("special",special);
        result.put("normal",normal);
        return result;
    }
    @GetMapping("/normal")
    public Object normalNotebookList(HttpSession session){
        User user = (User) session.getAttribute("user");
        List<Notebook> normal = notebookService.findNormal(user.getId());
        return normal;
    }
    @PostMapping
    public Object addNotebook(String name,HttpSession session){
        User user = (User) session.getAttribute("user");
        Map<String,Object> result=notebookService.addNotebook(name,user.getId());
        return result;
    }
    @PutMapping
    public Object updateNotebook(Notebook notebook,HttpSession session){
        User user = (User) session.getAttribute("user");
        notebook.setUserId(user.getId());
        Map<String,Object> result=notebookService.updateNotebook(notebook);
        return result;
    }
    @DeleteMapping
    public void deleteNotebook(String id){
        notebookService.deleteNotebook(id);
    }
}
