package com.Music.Group.Controller;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AccountController {

    @GetMapping("/login")
    public String login(HttpServletRequest request, Model model,
                        @RequestParam @Nullable String username) {

        String uri = request.getHeader("Referer"); // 이전 페이지에 대한 uri 저장
        if (uri != null && !uri.contains("/login") && !uri.contains("/register")) {
            request.getSession().setAttribute("prevPage", uri);
        }
        model.addAttribute("username", username == null ? "" : username);
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/userInfo/{username}")
    public String userInfo(@PathVariable String username) {
        return "userInfo";
    }
}
