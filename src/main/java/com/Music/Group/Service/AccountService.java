package com.Music.Group.Service;

import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Dto.RegisterDto;

import java.util.List;

public interface AccountService {

    public void duplicateUsername(RegisterDto registerDto) throws Exception;
    public void passwordChecking(RegisterDto registerDto) throws Exception;
    public void register(RegisterDto registerDto) throws Exception;
    public List<MusicListResponseDto> UserInfo(String username)throws Exception;
    public List<MusicListResponseDto> likeMusicList(String username)throws Exception;
}
