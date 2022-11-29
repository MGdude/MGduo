package com.Music.Group.Service;

import com.Music.Group.Dto.MusicListResponseDto;

import java.util.List;

public interface SearchService {

    public List<MusicListResponseDto> getSearchList(String search) throws Exception;
}
