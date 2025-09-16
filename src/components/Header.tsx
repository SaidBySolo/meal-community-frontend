import {
  Box,
  Button,
  DropdownMenu,
  Flex,

  Text,
} from "@radix-ui/themes";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { requestLogout, requestMe } from "../api";
import UserInfoDialog from "./UserInfo";
import { User } from "../dtos/user";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const handleLogout = async () => {
    console.log("로그아웃 버튼 눌림");

    localStorage.removeItem("access_token");

    try {
      await requestLogout();
    } catch (err) {
      console.error("로그아웃 실패:", err);
      return; // 오류 발생 시, 이동하지 않도록 막기
    }

    window.location.href = "/";
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await requestMe();
        if (response.ok) {
          const data = await response.json() as User;
          setUser(data);
        } else {
          console.error("사용자 정보 가져오기 실패");
        }
      } catch (error) {
        console.error("사용자 정보 요청 중 오류 발생:", error);
      }
    }
    // 로그인 상태 확인
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo()
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <>
      <UserInfoDialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen} user={user} />
      <Flex
        height="4.5rem"
        align="center"
        justify="between"
        px="4"
        style={{
          backgroundColor: "var(--color-background)",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* 로고 및 햄버거 메뉴 */}
        <Flex align="center" gap="7">
          <Flex align="center" gap="2" style={{ cursor: "pointer" }}>
            <img
              src="/meal.png"
              alt="급식 로고"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
              }}
            />
            <Box display={{ initial: "none", sm: "block" }}>
              <Text weight="bold" size="4" style={{ color: "#FF6B6B" }} >
                오늘의 급식
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* 사용자 정보 및 메뉴 */}
        {isLoggedIn && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" color="gray" style={{ zIndex: 3 }}>
                <Flex align="center" gap="2">
                  <PersonIcon />
                  <Box display={{ initial: "none", sm: "block" }}>
                    <Text size="2">{user?.name}</Text>
                  </Box>
                </Flex>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => setIsInfoDialogOpen(true)}>
                <Flex align="center" gap="2">
                  <PersonIcon />
                  <Text size="2">내 정보</Text>
                </Flex>
              </DropdownMenu.Item >
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red" onClick={handleLogout}>
                <Flex align="center" gap="2">
                  <ExitIcon />
                  <Text size="2">로그아웃</Text>
                </Flex>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

      </Flex >
    </>

  );
};

export default Header;
