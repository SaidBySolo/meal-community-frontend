import {
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { ExitIcon, HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { requestMe } from "../api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await requestMe();
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
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
    <Flex
      height="4.5rem"
      align="center"
      justify="between"
      px="4"
      style={{
        backgroundColor: "var(--color-background)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      {/* 로고 및 햄버거 메뉴 */}
      <Flex align="center" gap="7">
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
              borderRadius: "6px",
            }}
          />
          <Text weight="bold" size="4" style={{ color: "#FF6B6B" }}>
            오늘의 급식
          </Text>
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
                  color="gray"
                />
                <Text size="2">{userName}</Text>
              </Flex>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Flex align="center" gap="2">
                <PersonIcon />
                <Text size="2">내 정보</Text>
              </Flex>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              <Flex align="center" gap="2">
                <ExitIcon />
                <LogoutButton />
              </Flex>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Text size="2" color="gray">
          로그인하여 더 많은 기능 이용하기
        </Text>
      )}
    </Flex>
  );
};

export default Header;
