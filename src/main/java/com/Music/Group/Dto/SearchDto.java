package com.Music.Group.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchDto {
    private int id;
    private String title;
    private String singer;
    private String url;
    private String categoryName;
    private String genderName;
    private String genreName;
    private String seasonName;
}
