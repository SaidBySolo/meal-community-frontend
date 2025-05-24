import { Box, Flex } from "@radix-ui/themes"

import CombinedDialogs from "./CombinedDialogs";
import MealPage from "./MealPage";
import { useEffect, useRef, useState } from "react";
import { requestCheckToken, requestRefresh } from "../api";

const MainPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            const checkToken = async () => {
                const isTokenValid = await requestCheckToken();
                if (isTokenValid) {
                    setIsLogin(true);
                } else {
                    const isRefreshSuccess = await requestRefresh();
                    if (isRefreshSuccess) {
                        setIsLogin(true);
                    }
                }
            }
            checkToken();
        }
        return () => {
            effectRan.current = true;
        }
    }, [])

    return (
        <Box
            style={{
                height: "100vh",
            }}
        >
            {
                isLogin ? <MealPage /> :
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        style={{
                            height: '100%',
                        }}
                    >
                        <img src="./public/meal.png" alt="meal" width={300} height={300} />
                        <h1>오늘의 급식은?</h1>

                        <CombinedDialogs />
                    </Flex>
            }
        </Box>
    )
}

export default MainPage