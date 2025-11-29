const AggregatedLiquidationHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "List of exchange names to retrieve data from (e.g.,  'Binance, OKX, Bybit')"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const AggregatedTakerBuysellVolumeHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "exchange_list: List of exchange names to retrieve data from (e.g., 'Binance, OKX, Bybit')"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          unit: {
            type: 'string',
            default: 'usd',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Unit for the returned data, choose between 'usd' or 'coin'."
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const AggregatedTakerBuysellVolumeRatio = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT   （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 500,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Default 1000, Max 4500'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            default: 1706089927315,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds  eg.1641522717'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds  eg.1641522717'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const Ahr999 = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinBubbleIndex = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinEtfNetassetsHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'ETF ticker symbol (e.g., GBTC, IBIT).'
          }
        },
        required: []
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinEtfPremiumDiscountHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'ETF ticker symbol (e.g., GBTC, IBIT).'
          }
        },
        required: []
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinEtfs = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinProfitableDays = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitcoinRainbowChart = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BitfinexMarginLongShort = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'BTC,ETH'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#'
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#'
          }
        },
        required: ['symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BorrowInterestRate = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin eg. BTC'
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 500,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Default 1000, Max 4500'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            default: 1706089927315,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds  eg.1641522717'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds  eg.1641522717'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const BullMarketPeakIndicator = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const CoinbasePremiumIndex = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Default 1000, Max 4500'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds eg.1641522717'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'in seconds eg.1641522717'
          }
        },
        required: ['interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const Coins = { response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } } } as const

const CoinsMarkets = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance,OKX',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Comma-separated exchange names (e.g., "binance, okx, bybit"). Retrieve supported exchanges via the \'support-exchange-pair\' API.'
          },
          per_page: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per page.'
          },
          page: {
            type: 'integer',
            format: 'int32',
            default: '1',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Page number for pagination, default: 1.'
          }
        },
        required: []
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const CoinsPriceChange = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const CryptofearGreedindex = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const CumulativeExchangeList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          range: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for the data (e.g.,1d, 7d, 30d, 365d).'
          }
        },
        required: ['range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseFundingrateOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbols: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT   （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          interval: {
            type: 'string',
            default: '1m',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 5m'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Max 100'
          }
        },
        required: ['exchange', 'symbols', 'interval']
      }
    ]
  },
  response: {
    '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationAggregatedHeatmap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin eg. BTC   （ Check supported coin through the 'support-coins' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['symbol', 'endTime']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationAggregatedHeatmapModel2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin eg. BTC   （ Check supported coin through the 'support-coins' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg.  1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationAggregatedHeatmapModel3 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin eg. BTC   （ Check supported coin through the 'support-coins' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg.  1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationHeatmap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg.  Binance,Okx,Crypto.com,Dydx,Bitget,Bybit,Bingx,Bitmex,Bitfinex,Deribit,Coinex,Kraken,Htx'
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['exchange', 'symbol', 'endTime']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationHeatmapModel2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg.  Binance,Okx,Crypto.com,Dydx,Bitget,Bybit,Bingx,Bitmex,Bitfinex,Deribit,Coinex,Kraken,Htx'
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg. 1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['symbol', 'endTime']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationHeatmapModel3 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg.  Binance,Okx,Crypto.com,Dydx,Bitget,Bybit,Bingx,Bitmex,Bitfinex,Deribit,Coinex,Kraken,Htx'
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The earliest timestamp is: 1654012800'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            default: 1727171272,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'eg. 1727171272'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '<=288'
          }
        },
        required: ['symbol', 'endTime']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseLiquidationHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchanges: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbols: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading pair eg. BTC'
          },
          interval: {
            type: 'string',
            default: '1m',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 5m'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Max 100'
          }
        },
        required: ['exchanges', 'symbols', 'interval']
      }
    ]
  },
  response: {
    '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EnterpriseOpeninterestOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbols: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT   （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          interval: {
            type: 'string',
            default: '1m',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '1m, 5m'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Max 100'
          }
        },
        required: ['exchange', 'symbols', 'interval']
      }
    ]
  },
  response: {
    '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EtfDetail = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            default: 'GBTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'GBTC,IBIT...'
          }
        },
        required: ['ticker']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EtfFlowsHistory = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EtfHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            default: 'GBTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'ETF ticker symbol (e.g., GBTC, IBIT).'
          }
        },
        required: ['ticker']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EtfPriceOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          ticker: {
            type: 'string',
            default: 'GBTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'ETF ticker symbol (e.g., GBTC, IBIT).'
          },
          range: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for the data (e.g., 1d,7d,all).'
          }
        },
        required: ['ticker', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EthereumEtfFlowsHistory = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EthereumEtfList = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const EthereumEtfNetassetsHistory = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const ExchangeBalanceChart = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin eg. BTC, ETH'
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const ExchangeBalanceList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin eg. BTC , ETH'
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const ExchangeOnchainTransfers = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'ETH',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin (e.g., ETH).'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            default: 1706089927315,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          minUsd: {
            type: 'number',
            format: 'double',
            minimum: -1.7976931348623157e308,
            maximum: 1.7976931348623157e308,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Minimum transfer amount filter, specified in USD.'
          },
          per_page: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per page.'
          },
          page: {
            type: 'integer',
            format: 'int32',
            default: '1',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Page number for pagination, default: 1.'
          }
        },
        required: []
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const ExchangeOpenInterestHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin (e.g., BTC,ETH). '
          },
          unit: {
            type: 'string',
            default: 'USD',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Specify the unit for the returned data. Supported values depend on the symbol. If symbol is BTC, choose between USD or BTC. For ETH, choose between USD or ETH.'
          },
          range: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for the data. Supported values: 1h, 4h, 12h, all.'
          }
        },
        required: ['symbol', 'unit', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const ExchangeVolumeHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin (e.g., BTC,ETH). '
          },
          unit: {
            type: 'string',
            default: 'USD',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Specify the unit for the returned data. Supported values depend on the symbol. If symbol is BTC, choose between USD or BTC. For ETH, choose between USD or ETH.'
          }
        },
        required: ['symbol', 'unit']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FrArbitrage = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          usd: {
            type: 'integer',
            format: 'int64',
            default: 10000,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Investment principal for arbitrage (e.g., 10000).'
          }
        },
        required: ['usd']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FrExchangeList = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FrOhlcHistroy = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FuturesAggregatedOrderbookHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "List of exchange names to retrieve data from (e.g., 'ALL', or 'Binance, OKX, Bybit')"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 500,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          range: {
            type: 'string',
            default: '1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Depth percentage (e.g., 0.25, 0.5, 0.75, 1, 2, 3, 5, 10).'
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FuturesOrderbookHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Check supported pairs through the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '100',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          range: {
            type: 'string',
            default: '1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Depth percentage (e.g., 0.25, 0.5, 0.75, 1, 2, 3, 5, 10).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const FuturesRsiList = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const GetApiexchangeassets = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          per_page: {
            type: 'string',
            default: '10',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per page.'
          },
          page: {
            type: 'string',
            default: '1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Page number for pagination, default: 1'
          }
        },
        required: ['exchange']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const GetApifuturesbasishistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'string',
            default: '10',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const GetApispotorderbookhistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Spot exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Supported trading pairs (e.g., BTCUSDT, ETHUSDT). Tick sizes: BTCUSDT (TickSize=20), ETHUSDT (TickSize=0.5).'
          },
          interval: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time intervals for data aggregation. Supported values: 1h, 4h, 8h, 12h, 1d.'
          },
          limit: {
            type: 'string',
            default: '5',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval', 'limit']
      }
    ]
  }
} as const

