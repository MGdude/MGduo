package com.Music.Group.Api;

import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Service.MusicService;
import com.Music.Group.Service.MusicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MusicApi {

    private final MusicService musicService;

    @RequestMapping("/music/option/category")
    public ResponseEntity<?> getCategoryOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getCategoryOption()));
    }

    @RequestMapping("/music/option/gender")
    public ResponseEntity<?> getGenderOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getGenderOption()));
    }

    @RequestMapping("/music/option/genre")
    public ResponseEntity<?> getGenreOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getGenreOption()));
    }

    @RequestMapping("/music/option/season")
    public ResponseEntity<?> getSeasonOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getSeasonOption()));
    }
}
