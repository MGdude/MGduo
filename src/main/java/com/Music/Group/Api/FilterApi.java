package com.Music.Group.Api;

import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FilterApi {
    private final SearchService searchService;

    @GetMapping("/{search}")
    public ResponseEntity<?> search(@PathVariable String search) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Search Successfully", searchService.getSearchList(search)));
    }

}
