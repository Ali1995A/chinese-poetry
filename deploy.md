# 诗词文库部署指南

## 部署前准备

### 1. 环境变量配置
确保以下环境变量在生产环境中正确配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 应用配置
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. 构建和部署

#### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

#### 手动部署
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 常见问题解决

### 404 错误
如果搜索页面出现 404 错误，请检查：

1. **Next.js 配置**：确保 `next.config.js` 文件存在且配置正确
2. **路由配置**：检查 App Router 的路由结构
3. **环境变量**：确认 Supabase 环境变量正确配置

### 搜索功能问题
1. **本地搜索正常，生产环境失败**：
   - 检查环境变量是否正确设置
   - 确认 Supabase 数据库连接
   - 验证文件路径别名配置

2. **静态文件加载失败**：
   - 确保 `public` 目录中的文件正确部署
   - 检查图片和资源路径

### 数据库连接
1. **Supabase 连接失败**：
   - 检查 API 密钥权限
   - 确认数据库表结构
   - 验证网络连接

## 性能优化建议

1. **图片优化**：使用 Next.js Image 组件
2. **代码分割**：利用 Next.js 自动代码分割
3. **缓存策略**：配置适当的缓存头
4. **CDN 配置**：使用 CDN 加速静态资源

## 监控和日志

1. **错误监控**：集成错误监控服务
2. **性能监控**：监控页面加载时间
3. **用户行为分析**：跟踪用户搜索行为

## 更新和维护

1. **定期更新**：保持依赖包最新
2. **数据备份**：定期备份数据库
3. **安全更新**：及时应用安全补丁