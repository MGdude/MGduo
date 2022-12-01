package com.Music.Group.Domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Filter {
    private int categoryId;
    private int genderId;
    private int genreId;
    private int seasonId;
}
