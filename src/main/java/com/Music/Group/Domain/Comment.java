package com.Music.Group.Domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Comment {
    private int id;
    private int music_id;
    private String username;
    private String comment;
    private int step;
    private int group;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
