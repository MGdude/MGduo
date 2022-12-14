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

    @GetMapping("/music_update/{musicId}")
    public String musicUpdate(@PathVariable int musicId) {
        return "music_update";
    }

    @GetMapping("/{type}/{value}")
    public String loadCollections(@PathVariable String type, @PathVariable String value) {
        return "index";
    }

    @GetMapping("/music/{musicId}")
    public String loadCollections(@PathVariable int musicId) {
        return "music_post";
    }

}
