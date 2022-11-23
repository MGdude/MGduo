package com.Music.Group.Service;

import com.Music.Group.Repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    @Override
    public int addComment() throws Exception {
        return 1;
    }
}
