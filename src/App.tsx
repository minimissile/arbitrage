import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Box, Container } from '@chakra-ui/react'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.lg" py={6}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
