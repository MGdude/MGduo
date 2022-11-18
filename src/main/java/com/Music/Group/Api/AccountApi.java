package com.Music.Group.Api;

import com.Music.Group.Service.AccountService;
import com.Music.Group.Validation.ValidationSequence;
import com.Music.Group.aop.annotation.LogAspect;
import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Dto.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    @LogAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated(ValidationSequence.class) @RequestBody RegisterDto registerDto, BindingResult bindingResult) throws Exception {

        accountService.duplicateUsername(registerDto);
        accountService.passwordChecking(registerDto);
        accountService.register(registerDto);

        return ResponseEntity.created(URI.create("/login")).body(new CMRespDto<>("success", registerDto.getUsername()));
    }

}
