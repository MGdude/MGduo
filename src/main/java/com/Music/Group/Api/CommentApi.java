package com.Music.Group.Api;

import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Dto.CommentAddDto;
import com.Music.Group.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentApi {

    private final CommentService commentService;

    @PostMapping("/comment/add")
    public ResponseEntity<?> commentAdd(@RequestBody CommentAddDto commentAddDto) throws Exception {
        commentService.addComment(commentAddDto);
        return ResponseEntity.created(URI.create("/")).body(new CMRespDto<>("Comment add Successfully", commentAddDto.getMusicId()));
    }

    @GetMapping("/comment/{musicId}")
    public ResponseEntity<?> commentAdd(@PathVariable int musicId) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Get Successfully", commentService.getComments(musicId)));
    }
}
