package com.Music.Group.Service;

import com.Music.Group.Dto.MusicAddDto;
import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Dto.SelectOptionResponseDto;

import java.util.List;

public interface MusicService{
    public List<SelectOptionResponseDto> getCategoryOption() throws Exception;
    public List<SelectOptionResponseDto> getGenderOption() throws Exception;
    public List<SelectOptionResponseDto> getGenreOption() throws Exception;
    public List<SelectOptionResponseDto> getSeasonOption() throws Exception;

    public void musicAdd(MusicAddDto musicAddDto) throws Exception;

    public List<MusicListResponseDto> getMusicAll() throws Exception;
    public List<MusicListResponseDto> getMusicTypeList(String type, String value) throws Exception;
}
