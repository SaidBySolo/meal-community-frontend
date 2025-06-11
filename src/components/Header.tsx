import { Avatar, Button, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { ExitIcon, HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // 로그인 상태 확인
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLoggedIn(true);
            // 사용자 정보를 로컬 스토리지에서 가져오기
            const userInfo = localStorage.getItem("user_info");
            if (userInfo) {
                try {
                    const parsedInfo = JSON.parse(userInfo);
                    setUserName(parsedInfo.name || "사용자");
                } catch (e) {
                    setUserName("사용자");
                }
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_info");
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <Flex
            height="4.5rem"
            align="center"
            justify="between"
            px="4"
            style={{
                borderBottom: "1px solid #eaeaea",
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
        >
            {/* 로고 및 햄버거 메뉴 */}
            <Flex align="center" gap="3">
                <IconButton
                    variant="ghost"
                    color="gray"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <HamburgerMenuIcon width={24} height={24} />
                </IconButton>

                <Flex align="center" gap="2" style={{ cursor: "pointer" }}>
                    <img
                        src="/meal.png"
                        alt="급식 로고"
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "6px"
                        }}
                    />
                    <Text weight="bold" size="4" style={{ color: "#FF6B6B" }}>오늘의 급식</Text>
                </Flex>
            </Flex>

            {/* 사용자 정보 및 메뉴 */}
            {isLoggedIn ? (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="soft" color="gray">
                            <Flex align="center" gap="2">
                                <Avatar
                                    size="1"
                                    fallback={userName.charAt(0).toUpperCase()}
                                    color="orange"
                                />
                                <Text size="2">{userName}</Text>
                            </Flex>
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>
                            <Flex align="center" gap="2">
                                <PersonIcon />
                                <Text>프로필</Text>
                            </Flex>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="red" onClick={handleLogout}>
                            <Flex align="center" gap="2">
                                <ExitIcon />
                                <Text>로그아웃</Text>
                            </Flex>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            ) : (
                <Text size="2" color="gray">로그인하여 더 많은 기능 이용하기</Text>
            )}
        </Flex>
    )
}

export default Header;