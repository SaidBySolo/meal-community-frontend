"use client";

import {
  Dialog,
  Flex,
  Text,
  Box,
  Avatar,
  Button,
  VisuallyHidden,
} from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

interface MyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail: string;
}

export default function MyDialog({
  open,
  onOpenChange,
  userName,
  userEmail,
}: MyDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 400 }}>
        <Dialog.Title>
          <VisuallyHidden>내 정보 보기</VisuallyHidden>
        </Dialog.Title>

        <Flex justify="between" align="center" mb="4">
          <Text size="5" weight="bold">
            내 정보
          </Text>
          <Dialog.Close>
            <Button variant="ghost" size="1">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="4">
          <Flex justify="center">
            <Avatar fallback={userName.charAt(0).toUpperCase()} size="6" />
          </Flex>

          <Box>
            <Text as="p" size="3" weight="bold">
              닉네임
            </Text>
            <Text as="p" size="3">
              {userName}
            </Text>
          </Box>

          <Box>
            <Text as="p" size="3" weight="bold">
              이메일
            </Text>
            <Text as="p" size="3">
              {userEmail}
            </Text>
          </Box>
        </Flex>

        <Flex justify="end" mt="5">
          <Dialog.Close>
            <Button variant="soft">닫기</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
