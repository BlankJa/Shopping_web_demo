# 购物网站后端服务

## 项目介绍
这是一个基于Spring Boot的购物网站后端服务，采用分层架构设计，实现了用户认证、权限管理等核心功能。项目使用JWT进行身份验证，JPA进行数据持久化，并集成了Spring Security进行安全控制。

## 技术栈
- Spring Boot 3.2.3
- Spring Security - 安全框架
- Spring Data JPA - ORM框架
- MySQL 8.0 - 数据库
- JWT 0.11.5 - 身份认证
- Maven - 项目管理工具
- Java 17 - 开发语言

## 项目结构
```
src/main/java/org/example/startup/
├── StartUpApplication.java          # 应用程序入口
├── config/                         # 配置类目录
│   ├── SecurityConfig.java         # Spring Security配置
│   └── WebConfig.java             # Web相关配置
├── controller/                     # 控制器层
│   └── UserController.java        # 用户相关接口
├── filter/                        # 过滤器
│   └── JwtAuthenticationFilter.java # JWT认证过滤器
├── model/                         # 数据模型
│   ├── Permission.java           # 权限实体
│   ├── Role.java                 # 角色实体
│   └── User.java                 # 用户实体
├── repository/                    # 数据访问层
│   ├── PermissionRepository.java
│   ├── RoleRepository.java
│   └── UserRepository.java
├── service/                       # 业务逻辑层
│   ├── RoleService.java
│   └── UserService.java
└── util/                          # 工具类
    └── JwtUtil.java              # JWT工具类
```

## 核心功能

### 1. 用户认证与授权
- JWT token认证机制
- 基于角色(RBAC)的权限控制
- 用户注册与登录
- 密码加密存储

### 2. 用户管理
- 用户信息CRUD操作
- 用户角色分配
- 权限管理

## 开发环境要求
- JDK 17+
- Maven 3.6+
- MySQL 8.0+
- IDE推荐：IntelliJ IDEA或Eclipse

## 项目配置

### 数据库配置
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb?createDatabaseIfNotExist=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root

# JPA配置
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 项目构建与运行

### 1. 克隆项目
```bash
git clone [项目地址]
cd backend
```

### 2. 配置数据库
- 确保MySQL服务运行中
- 创建数据库（可选，项目会自动创建）

### 3. 构建项目
```bash
mvn clean package
```

### 4. 运行项目
```bash
java -jar target/StartUp-0.0.1-SNAPSHOT.jar
```

## API文档

### 认证接口
```
POST /api/auth/register - 用户注册
请求体：
{
    "username": "string",
    "password": "string",
    "email": "string"
}

POST /api/auth/login - 用户登录
请求体：
{
    "username": "string",
    "password": "string"
}
响应：
{
    "token": "string",
    "type": "Bearer"
}
```

### 用户管理接口
```
GET /api/users - 获取用户列表
GET /api/users/{id} - 获取用户详情
PUT /api/users/{id} - 更新用户信息
DELETE /api/users/{id} - 删除用户
```

## 安全配置
- 使用Spring Security进行安全控制
- 密码加密存储
- JWT token认证
- 跨域保护

## 开发指南
1. 遵循RESTful API设计规范
2. 使用统一的响应格式
3. 添加适当的日志记录
4. 编写单元测试

## 注意事项
1. 首次运行会自动创建数据库和表结构
2. 确保数据库配置正确
3. 生产环境部署前需要修改相关配置
4. 定期更新依赖版本，确保安全性