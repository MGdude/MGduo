package com.Music.Group.Service;

import com.Music.Group.Dto.SearchDto;

import java.util.List;

public interface SearchService {

    public List<SearchDto> getSearchList(String search) throws Exception;
}
