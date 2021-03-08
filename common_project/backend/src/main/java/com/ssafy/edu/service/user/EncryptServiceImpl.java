package com.ssafy.edu.service.user;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class EncryptServiceImpl implements EncryptService{

    @Override
    public String encrypt(String password) {
        return BCrypt.hashpw(password,BCrypt.gensalt());
    }

    @Override
    public boolean isMatch(String password, String hashed) {
        return BCrypt.checkpw(password,hashed);
    }
}
