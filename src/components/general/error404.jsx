import { Box, Heading, Text } from '@chakra-ui/react'

export const Error404 = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, pink.400, pink.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Data Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        Oops! We can't find the results you're looking for.
      </Text>
    </Box>
  )
}