package com.Music.Group.Repository;

import com.Music.Group.Domain.Music;
import com.Music.Group.Domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountRepository {
    public User findUserByUsername(String username) throws Exception;
    public int saveUser(User user) throws Exception;
    public List<Music> getUserInfoList(String username) throws Exception;
    public List<Music> getUserLikeList(String username) throws Exception;
}
