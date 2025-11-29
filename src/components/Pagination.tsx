import { HStack, Box, type StackProps } from '@chakra-ui/react'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

/**
 * 分页组件
 * @param page 当前页数
 * @param totalPages 总页数
 * @param onChange 页数变更回调函数
 * @param rest
 * @constructor
 */
function Pagination({ page, totalPages, onChange, ...rest }: Props & Omit<StackProps, 'onChange'>) {
  const safeTotal = Math.max(1, totalPages)

  return (
    <HStack gap={3} fontSize={'sm'} {...rest}>
      <Box color="gray.600">
        第 {page} 页 / 共 {safeTotal} 页
      </Box>
      <HStack>
        <Box
          fontSize={'sm'}
          as="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          px={3}
          py={1}
          _disabled={{ backgroundColor: 'gray.100', cursor: 'not-allowed' }}
          borderWidth="1px"
          borderRadius="base"
        >
          上一页
        </Box>
        <Box
          as="button"
          onClick={() => onChange(Math.min(safeTotal, page + 1))}
          disabled={page >= safeTotal}
          px={3}
          py={1}
          _disabled={{ backgroundColor: 'gray.100', cursor: 'not-allowed' }}
          borderWidth="1px"
          borderRadius="base"
        >
          下一页
        </Box>
      </HStack>
    </HStack>
  )
}

export default Pagination
