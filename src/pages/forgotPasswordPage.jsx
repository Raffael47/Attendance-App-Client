import { Stack } from "@chakra-ui/react"
import { ForgotPassword } from "../components/profile/forgotPassword"

export const ForgotPasswordPage = () => {
    return (
        <Stack
        w='100vw'
        h='100vh'
        justifyContent={'center'}
        alignItems={'center'}
        bgColor={'gray.50'}
        >
            <ForgotPassword/>
        </Stack>
    )
}