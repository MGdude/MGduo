package com.Music.Group.Api;

import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Dto.MusicAddDto;
import com.Music.Group.Service.MusicService;
import com.Music.Group.Service.MusicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MusicApi {

    private final MusicService musicService;

    @GetMapping("/music/option/category")
    public ResponseEntity<?> getCategoryOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getCategoryOption()));
    }

    @GetMapping("/music/option/gender")
    public ResponseEntity<?> getGenderOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getGenderOption()));
    }

    @GetMapping("/music/option/genre")
    public ResponseEntity<?> getGenreOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getGenreOption()));
    }

    @GetMapping("/music/option/season")
    public ResponseEntity<?> getSeasonOption() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getSeasonOption()));
    }

    @PostMapping("/music/add")
    public ResponseEntity<?> musicAdd(@RequestBody MusicAddDto musicAddDto) throws Exception {
        musicService.musicAdd(musicAddDto);
        return ResponseEntity.created(URI.create("/")).body(new CMRespDto<>("Music add Successfully", null));
    }
}
