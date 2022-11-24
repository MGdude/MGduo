package com.Music.Group.Repository;

import com.Music.Group.Domain.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.io.IOException;
import java.util.List;

@Mapper
public interface CommentRepository {
    public List<Comment> getComments(int musicId) throws Exception;
    public int addComment(Comment comment) throws Exception;
}
