import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const IssueDetailsLoading = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex className='space-x-5' my={'2'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'5rem'} />
      </Flex>
      <Card className='prose' mt={'4'}>
        <Skeleton count={5} />
      </Card>
    </Box>
  )
}

export default IssueDetailsLoading
