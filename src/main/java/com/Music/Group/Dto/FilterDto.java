package com.Music.Group.Dto;

import com.Music.Group.Domain.Filter;
import lombok.Builder;
import lombok.Data;

@Data
public class FilterDto {
    private int categoryId;
    private int genderId;
    private int genreId;
    private int seasonId;

    public Filter toEntity() {
        return Filter.builder()
                .categoryId(categoryId)
                .genderId(genderId)
                .genreId(genreId)
                .seasonId(seasonId)
                .build();
    }
}
