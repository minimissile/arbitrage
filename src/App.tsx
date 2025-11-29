import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import { Box, Container } from '@chakra-ui/react'
import ScrollTopButton from '@/components/ScrollTopButton'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="full" py={6}>
        <Outlet />
      </Container>
      <ScrollTopButton />
    </Box>
  )
}

export default App
