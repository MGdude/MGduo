package com.Music.Group.Api;

import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Dto.MusicAddDto;
import com.Music.Group.Service.CommentService;
import com.Music.Group.Service.MusicService;
import com.Music.Group.Service.MusicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MusicApi {

    private final MusicService musicService;
    private final CommentService commentService;

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
    public ResponseEntity<?> musicAdd(@Valid @RequestBody MusicAddDto musicAddDto, BindingResult bindingResult) throws Exception {
        musicService.musicAdd(musicAddDto);
        return ResponseEntity.created(URI.create("/")).body(new CMRespDto<>("Music add Successfully", null));
    }

    @GetMapping("/music/all")
    public ResponseEntity<?> getMusicAll() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getMusicAll()));
    }

    @GetMapping("/music/{type}/{value}")
    public ResponseEntity<?> getMusicTypeList(@PathVariable String type, @PathVariable String value) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", musicService.getMusicTypeList(type, value)));
    }

    @GetMapping("/music/{musicId}")
    public ResponseEntity<?> getMusicPost(@PathVariable int musicId) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("success", musicService.getMusicPostService(musicId)));
    }x

    @PostMapping("/music/addComment")
    public ResponseEntity<?> commentAdd(@RequestBody CommentAddDto commentAddDto) throws Exception {
        commentService.addComment(commentAddDto);
        return ResponseEntity.created(URI.create("/")).body(new CMRespDto<>("Comment add Successfully", commentAddDto.getMusicId()));
    }

}
