package com.Music.Group.Domain;

import com.Music.Group.Dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Comment {
    private int id;
    private int music_id;
    private String username;
    private String comment;
    private int parents_id;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public CommentDto toDto() {
        return CommentDto.builder()
                .id(id)
                .musicId(music_id)
                .userName(username)
                .comment(comment)
                .parentsId(parents_id)
                .createDate(create_date)
                .updateDate(update_date)
                .build();
    }
}
