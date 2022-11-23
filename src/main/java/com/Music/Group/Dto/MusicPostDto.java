package com.Music.Group.Dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MusicPostDto {
    private int id;
    private String username;
    private String title;
    private String singer;
    private String info;
    private String url;
}
