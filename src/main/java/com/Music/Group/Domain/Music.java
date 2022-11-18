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
public class Music {
    private int id;
    private String username;
    private String title;
    private String singer;
    private String info;
    private String url;
    private int category_id;
    private int gender_id;
    private int genre_id;
    private int season_id;

    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
