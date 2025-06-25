package org.example.startup.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.example.startup.service.UserService;
import org.example.startup.model.User;
import org.example.startup.model.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/index")
    public String index(HttpServletRequest request) {
        return "hello";
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpServletRequest request) {
        try {
            User loginUser = userService.login(user.getUsername(), user.getPassword());
            if (loginUser != null) {
                // 生成JWT令牌
                String token = userService.generateToken(loginUser);
                // 构建响应数据
                Map<String, Object> response = new HashMap<>();
                response.put("message", "登录成功");
                response.put("token", token);
                response.put("user", Map.of(
                    "id", loginUser.getId(),
                    "username", loginUser.getUsername(),
                    "email", loginUser.getEmail() != null ? loginUser.getEmail() : "",
                    "roles", loginUser.getRoles().stream().map(Role::getName).toList()
                ));
                

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "用户名或密码错误");
                

                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "登录异常");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user, HttpServletRequest request) {
        try {
            boolean success = userService.register(user);
            if (success) {
                return new ResponseEntity<>("注册成功", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("用户名已存在，注册失败", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("注册异常", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // ==================== 用户管理接口 ====================
    
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(Map.of("message", "用户不存在"), HttpStatus.NOT_FOUND);
        }
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("username", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("enabled", user.isEnabled());
        profile.put("createdAt", user.getCreatedAt());
        profile.put("lastLogin", user.getLastLogin());
        profile.put("roles", user.getRoles().stream().map(Role::getName).toList());
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}
