package com.Music.Group.Service;

import com.Music.Group.Domain.User;
import com.Music.Group.Repository.AccountRepository;
import com.Music.Group.Dto.RegisterDto;
import com.Music.Group.exception.CustomValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public void duplicateUsername(RegisterDto registerDto) throws Exception {
        User user = accountRepository.findUserByUsername(registerDto.getUsername());
        System.out.println(user);
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
        User user = registerDto.toEntity();
        System.out.println(registerDto);
        int result = accountRepository.saveUser(user);
        if(result == 0) {
            System.out.println("회원가입 중 오류 발생");
        }
    }

}
