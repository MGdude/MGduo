package com.Music.Group.Dto;

import com.Music.Group.Domain.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class CommentRequestDto {
    private int id;
    private int musicId;
    private String userName;
    private String comment;
    private int roleId;

    public Comment toEntity() {
        return Comment.builder()
                .id(id)
                .music_id(musicId)
                .username(userName)
                .comment(comment)
                .build();
    }
}
