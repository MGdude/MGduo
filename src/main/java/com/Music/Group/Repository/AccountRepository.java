package com.Music.Group.Repository;

import com.Music.Group.Domain.Login;
import com.Music.Group.Domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public User findUserByUsername(String username) throws Exception;
    public int saveUser(User user) throws Exception;
    public Login checkIdAndPw(String username, String password) throws Exception;
}
