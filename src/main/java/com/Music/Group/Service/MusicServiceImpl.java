package com.Music.Group.Service;

import com.Music.Group.Domain.Music;
import com.Music.Group.Dto.MusicRequestDto;
import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Dto.MusicPostDto;
import com.Music.Group.Dto.SelectOptionResponseDto;
import com.Music.Group.Repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public void musicAdd(MusicRequestDto musicRequestDto) throws Exception {
        musicRepository.musicAdd(musicRequestDto.toEntity());
    }

    @Override
    public List<MusicListResponseDto> getMusicAll() throws Exception {
        List<MusicListResponseDto> musicListResponseDtoList = new ArrayList<MusicListResponseDto>();

        musicRepository.getMusicList().forEach(music -> {
            musicListResponseDtoList.add(music.toDto());
        });

        return musicListResponseDtoList;
    }

    @Override
    public List<MusicListResponseDto> getMusicTypeList(String type, String value) throws Exception {
        List<MusicListResponseDto> musicListResponseDtoList = new ArrayList<MusicListResponseDto>();
        musicRepository.getMusicTypeList(type, value).forEach(music -> {
            musicListResponseDtoList.add(music.toDto());
        });

        return musicListResponseDtoList;
    }

    @Override
    public MusicPostDto getMusicPostService(int musicId) throws Exception {

        return musicRepository.getMusicPost(musicId).toMusicPostDto();
    }

    @Override
    public void musicUpdate(MusicRequestDto musicRequestDto, int musicId) throws Exception {
        musicRepository.musicUpdate(musicRequestDto.toEntity(), musicId);
    }

}
