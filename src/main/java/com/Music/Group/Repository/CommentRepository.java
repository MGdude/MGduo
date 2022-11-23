package com.Music.Group.Repository;

import org.apache.ibatis.annotations.Mapper;

import java.io.IOException;

@Mapper
public interface CommentRepository {

    public int addComment() throws Exception;
}
