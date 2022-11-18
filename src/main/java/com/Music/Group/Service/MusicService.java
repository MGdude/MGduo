package com.Music.Group.Service;

import com.Music.Group.Domain.Music;
import com.Music.Group.Dto.MusicAddDto;
import com.Music.Group.Dto.SelectOptionResponseDto;

import java.util.List;
import java.util.Map;

public interface MusicService{
    public List<SelectOptionResponseDto> getCategoryOption() throws Exception;
    public List<SelectOptionResponseDto> getGenderOption() throws Exception;
    public List<SelectOptionResponseDto> getGenreOption() throws Exception;
    public List<SelectOptionResponseDto> getSeasonOption() throws Exception;

    public void musicAdd(MusicAddDto musicAddDto) throws Exception;
}
