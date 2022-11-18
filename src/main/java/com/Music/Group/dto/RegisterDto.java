package com.Music.Group.Dto;

import com.Music.Group.Domain.User;
import com.Music.Group.Validation.ValidationGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class RegisterDto {
    @NotBlank(message = "아이디는 비워둘 수 없습니다.", groups = ValidationGroup.NotBlankGroup.class)
    @Size(min = 3, message = "아이디는 3글자 이상 입력 가능합니다.", groups = ValidationGroup.SizedGroup.class)
    private String username;

    @NotBlank(message = "비밀번호는 비워둘 수 없습ㄴ디ㅏ.", groups = ValidationGroup.NotBlankGroup.class)
    @Size(min = 8, max = 16, message = "최소 8자 이상, 최대 16자 이하로 입력해주세요", groups = ValidationGroup.SizedGroup.class)
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]*$", message = "비밀번호는 특수기호, 영문, 숫자를 모두 포함해야합니다.", groups = ValidationGroup.PatternCheckGroup.class)
    private String password;

    public User toEntity() {
        return User.builder()
                .username(username)
                .password(password)
                .build();
    }
}
