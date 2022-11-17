package com.Music.Group.Dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SelectOptionResponseDto {
    private int OptionId;
    private String OptionName;
}
