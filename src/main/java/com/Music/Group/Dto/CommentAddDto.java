package com.Music.Group.Dto;

import com.Music.Group.Domain.Comment;
import lombok.Data;

@Data
public class CommentAddDto {
    private int musicId;
    private String userName;
    private String comment;
    private int step;
    private int group;

    public Comment toEntity() {
        return Comment.builder()
                .music_id(musicId)
                .username(userName)
                .comment(comment)
                .step(step)
                .group(group)
                .build();
    }
}
