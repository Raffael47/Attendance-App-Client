import { Heading, Stack } from "@chakra-ui/react";
import Clock from "react-live-clock";

export const LiveClock = () => {
    return(
        <Heading textShadow={'3px 3px cyan'} color={'pink.700'} fontSize={{ base: '4xl', lg:'6xl' }} >
            <Clock format="HH:mm:ss" ticking={true} />
        </Heading>
    )
}