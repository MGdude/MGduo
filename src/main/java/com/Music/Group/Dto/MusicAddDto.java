package com.Music.Group.Dto;

import com.Music.Group.Domain.Music;
import lombok.Builder;
import lombok.Data;

@Data
public class MusicAddDto {

    private String userName;

    private String title;
    private String singer;
    private String info;
    private String url;
    private int categoryId;
    private int genderId;
    private int genreId;
    private int seasonId;


    public Music toEntity() {
        return Music.builder()
                .user_name(userName)
                .title(title)
                .singer(singer)
                .info(info)
                .url(url)
                .category_id(categoryId)
                .gender_id(genderId)
                .genre_id(genreId)
                .season_id(seasonId)
                .build();
    }
}
