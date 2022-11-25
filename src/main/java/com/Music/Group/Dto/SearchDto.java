package com.Music.Group.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchDto {
    private String title;
    private String singer;
}
