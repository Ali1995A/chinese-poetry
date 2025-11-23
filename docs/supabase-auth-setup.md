# Supabase 认证设置指南

## 1. 启用 Supabase 认证

在 Supabase 控制台中，需要启用认证功能：

1. 进入你的 Supabase 项目
2. 在左侧菜单选择 **Authentication**
3. 点击 **Settings** 标签页
4. 确保以下设置已配置：

### 基本设置
- **Site URL**: `http://localhost:3000` (开发环境) 或你的生产域名
- **Additional Redirect URLs**: 添加你的域名

### 提供者设置
启用以下认证提供者：

#### Email 认证
- 启用 **Enable email signup**
- 配置 **Confirm email** (推荐启用)
- 设置 **Secure email change** (可选)

#### 其他提供者 (可选)
- Google OAuth
- GitHub OAuth
- 等

## 2. 创建数据库表

在 Supabase SQL 编辑器中执行以下 SQL 脚本：

```sql
-- 执行 scripts/create-users-table.sql 中的内容
```

这个脚本会创建：
- `profiles` 表：存储用户资料
- `user_favorites` 表：存储用户收藏
- `reading_history` 表：存储阅读历史

## 3. 环境变量配置

确保你的 `.env.local` 文件包含正确的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase 项目 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Supabase anon key
```

## 4. 测试认证流程

### 注册流程
1. 用户点击"注册"按钮
2. 填写邮箱、用户名、密码
3. 系统发送验证邮件
4. 用户验证邮箱后完成注册

### 登录流程
1. 用户点击"登录"按钮
2. 输入邮箱和密码
3. 系统验证凭据
4. 登录成功后跳转到首页

## 5. 安全配置

### 行级安全 (RLS)
所有用户相关表都已启用 RLS，确保：
- 用户只能访问自己的数据
- 公开数据对所有用户可见
- 敏感操作需要认证

### 密码策略
- 最小密码长度：6个字符
- 推荐使用强密码

## 6. 故障排除

### 常见问题

**认证失败**
- 检查环境变量是否正确
- 确认 Supabase 项目 URL 和密钥

**邮箱验证问题**
- 检查垃圾邮件文件夹
- 确认邮箱服务配置

**数据库权限错误**
- 确认 RLS 策略正确配置
- 检查表权限设置

## 7. 生产环境部署

### 域名配置
- 更新 Supabase 中的 Site URL 为生产域名
- 配置 SSL 证书
- 设置正确的重定向 URL

### 监控和日志
- 启用 Supabase 日志
- 监控认证事件
- 设置错误报警

## 8. 扩展功能

### 用户资料管理
- 允许用户编辑个人资料
- 上传头像
- 设置偏好

### 社交功能
- 用户收藏
- 阅读历史
- 个人诗集

### 管理员功能
- 用户管理
- 内容审核
- 数据分析