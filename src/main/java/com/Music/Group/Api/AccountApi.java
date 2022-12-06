package com.Music.Group.Api;

import com.Music.Group.Security.PrincipalDetails;
import com.Music.Group.Service.AccountService;
import com.Music.Group.Validation.ValidationSequence;
import com.Music.Group.aop.annotation.LogAspect;
import com.Music.Group.Dto.CMRespDto;
import com.Music.Group.Dto.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated({ValidationSequence.class}) @RequestBody RegisterDto registerDto, BindingResult bindingResult) throws Exception {

        accountService.duplicateUsername(registerDto);
        accountService.passwordChecking(registerDto);
        accountService.register(registerDto);

        return ResponseEntity.created(URI.create("/login")).body(new CMRespDto<>("success", registerDto.getUsername()));
    }

    @GetMapping("/principal")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception { // session값 저장 하는 어노테이션
        return ResponseEntity.ok().body(new CMRespDto<>("success", principalDetails == null ? "" : principalDetails));
    }

    @GetMapping("/userInfo/{username}")
    public ResponseEntity<?> userInfo(@PathVariable String username) throws Exception {
        return ResponseEntity.ok().body(new CMRespDto<>("UserInfo Success", accountService.UserInfo(username)));
    }

    @GetMapping("/like/{username}")
    public ResponseEntity<?> getLikeMusic(@PathVariable String username) throws Exception {
        System.out.println(accountService.likeMusicList(username));
        return ResponseEntity.ok().body(new CMRespDto<>("LikeMusic Success", accountService.likeMusicList(username)));
    }

}
