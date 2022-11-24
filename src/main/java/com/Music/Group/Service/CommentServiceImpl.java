package com.Music.Group.Service;

import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Repository.CommentRepository;
import com.Music.Group.exception.CustomInternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    @Override
    public int addComment(CommentAddDto commentAddDto) throws Exception {
        int result = 0;
        result = commentRepository.addComment(commentAddDto.toEntity());

        if (result == 0) {
            throw new CustomInternalServerErrorException("error");
        }else {
            return result;
        }
    }
}
