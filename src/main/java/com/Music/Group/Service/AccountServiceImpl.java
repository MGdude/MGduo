package com.Music.Group.Service;

import com.Music.Group.Domain.User;
import com.Music.Group.Dto.MusicListResponseDto;
import com.Music.Group.Repository.AccountRepository;
import com.Music.Group.Dto.RegisterDto;
import com.Music.Group.exception.CustomInternalServerErrorException;
import com.Music.Group.exception.CustomValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public void duplicateUsername(RegisterDto registerDto) throws Exception {
        User user = accountRepository.findUserByUsername(registerDto.getUsername());
        if(user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("username", "이미 사용중인 아이디 입니다.");
            

            throw new CustomValidationException("Duplicate username", errorMap);
        }
    }

    @Override
    public void passwordChecking(RegisterDto registerDto) throws Exception {
        if(!registerDto.getPassword().equals(registerDto.getPasswordChk())) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("passwordChk", "Password가 일치하지 않습니다.");

            throw new CustomValidationException("Password Not Match", errorMap);
        }
    }

    @Override
    public void register(RegisterDto registerDto) throws Exception {
        int result = accountRepository.saveUser(registerDto.toEntity());
        if(result == 0) {
            throw new CustomInternalServerErrorException("Server Error");
        }
    }

    @Override
    public List<MusicListResponseDto> UserInfo(String username) throws Exception {
        List<MusicListResponseDto> userInfoList = new ArrayList<MusicListResponseDto>();
        accountRepository.getUserInfoList(username).forEach(user -> {
            userInfoList.add(user.toUserInfoDto());
        });
        return userInfoList;
    }
}
