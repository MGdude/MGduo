package com.Music.Group.Domain;

import com.Music.Group.Dto.MusicListResponseDto;
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

    private String category_name;
    private String gender_name;
    private String genre_name;
    private String season_name;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public MusicListResponseDto toDto() {
        return MusicListResponseDto.builder()
                .musicId(id)
                .title(title)
                .singer(singer)
                .url(url)
                .categoryName(category_name)
                .genderName(gender_name)
                .genreName(genre_name)
                .seasonName(season_name)
                .build();
    }
}
