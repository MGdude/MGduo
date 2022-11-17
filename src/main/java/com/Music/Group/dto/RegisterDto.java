package com.Music.Group.dto;

import com.Music.Group.Domain.User;
import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password;

    public User toEntity() {
        return User.builder()
                .username(username)
                .password(password)
                .build();
    }
}
