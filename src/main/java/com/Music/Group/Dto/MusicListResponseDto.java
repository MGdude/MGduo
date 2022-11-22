package com.Music.Group.Dto;

import com.Music.Group.Domain.SelectOption;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MusicListResponseDto {
    private int musicId;
    private String title;
    private String singer;
    private String url;
    private String categoryName;
    private String genderName;
    private String genreName;
    private String seasonName;
}