const GetApispotorderbooklargeLimitOrder = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          }
        },
        required: ['exchange', 'symbol']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const GetApispotpricehistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "spot exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'string',
            default: '10',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const GlobalLongshortAccountRatio = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const GoldenRatioMultiplier = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const GrayscaleHoldingList = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const GrayscalePremiumHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Supported values: ETC, LTC, BCH, SOL, XLM, LINK, ZEC, MANA, ZEN, FIL, BAT, LPT'
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const HongKongBitcoinEtfFlowHistory = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const HyperliquidWhaleAlert = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const HyperliquidWhalePosition = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const Info = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin (e.g., BTC,ETH). '
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const Instruments = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    }
  }
} as const

const LargeLimitOrderHistory2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exName: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Futures Exchange(Binance,OKX)  Spot Exchange(Binance,OKX,Coinbase,Bitfinex,Karan)'
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'BTCUSDT'
          },
          type: {
            type: 'string',
            default: 'futures',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'futures or spot'
          },
          state: {
            type: 'integer',
            format: 'int32',
            default: 2,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '2-已完成 3已撤销'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 1000,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '开始时间 单位 秒'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '结束时间 单位 秒'
          }
        },
        required: ['exName', 'symbol', 'type']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LargeOrder = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchanges: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '交易所名称'
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '币种'
          },
          type: {
            type: 'string',
            default: 'futures',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'futures or spot'
          },
          startTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '毫秒'
          },
          endTime: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '毫秒'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 100,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'max 1000'
          }
        },
        required: ['exchanges', 'symbol', 'type']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LargeOrderbook = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pair via the 'support-exchange-pair' API."
          }
        },
        required: ['exchange', 'symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LargeOrderbookCopy2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exName: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Futures Exchange(Binance,OKX)  Spot Exchange(Binance,OKX,Coinbase,Bitfinex,Karan)'
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'BTCUSDT'
          },
          type: {
            type: 'string',
            default: 'futures',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'futures or spot'
          }
        },
        required: ['exName', 'symbol', 'type']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LargeOrderbookHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Check supported pairs through the 'support-exchange-pair' API."
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1723625037000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1723626037000).'
          },
          state: {
            type: 'integer',
            format: 'int32',
            default: '1',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Status of the order —  1for \'\'In Progress\'\'  2 for "Finish"  3 for "Revoke"'
          }
        },
        required: ['exchange', 'symbol', 'start_time', 'end_time', 'state']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const LiquidationAggregateHeatmap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y.'
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationAggregateHeatmapModel2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y.'
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationAggregatedHeatmapModel3 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y.'
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationAggregatedMap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 1d, 7d.'
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationCoinList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          }
        },
        required: ['exchange']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationExchangeList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).  Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation.  Supported values: 1h, 4h, 12h, 24h.'
          }
        },
        required: ['range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationHeatmap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance, OKX). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y.'
          }
        },
        required: ['exchange', 'symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationHeatmapModel2 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Exchange name  eg. Binance ，OKX （ Check supported exchanges through the 'support-exchange-pair' API.）"
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair eg. BTCUSDT   （ Check supported pair through the 'support-exchange-pair' API.）"
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: '12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y'
          }
        },
        required: ['exchange', 'symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationHeatmapModel3 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance, OKX). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          range: {
            type: 'string',
            default: '3d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 12h, 24h, 3d, 7d, 30d, 90d, 180d, 1y.'
          }
        },
        required: ['exchange', 'symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationMap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          range: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for data aggregation. Supported values: 1d, 7d.'
          }
        },
        required: ['exchange', 'symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const LiquidationOrder = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance, OKX). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          min_liquidation_amount: {
            type: 'string',
            default: '10000',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Minimum threshold for liquidation events.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'min_liquidation_amount']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiExchangeHistoryChart = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).  Check supported coins through the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: '12h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for the data (e.g., all, 1m, 15m, 1h, 4h, 12h).'
          },
          unit: {
            type: 'string',
            default: 'usd',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Unit for the returned data, choose between 'usd' or 'coin'."
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiExchangeList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).Retrieve supported coins via the 'support-coins' API."
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiOhlcAggregatedCoinMarginHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Comma-separated exchange names (e.g., "Binance, OKX, Bybit"). Retrieve supported exchanges via the \'support-exchange-pair\' API.'
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time interval for data aggregation.Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiOhlcAggregatedHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).  Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          unit: {
            type: 'string',
            default: 'usd',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Unit for the returned data, choose between 'usd' or 'coin'."
          }
        },
        required: ['symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiOhlcAggregatedStablecoinMarginHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Comma-separated exchange names (e.g., "Binance, OKX, Bybit"). Retrieve supported exchanges via the \'support-exchange-pair\' API.'
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time interval for data aggregation.Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiOhlcHistroy = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              " Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT).  Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default 1000, Max 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          unit: {
            type: 'string',
            default: 'usd',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Unit for the returned data, choose between 'usd' or 'coin'."
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OiWeightOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time interval for data aggregation. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in seconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in seconds (e.g., 1641522717000).'
          }
        },
        required: ['symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OptionMaxPain = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Trading coin (e.g., BTC,ETH). '
          },
          exchange: {
            type: 'string',
            default: 'Deribit',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Exchange name (e.g., Deribit, Binance, OKX). '
          }
        },
        required: ['symbol', 'exchange']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const OrderbookHeatmap = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Supported trading pairs (e.g., BTCUSDT, ETHUSDT). Tick sizes: BTCUSDT (TickSize=20), ETHUSDT (TickSize=0.5).'
          },
          interval: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time intervals for data aggregation. Supported values: 1h, 4h, 8h, 12h, 1d.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '1',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1723625037000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1723626037000).'
          }
        },
        required: ['exchange', 'symbol', 'interval', 'limit']
      }
    ]
  }
} as const

