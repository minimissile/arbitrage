import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Container, Flex, HStack, Image, Text, Button, Heading } from '@chakra-ui/react'
import { memo } from 'react'

/**
 * 头部导航栏
 * @constructor
 */
function Header() {
  const location = useLocation()
  const isFunding = location.pathname.startsWith('/funding')
  const logoUrl = new URL('../assets/logo.svg', import.meta.url).href

  return (
    <Box borderBottomWidth="1px" borderColor="gray.200" bg="whiteAlpha.800" backdropFilter="saturate(180%) blur(6px)">
      <Container maxW="full" py={3}>
        <Flex align="center" justify="space-between">
          <HStack as={RouterLink} spacing={3} to="/">
            <Image src={logoUrl} alt="Arbitrage" boxSize={10} />
            <Box>
              <Heading as={'h1'} fontSize="xl" fontWeight="bold" color="gray.800">
                套利情报站
              </Heading>
              <Text fontSize="xs" color="gray.600">
                跨交易所实时机会监控与展示
              </Text>
            </Box>
          </HStack>

          <HStack spacing={5}>
            <HStack spacing={3} ml={4}>
              <Button
                as={RouterLink}
                to="/"
                colorScheme={!isFunding ? 'primary' : undefined}
                variant={!isFunding ? 'solid' : 'ghost'}
              >
                仪表盘
              </Button>
              <Button
                as={RouterLink}
                to="/funding"
                colorScheme={isFunding ? 'primary' : undefined}
                variant={isFunding ? 'solid' : 'ghost'}
              >
                资金费率
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Header)
