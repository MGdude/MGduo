package com.Music.Group.Service;

import com.Music.Group.Domain.Comment;
import com.Music.Group.Domain.User;
import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.CommentDto;
import com.Music.Group.Dto.CommentRequestDto;
import com.Music.Group.Repository.CommentRepository;
import com.Music.Group.exception.CustomInternalServerErrorException;
import com.Music.Group.exception.CustomValidationException;
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
    public void commentAdd(CommentAddDto commentAddDto) throws Exception {
        int result = commentRepository.commentAdd(commentAddDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }
    }

    @Override
    public void commentUpdate(CommentRequestDto commentRequestDto) throws Exception {
        Comment comment = commentRepository.findCommentByUsername(commentRequestDto.getId());
        
        if(!comment.getUsername().equals(commentRequestDto.getUserName())) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "데이터베이스 오류입니다.");
            throw new CustomValidationException("DataBase Error", errorMap);
        }
        int result = commentRepository.commentUpdate(commentRequestDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }

    }

    @Override
    public void commentDelete(CommentRequestDto commentRequestDto) throws Exception {
        Comment comment = commentRepository.findCommentByUsername(commentRequestDto.getId());

        if(!comment.getUsername().equals(commentRequestDto.getUserName())) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "데이터베이스 오류입니다.");
            throw new CustomValidationException("DataBase Error", errorMap);
        }
        int result = commentRepository.commentDelete(commentRequestDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }
    }
}
