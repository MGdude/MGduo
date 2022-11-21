package com.Music.Group.Service;

import com.Music.Group.Domain.User;
import com.Music.Group.Repository.AccountRepository;
import com.Music.Group.Security.PrincipalDetails;
import com.Music.Group.exception.CustomInternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;

        try {
            user = accountRepository.findUserByUsername(username);
        }catch (Exception e) {
            throw new CustomInternalServerErrorException("회원 정보 조회 오류");
        }
        if(user == null) {
            throw new UsernameNotFoundException("잘못된 사용자 정보");
        }
        return new PrincipalDetails(user);
    }
}
