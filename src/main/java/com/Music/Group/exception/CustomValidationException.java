package com.Music.Group.exception;

import lombok.Getter;

import java.util.Map;

public class CustomValidationException extends RuntimeException{

    @Getter
    private Map<String, String> errorMap;

    public CustomValidationException(String message, Map<String, String> errorMap) {
        super(message);
        this.errorMap = errorMap;
    }
}
