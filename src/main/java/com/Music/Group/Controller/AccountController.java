package com.Music.Group.Controller;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AccountController {

    @GetMapping("/login")
    public String login(Model model,
                        @RequestParam @Nullable String username) {
        model.addAttribute("username", username == null ? "" : username);
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
}
