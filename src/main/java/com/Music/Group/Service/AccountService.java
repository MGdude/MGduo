package com.Music.Group.Service;

import com.Music.Group.dto.RegisterDto;

public interface AccountService {

    public void duplicateUsername(RegisterDto registerDto) throws Exception;
    public void register(RegisterDto registerDto) throws Exception;
}