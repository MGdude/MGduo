package com.Music.Group.Service;

import com.Music.Group.Domain.Music;
import com.Music.Group.Dto.MusicRequestDto;
import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Dto.MusicPostDto;
import com.Music.Group.Dto.SelectOptionResponseDto;

import java.util.List;

public interface MusicService{
    public List<SelectOptionResponseDto> getCategoryOption() throws Exception;
    public List<SelectOptionResponseDto> getGenderOption() throws Exception;
    public List<SelectOptionResponseDto> getGenreOption() throws Exception;
    public List<SelectOptionResponseDto> getSeasonOption() throws Exception;

    public void musicAdd(MusicRequestDto musicRequestDto) throws Exception;

    public List<MusicListResponseDto> getMusicAll() throws Exception;
    public List<MusicListResponseDto> getMusicTypeList(String type, String value) throws Exception;

    public MusicPostDto getMusicPostService(int musicId) throws Exception;

    public void musicUpdate(MusicRequestDto musicRequestDto) throws Exception;

    public void musicDelete(int musicId) throws Exception;
}
