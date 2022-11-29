package com.Music.Group.Dto;

import com.Music.Group.Domain.Music;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
public class MusicRequestDto {

    private String userName;

    @NotBlank(message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private String title;
    @NotBlank(message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private String singer;
    @NotBlank(message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private String info;
    @NotBlank(message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private String url;
    @Min(value = 1, message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private int categoryId;
    @Min(value = 1, message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private int genderId;
    @Min(value = 1, message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private int genreId;
    @Min(value = 1, message = "빈 칸을 입력, 항목을 선택해 주세요.")
    private int seasonId;


    private int musicId;
    public Music toEntity() {
        return Music.builder()
                .username(userName)
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

    public Music toUpdateEntity() {
        return Music.builder()
                .id(musicId)
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