const PairsMarkets = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).Retrieve supported coins via the 'support-coins' API."
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const Pi = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const PriceOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              " Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Check supported pairs through the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1h',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: 10,
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717).'
          }
        },
        required: ['exchange', 'symbol', 'interval', 'limit']
      }
    ]
  },
  response: { '200': { $schema: 'https://json-schema.org/draft/2020-12/schema#' } }
} as const

const PuellMultiple = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotAggregatedHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "List of exchange names to retrieve data from (e.g., 'ALL', or 'Binance, OKX, Bybit')"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          range: {
            type: 'string',
            default: '1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Depth percentage (e.g., 0.25, 0.5, 0.75, 1, 2, 3, 5, 10).'
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotAggregatedTakerBuysellHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange_list: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "exchange_list: List of exchange names to retrieve data from (e.g., 'Binance, OKX, Bybit')"
          },
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          },
          unit: {
            type: 'string',
            default: 'usd',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Unit for the returned data, choose between 'usd' or 'coin'."
          }
        },
        required: ['exchange_list', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotCoinsMarkets = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          per_page: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: ' Number of results per page.'
          },
          page: {
            type: 'integer',
            format: 'int32',
            default: '1',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Page number for pagination, default: 1.'
          }
        },
        required: []
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotOrderbookHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Check supported pairs through the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Data aggregation time interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w.'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500.'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: ' End timestamp in milliseconds (e.g., 1641522717000).'
          },
          range: {
            type: 'string',
            default: '1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Depth percentage (e.g., 0.25, 0.5, 0.75, 1, 2, 3, 5, 10).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotPairsMarkets = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          }
        },
        required: ['symbol']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotSuportedExchangePairs = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotSupportedCoins = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const SpotTakerBuysellRatioHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Exchange name (e.g., Binance). Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const StablecoinMarketcapHistory = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const StockFlow = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TakerBuysellVolume = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TakerBuysellVolumeExchangeList = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC).  Retrieve supported coins via the 'support-coins' API."
          },
          range: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time range for the data (e.g., 5m, 15m, 30m, 1h, 4h,12h, 24h).'
          }
        },
        required: ['symbol', 'range']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TopLongshortAccountRatio = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TopLongshortPositionRatio = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            default: 'Binance',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Futures exchange names (e.g., Binance, OKX) .Retrieve supported exchanges via the 'support-exchange-pair' API."
          },
          symbol: {
            type: 'string',
            default: 'BTCUSDT',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading pair (e.g., BTCUSDT). Retrieve supported pairs via the 'support-exchange-pair' API."
          },
          interval: {
            type: 'string',
            default: 'h1',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Time interval for data aggregation.  Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request.  Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['exchange', 'symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TowHundredWeekMovingAvgHeatmap = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const TowYearMaMultiplier = {
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

const VolWeightOhlcHistory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            default: 'BTC',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: "Trading coin (e.g., BTC). Retrieve supported coins via the 'support-coins' API."
          },
          interval: {
            type: 'string',
            default: '1d',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Time interval for data aggregation. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 4h, 6h, 8h, 12h, 1d, 1w'
          },
          limit: {
            type: 'integer',
            format: 'int32',
            default: '10',
            minimum: -2147483648,
            maximum: 2147483647,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results per request. Default: 1000, Maximum: 4500'
          },
          start_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Start timestamp in milliseconds (e.g., 1641522717000).'
          },
          end_time: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'End timestamp in milliseconds (e.g., 1641522717000).'
          }
        },
        required: ['symbol', 'interval']
      }
    ]
  },
  response: {
    '200': {
      type: 'object',
      properties: {},
      $schema: 'https://json-schema.org/draft/2020-12/schema#'
    },
    '400': { type: 'object', properties: {}, $schema: 'https://json-schema.org/draft/2020-12/schema#' }
  }
} as const

