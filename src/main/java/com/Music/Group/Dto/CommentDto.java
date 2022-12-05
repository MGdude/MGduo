package com.Music.Group.Dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentDto {
    private int id;
    private int musicId;
    private String userName;
    private String comment;
    private int parentsId;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
