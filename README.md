# 套利情报站（公开版）

发现并监控套利机会：资金费率套利、价差套利等。

# 各交易所的资金费率接口：

- Bybit（线性永续）: `https://api.bybit.com/v5/market/tickers?category=linear`
- Backpack（资金费率）: `https://api.backpack.exchange/api/v1/markPrices`

测试链接：
https://traearbitragecske.vercel.app

一款实时加密货币套利监控应用，采用React、TypeScript和现代网络技术构建。

## 特色

- **实时监控**：持续监控多个交易所的价格差异
- **多种套利类型**：支持价格套利、资金利率套利和三角套利
- **专业图表**：使用ECharts和Recharts进行数据可视化的交互式图表
- **响应式设计**：采用Tailwind CSS的移动优先响应式设计
- **状态管理**：使用Zustand实现高效的状态管理
- **类型安全**：对类型安全开发的全面TypeScript支持
- **测试**：包含 Jest 和 React 测试库的综合单元测试
- **Docker 支持**：使用 Docker 和 Docker Compose 进行容器化部署

## Supported Exchanges

### 中心化交易所（CEX）
- Binance
- OKX
- Bybit

### 去中心化交易所（DEX）

- Uniswap（计划中）

## 目录

```
src/
├── components/          # React components
├── services/           # Business logic and API services
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── views/              # Page views
```

## 开始

### 先决条件
- Node.js 18+
- pnpm or npm

### 安装

1. 克隆仓库：

```bash
git clone <repository-url>
cd crypto-arbitrage-monitor
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

4. 打开浏览器，进入“http://localhost:5566”

### 环境变量

在根目录创建一个“.env”文件：

```env
VITE_BINANCE_API_KEY=your_binance_api_key
VITE_BINANCE_SECRET_KEY=your_binance_secret_key
VITE_OKX_API_KEY=your_okx_api_key
VITE_OKX_SECRET_KEY=your_okx_secret_key
VITE_BYBIT_API_KEY=your_bybit_api_key
VITE_BYBIT_SECRET_KEY=your_bybit_secret_key
```

### 生产构建

```bash
pnpm build
```

## 用途

### 仪表盘页面概览

- **最佳机会**：显示当前可用的最高利差百分比
- **平均利差**：所有监控交易对的平均利差
- **总机会**：活跃套利机会总数
- **近期机会**：过去5分钟内检测到的机会

### 资金费率页

- 同币种聚合展示不同交易所资金费率，便于横向对比
- 支持排序：按交易所资金费率或“最大资金费率差”（默认降序）
- 支持搜索：延迟搜索优化输入体验；筛选区与表头吸顶

### 套利历史

- 近期套利机会的详细列表
- 按最小差价百分比过滤
- 按差价、时间戳或预计利润排序

### 警报设置

在应用程序中配置警报阈值：

- 最小利差百分比
- 最低预估利润
- 声音通知
- 电子邮件通知（需额外设置）

## 安全考量

- API 密钥存储在环境变量中，从未向客户端开放
- 所有 API 请求尽可能在服务器端进行或通过代理转发
- 对所有用户输入进行输入验证和净化
- 生产部署中的HTTPS强制执行
- 对依赖进行定期的安全审计

## 贡献

1. 分支仓库
2. 创建一个功能分支（"git checkout -b feature/amazing-feature"）
3. 提交你的更改（"git commit -m 'Add amazing feature"）
4. 推送到分支（"git push origin feature/amazing-feature"）
5. 打开拉取请求
