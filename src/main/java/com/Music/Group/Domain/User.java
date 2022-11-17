package com.Music.Group.Domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private int id;
    private String username;
    private String password;
    private int role_id;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    private Role role;
}
