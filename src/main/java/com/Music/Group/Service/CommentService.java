package com.Music.Group.Service;

import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.CommentDto;

import java.util.List;

public interface CommentService {

    public List<CommentDto> getComments(int musicId) throws Exception;

    public void addComment(CommentAddDto commentAddDto) throws Exception;

}
