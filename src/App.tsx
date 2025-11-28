import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Container, Box } from '@chakra-ui/react'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW={'full'} py={6}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
