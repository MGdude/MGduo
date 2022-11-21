package com.Music.Group.Domain;

import com.Music.Group.Dto.LoginDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Login {
    private String username;
    private String password;

    public LoginDto toDto() {
        return LoginDto.builder()
                .username(username)
                .password(password)
                .build();
    }
}
