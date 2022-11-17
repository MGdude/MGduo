package com.Music.Group.Repository;

import com.Music.Group.Domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int saveUser(User user) throws Exception;
}
