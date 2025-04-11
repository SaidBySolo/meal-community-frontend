import { Box, Button, Flex } from "@radix-ui/themes"
import LoginDialog from "./LoginDialog"

import { useEffect, useState } from "react";
import RegisterDialog from "./RegisterDialog";
import CombinedDialogs from "./CombinedDialogs";



const MainPage = () => {

    useEffect(
    () =>{
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        

    }, []
    )
    return (
        <Box
            style={{
                height: "100vh",
            }}
        >
            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{
                    height: '100%',
                }}
            >
                <img src="../public/meal.png" alt="meal" width={300} height={300} />
                <h1>오늘의 급식은?</h1>

                <CombinedDialogs />
            </Flex>
        </Box>


    )
}

export default MainPage