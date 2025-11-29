import { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { ArrowUp } from 'lucide-react'

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <Tooltip label="回到顶部" placement="left">
      <IconButton
        aria-label="回到顶部"
        icon={<ArrowUp size={18} />}
        colorScheme="brand"
        position="fixed"
        bottom={6}
        right={6}
        borderRadius="full"
        boxShadow="lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </Tooltip>
  )
}
