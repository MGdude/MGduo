package com.Music.Group.Domain;

import com.Music.Group.Dto.SelectOptionResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SelectOption {
    private int id;
    private String name;


    public SelectOptionResponseDto toDto() {
        return SelectOptionResponseDto.builder()
                .OptionId(id)
                .OptionName(name)
                .build();
    }

}

