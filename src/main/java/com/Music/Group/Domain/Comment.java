package com.Music.Group.Domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Comment {
    private int id;
    private int music_id;
    private String username;
    private String comment;
    private int step;
    private int groups;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
