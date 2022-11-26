package com.Music.Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SearchController {

    @GetMapping("/search/{search}")
    public String search(@PathVariable String search) {
        return "index";
    }
}
