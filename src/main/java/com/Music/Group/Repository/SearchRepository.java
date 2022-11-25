package com.Music.Group.Repository;

import com.Music.Group.Domain.Music;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchRepository {
    public List<Music> getSearchList(String search) throws Exception;
}
