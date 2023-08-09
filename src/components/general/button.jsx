import { Button } from '@chakra-ui/react'
export const ButtomTemp = ({content, func, isDisabled=false, display='block', width, colorScheme='purple', type='button'}) => {
  return (
        <Button
        colorScheme={colorScheme}
        bgGradient="linear(to-r, purple.600, purple.700, purple.800)"
        color={'white'}
        isDisabled={isDisabled}
        onClick={func}
        display={display}
        width={width}
        type={type}
        >
        {content}
        </Button>
  )
}