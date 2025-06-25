package org.example.startup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web配置类
 * 注册拦截器和其他Web相关配置
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    /**
     * 配置CORS跨域访问
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // 对所有API接口启用CORS
                .allowedOriginPatterns("http://localhost:3000") // 允许指定域名访问
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允许的HTTP方法
                .allowedHeaders("*") // 允许所有请求头
                .allowCredentials(true) // 允许发送Cookie
                .maxAge(3600); // 预检请求的缓存时间（秒）
    }
}