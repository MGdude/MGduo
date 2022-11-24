package com.Music.Group.Repository;

import com.Music.Group.Domain.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.io.IOException;

@Mapper
public interface CommentRepository {

    public int addComment(Comment comment) throws Exception;
}
