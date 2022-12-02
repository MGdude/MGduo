package com.Music.Group.Service;

import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.CommentDto;
import com.Music.Group.Repository.CommentRepository;
import com.Music.Group.exception.CustomInternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;


    @Override
    public List<CommentDto> getComment(int musicId) throws Exception {
        List<CommentDto> commentDto = new ArrayList<CommentDto>();
        commentRepository.getComment(musicId).forEach(comment -> {
            commentDto.add(comment.toDto());
        });

        return commentDto;
    }

    @Override
    public List<CommentDto> getCommentReply(int musicId, int id) throws Exception {
        List<CommentDto> commentReplyDto = new ArrayList<CommentDto>();
        commentRepository.getCommentReply(musicId, id).forEach(comment -> {
            commentReplyDto.add(comment.toDto());
        });

        return commentReplyDto;
    }

    @Override
    public void addComment(CommentAddDto commentAddDto) throws Exception {
        int result = commentRepository.addComment(commentAddDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }
    }


}
