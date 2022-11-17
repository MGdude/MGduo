package com.Music.Group.Service;

import com.Music.Group.Domain.User;
import com.Music.Group.Repository.AccountRepository;
import com.Music.Group.dto.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

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
