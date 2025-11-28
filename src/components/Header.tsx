// 头部导航栏：展示项目标题与运行状态（监控/告警）
import { Activity, AlertCircle } from 'lucide-react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Container, Flex, HStack, Image, Text, Button } from '@chakra-ui/react'

export function Header() {
  const location = useLocation()
  const isFunding = location.pathname.startsWith('/funding')
  const logoUrl = new URL('../assets/logo.svg', import.meta.url).href
  return (
    <Box borderBottomWidth="1px" borderColor="gray.200" bg="whiteAlpha.800" backdropFilter="saturate(180%) blur(6px)">
      <Container maxW="container.lg" py={4}>
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Image src={logoUrl} alt="Arbitrage" boxSize={9} />
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.900">套利情报站</Text>
              <Text fontSize="xs" color="gray.600">跨交易所实时机会监控与展示</Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <HStack spacing={2} fontSize="sm" color="gray.600">
              <Activity className="h-4 w-4" color="#16a34a" />
              <Text>实时监控</Text>
            </HStack>
            <HStack spacing={2} fontSize="sm" color="gray.600">
              <AlertCircle className="h-4 w-4" color="#f59e0b" />
              <Text>告警开启</Text>
            </HStack>
            <HStack spacing={2} ml={4}>
              <Button as={RouterLink} to="/" colorScheme={!isFunding ? 'brand' : undefined} variant={!isFunding ? 'solid' : 'ghost'}>
                仪表盘
              </Button>
              <Button as={RouterLink} to="/funding" colorScheme={isFunding ? 'brand' : undefined} variant={isFunding ? 'solid' : 'ghost'}>
                资金费率
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
