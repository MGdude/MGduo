package com.Music.Group.aop.annotation;

import com.Music.Group.exception.CustomValidationException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Aspect
@Component
public class ValidationAop {
    @Pointcut("execution(* com.Music.Group.Api.AccountApi.*(..)) || execution(* com.Music.Group.Api.MusicApi.musicAdd(..))")
    private void executionPointCut() {}

    @Around("executionPointCut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        BeanPropertyBindingResult bindingResult = null;

        for(Object arg : args) {
            if(arg.getClass() == BeanPropertyBindingResult.class){ // instanceof 쓰면 쉬우나.. 19버전에서 사라질 예정.
                bindingResult = (BeanPropertyBindingResult) arg;
                break;
            }
        }

        if(bindingResult.hasErrors()){
            Map<String, String> errorMap = new HashMap<String, String>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for(FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            throw new CustomValidationException("Validation Error", errorMap);
        }

        Object result = null;
        result = joinPoint.proceed();

        return result;
    }
}
