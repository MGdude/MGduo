package com.Music.Group.Service;

import com.Music.Group.Dto.CommentAddDto;

public interface CommentService {
    public int addComment(CommentAddDto commentAddDto) throws Exception;
}
