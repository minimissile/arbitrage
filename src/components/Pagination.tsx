import { HStack, Box } from '@chakra-ui/react'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const safeTotal = Math.max(1, totalPages)
  return (
    <HStack mt={3} gap={2}>
      <Box fontSize="sm" color="gray.600">
        第 {page} 页 / 共 {safeTotal} 页
      </Box>
      <HStack>
        <Box
          as="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          px={2}
          py={1}
          borderWidth="1px"
          borderRadius="md"
        >
          上一页
        </Box>
        <Box
          as="button"
          onClick={() => onChange(Math.min(safeTotal, page + 1))}
          disabled={page >= safeTotal}
          px={2}
          py={1}
          borderWidth="1px"
          borderRadius="md"
        >
          下一页
        </Box>
      </HStack>
    </HStack>
  )
}
