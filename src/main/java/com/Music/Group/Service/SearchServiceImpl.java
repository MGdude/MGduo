package com.Music.Group.Service;

import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final SearchRepository searchRepository;

    @Override
    public List<MusicListResponseDto> getSearchList(String search) throws Exception {
        search = "%" + search + "%";
        List<MusicListResponseDto> searchList = new ArrayList<MusicListResponseDto>();
        searchRepository.getSearchList(search).forEach(list -> {
            searchList.add(list.toSearchDto());
        });
        return searchList;
    }
}