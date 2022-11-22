package com.Music.Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MusicController {

    @GetMapping("/music_add")
    public String musicAdd() {
        return "music_add";
    }
    
    @GetMapping("/music_post")
    public String musicPost() {
        return "music_post";
    }

    @GetMapping("/music_update")
    public String musicUpdate() {
        return "music_update";
    }

    @GetMapping("/{type}/{value}")
    public String loadCollections(@PathVariable String type, @PathVariable String value) {
        return "index";
    }
}
