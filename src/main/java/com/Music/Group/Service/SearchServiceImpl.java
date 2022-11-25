package com.Music.Group.Service;

import com.Music.Group.Dto.SearchDto;
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
    public List<SearchDto> getSearchList(String search) throws Exception {
        List<SearchDto> searchList = new ArrayList<SearchDto>();
        searchRepository.getSearchList(search).forEach(test -> {
            searchList.add(test.toSearchDto());
        });
        return searchList;
    }
}