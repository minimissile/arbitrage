# 套利情报站 公开版 

发觉套利机会，比如资金费率套利， 价差套利等

测试链接：
https://traearbitragecske.vercel.app


# Crypto Arbitrage Monitor

# 各交易所的资金费率接口：

- Bybit: `https://www.bybit.com/x-api/contract/v5/public/support/trading-param?category=LinearPerpetual`
- Backpack: `https://api.backpack.exchange/v1/markets/funding-rates`


A real-time cryptocurrency arbitrage monitoring application built with React, TypeScript, and modern web technologies.

## Features

- **Real-time Monitoring**: Continuously monitors price differences across multiple exchanges
- **Multiple Arbitrage Types**: Supports price arbitrage, funding rate arbitrage, and triangular arbitrage
- **Professional Charts**: Interactive charts using ECharts and Recharts for data visualization
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **State Management**: Efficient state management with Zustand
- **Type Safety**: Full TypeScript support for type-safe development
- **Testing**: Comprehensive unit tests with Jest and React Testing Library
- **Docker Support**: Containerized deployment with Docker and Docker Compose

## Supported Exchanges

### Centralized Exchanges (CEX)
- Binance
- OKX
- Bybit

### Decentralized Exchanges (DEX)
- Uniswap (planned)
- SushiSwap (planned)
- Hyperliquid (planned)

## Architecture

```
src/
├── components/          # React components
├── services/           # Business logic and API services
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── pages/              # Page components
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-arbitrage-monitor
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BINANCE_API_KEY=your_binance_api_key
VITE_BINANCE_SECRET_KEY=your_binance_secret_key
VITE_OKX_API_KEY=your_okx_api_key
VITE_OKX_SECRET_KEY=your_okx_secret_key
VITE_BYBIT_API_KEY=your_bybit_api_key
VITE_BYBIT_SECRET_KEY=your_bybit_secret_key
```

### Building for Production

```bash
pnpm build
```

### Running Tests

```bash
pnpm test
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t crypto-arbitrage-monitor .
```

2. Run the container:
```bash
docker run -p 3000:80 crypto-arbitrage-monitor
```

Or use Docker Compose:
```bash
docker-compose up -d
```

## Usage

### DashboardPage Overview
- **Best Opportunity**: Shows the highest spread percentage currently available
- **Average Spread**: Average spread across all monitored pairs
- **Total Opportunities**: Total number of active arbitrage opportunities
- **Recent Opportunities**: Opportunities detected in the last 5 minutes

### Price Heatmap
- Visual representation of price differences across exchanges
- Color-coded based on spread percentage
- Click on any card to see detailed price information

### FundingPage Rate Chart
- Line chart showing funding rate trends over time
- Compare funding rates across different exchanges
- Identify funding rate arbitrage opportunities

### Arbitrage History
- Detailed list of recent arbitrage opportunities
- Filter by minimum spread percentage
- Sort by spread, timestamp, or estimated profit

## Configuration

### Alert Settings
Configure alert thresholds in the application:
- Minimum spread percentage
- Minimum estimated profit
- Sound notifications
- Email notifications (requires additional setup)

### Exchange Configuration
Add or modify exchanges in `src/services/exchangeService.ts`:
```typescript
const customExchange: Exchange = {
  id: 'custom-exchange',
  name: 'Custom Exchange',
  type: 'cex',
  baseUrl: 'https://api.custom-exchange.com',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  isActive: true
}
```

### Trading Pairs

Modify monitored trading pairs in the DashboardPage component:
```typescript
const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT', 'ADA/USDT']
```

## API Reference

### ExchangeService
- `getPriceData(exchangeId, symbol)`: Fetch current price data
- `getFundingRate(exchangeId, symbol)`: Fetch funding rate data
- `getActiveExchanges()`: Get list of active exchanges

### ArbitrageService
- `detectArbitrageOpportunities(prices)`: Detect price arbitrage opportunities
- `detectFundingRateArbitrage(rates)`: Detect funding rate arbitrage opportunities
- `detectTriangularArbitrage(prices)`: Detect triangular arbitrage opportunities

## Security Considerations

- API keys are stored in environment variables and never exposed to the client
- All API requests are made server-side when possible
- Input validation and sanitization for all user inputs
- HTTPS enforcement in production deployments
- Regular security audits of dependencies

## Performance Optimization

- Virtual scrolling for large data sets
- Request throttling and debouncing
- Efficient state updates with Zustand
- Memoized calculations for expensive operations
- Lazy loading of components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

