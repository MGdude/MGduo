package com.Music.Group.Service;

import com.Music.Group.Domain.User;
import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.CommentDto;
import com.Music.Group.Repository.CommentRepository;
import com.Music.Group.exception.CustomInternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;


    @Override
    public List<CommentDto> getComments(int musicId) throws Exception {
        List<CommentDto> commentDto = new ArrayList<CommentDto>();
        commentRepository.getComments(musicId).forEach(comment -> {
            commentDto.add(comment.toDto());
        });

        return commentDto;
    }

    @Override
    public void addComment(CommentAddDto commentAddDto) throws Exception {
        int result = commentRepository.addComment(commentAddDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }
    }
}
