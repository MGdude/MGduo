package com.Music.Group.Service;

import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.CommentDto;
import com.Music.Group.Dto.CommentRequestDto;

import java.util.List;

public interface CommentService {

    public List<CommentDto> getComment(int musicId) throws Exception;
    public List<CommentDto> getCommentReply(int musicId, int id) throws Exception;
    public void commentAdd(CommentAddDto commentAddDto) throws Exception;

    public void commentUpdate(CommentRequestDto commentRequestDto) throws Exception;
    public void commentDelete(CommentRequestDto commentRequestDto) throws Exception;

}
