package com.Music.Group.Service;

import com.Music.Group.Domain.Music;
import com.Music.Group.Dto.MusicAddDto;
import com.Music.Group.Dto.SelectOptionResponseDto;
import com.Music.Group.Repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService{

    private final MusicRepository musicRepository;

    @Override
    public List<SelectOptionResponseDto> getCategoryOption() throws Exception {
        List<SelectOptionResponseDto> selectOptionResponseDtoList = new ArrayList<SelectOptionResponseDto>();
        musicRepository.getCategoryOptions().forEach(SelectOption -> {
            selectOptionResponseDtoList.add(SelectOption.toDto());
        });
        return selectOptionResponseDtoList;
    }

    @Override
    public List<SelectOptionResponseDto> getGenderOption() throws Exception {
        List<SelectOptionResponseDto> selectOptionResponseDtoList = new ArrayList<SelectOptionResponseDto>();
        musicRepository.getGenderOptions().forEach(SelectOption -> {
            selectOptionResponseDtoList.add(SelectOption.toDto());
        });
        return selectOptionResponseDtoList;
    }

    @Override
    public List<SelectOptionResponseDto> getGenreOption() throws Exception {
        List<SelectOptionResponseDto> selectOptionResponseDtoList = new ArrayList<SelectOptionResponseDto>();
        musicRepository.getGenreOptions().forEach(SelectOption -> {
            selectOptionResponseDtoList.add(SelectOption.toDto());
        });
        return selectOptionResponseDtoList;
    }

    @Override
    public List<SelectOptionResponseDto> getSeasonOption() throws Exception {
        List<SelectOptionResponseDto> selectOptionResponseDtoList = new ArrayList<SelectOptionResponseDto>();
        musicRepository.getSeasonOptions().forEach(SelectOption -> {
            selectOptionResponseDtoList.add(SelectOption.toDto());
        });
        return selectOptionResponseDtoList;
    }

    @Override
    public void musicAdd(MusicAddDto musicAddDto) throws Exception {
        musicRepository.musicAdd(musicAddDto.toEntity());
    }
}