package com.Music.Group.Api;

import com.Music.Group.Service.AccountService;
import com.Music.Group.dto.CMRespDto;
import com.Music.Group.dto.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) throws Exception {

        accountService.register(registerDto);

        return ResponseEntity.created(URI.create("/login")).body(new CMRespDto<>("success", registerDto.getUsername()));
    }

}
