package com.Music.Group.Repository;

import com.Music.Group.Domain.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentRepository {
    public List<Comment> getComment(int musicId) throws Exception;
    public List<Comment> getCommentReply(int musicId, int id) throws Exception;
    public int commentAdd(Comment comment) throws Exception;

    public Comment findCommentByUsername(int id) throws Exception;
    public int commentUpdate(Comment comment) throws Exception;
    public int commentDelete(Comment comment) throws Exception;
}
