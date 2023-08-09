import { Stack } from "@chakra-ui/react"
import { ResetPassword } from "../components/profile/resetPassword"

export const ResetPasswordPage = () => {
    return (
        <Stack
        w='100vw'
        h='100vh'
        justifyContent={'center'}
        alignItems={'center'}
        bgColor={'cyan.50'}
        >
            <ResetPassword/>
        </Stack>
    )
}