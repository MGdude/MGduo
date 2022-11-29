package com.Music.Group.Controller;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping(value = {"/", "/index"})
    public String index(@RequestParam @Nullable String search) {
        return "index";
    }
}
