package com.Music.Group.Service;

import com.Music.Group.Dto.*;
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
    public List<MusicListResponseDto> getMusicAll(FilterDto filterDto) throws Exception {
        List<MusicListResponseDto> musicListResponseDtoList = new ArrayList<MusicListResponseDto>();

        musicRepository.getMusicList(filterDto.toEntity()).forEach(music -> {
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
    public void musicUpdate(MusicRequestDto musicRequestDto) throws Exception {
        musicRepository.musicUpdate(musicRequestDto.toUpdateEntity());
    }

    @Override
    public void musicDelete(int musicId) throws Exception {
        musicRepository.musicDelete(musicId);
    }

    @Override
    public int musicLikeState(int musicId, String username) throws Exception {
        return musicRepository.musicLikeState(musicId, username);
    }

    @Override
    public int musicLikeCount(int musicId) throws Exception {
        return musicRepository.musicLikeCount(musicId);
    }

    @Override
    public int musicLike(int musicId, String username) throws Exception {
        int result = musicRepository.musicLikeState(musicId, username);
        if (result == 0) {
            musicRepository.musicLike(musicId, username);
        }else {
            musicRepository.musicDisLike(musicId, username);
        }
        return musicRepository.musicLikeCount(musicId);
    }
}