export {
  AggregatedLiquidationHistory,
  AggregatedTakerBuysellVolumeHistory,
  AggregatedTakerBuysellVolumeRatio,
  Ahr999,
  BitcoinBubbleIndex,
  BitcoinEtfNetassetsHistory,
  BitcoinEtfPremiumDiscountHistory,
  BitcoinEtfs,
  BitcoinProfitableDays,
  BitcoinRainbowChart,
  BitfinexMarginLongShort,
  BorrowInterestRate,
  BullMarketPeakIndicator,
  CoinbasePremiumIndex,
  Coins,
  CoinsMarkets,
  CoinsPriceChange,
  CryptofearGreedindex,
  CumulativeExchangeList,
  EnterpriseFundingrateOhlcHistory,
  EnterpriseLiquidationAggregatedHeatmap,
  EnterpriseLiquidationAggregatedHeatmapModel2,
  EnterpriseLiquidationAggregatedHeatmapModel3,
  EnterpriseLiquidationHeatmap,
  EnterpriseLiquidationHeatmapModel2,
  EnterpriseLiquidationHeatmapModel3,
  EnterpriseLiquidationHistory,
  EnterpriseOpeninterestOhlcHistory,
  EtfDetail,
  EtfFlowsHistory,
  EtfHistory,
  EtfPriceOhlcHistory,
  EthereumEtfFlowsHistory,
  EthereumEtfList,
  EthereumEtfNetassetsHistory,
  ExchangeBalanceChart,
  ExchangeBalanceList,
  ExchangeOnchainTransfers,
  ExchangeOpenInterestHistory,
  ExchangeVolumeHistory,
  FrArbitrage,
  FrExchangeList,
  FrOhlcHistroy,
  FuturesAggregatedOrderbookHistory,
  FuturesOrderbookHistory,
  FuturesRsiList,
  GetApiexchangeassets,
  GetApifuturesbasishistory,
  GetApispotorderbookhistory,
  GetApispotorderbooklargeLimitOrder,
  GetApispotpricehistory,
  GlobalLongshortAccountRatio,
  GoldenRatioMultiplier,
  GrayscaleHoldingList,
  GrayscalePremiumHistory,
  HongKongBitcoinEtfFlowHistory,
  HyperliquidWhaleAlert,
  HyperliquidWhalePosition,
  Info,
  Instruments,
  LargeLimitOrderHistory2,
  LargeOrder,
  LargeOrderbook,
  LargeOrderbookCopy2,
  LargeOrderbookHistory,
  LiquidationAggregateHeatmap,
  LiquidationAggregateHeatmapModel2,
  LiquidationAggregatedHeatmapModel3,
  LiquidationAggregatedMap,
  LiquidationCoinList,
  LiquidationExchangeList,
  LiquidationHeatmap,
  LiquidationHeatmapModel2,
  LiquidationHeatmapModel3,
  LiquidationHistory,
  LiquidationMap,
  LiquidationOrder,
  OiExchangeHistoryChart,
  OiExchangeList,
  OiOhlcAggregatedCoinMarginHistory,
  OiOhlcAggregatedHistory,
  OiOhlcAggregatedStablecoinMarginHistory,
  OiOhlcHistroy,
  OiWeightOhlcHistory,
  OptionMaxPain,
  OrderbookHeatmap,
  PairsMarkets,
  Pi,
  PriceOhlcHistory,
  PuellMultiple,
  SpotAggregatedHistory,
  SpotAggregatedTakerBuysellHistory,
  SpotCoinsMarkets,
  SpotOrderbookHistory,
  SpotPairsMarkets,
  SpotSuportedExchangePairs,
  SpotSupportedCoins,
  SpotTakerBuysellRatioHistory,
  StablecoinMarketcapHistory,
  StockFlow,
  TakerBuysellVolume,
  TakerBuysellVolumeExchangeList,
  TopLongshortAccountRatio,
  TopLongshortPositionRatio,
  TowHundredWeekMovingAvgHeatmap,
  TowYearMaMultiplier,
  VolWeightOhlcHistory
}
