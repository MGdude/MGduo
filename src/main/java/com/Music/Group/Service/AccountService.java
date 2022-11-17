package com.Music.Group.Service;

import com.Music.Group.dto.RegisterDto;

public interface AccountService {

    public void register(RegisterDto registerDto) throws Exception;
}
