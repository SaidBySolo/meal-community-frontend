import { Button, Dialog, Flex, Text, } from "@radix-ui/themes";
import { useState } from "react";
import { User } from "../dtos/user";

interface UserInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}


const UserInfoDialog = ({ open, onOpenChange, user }: UserInfoDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>내 정보</Dialog.Title>
        <Dialog.Description
          size="2"
          mb="4"
        >
          회원님의 정보입니다.
        </Dialog.Description>
        <Flex direction="column" gap="2">
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">이름</Text>
            <Text size="2">{user?.name}</Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">이메일</Text>
            <Text size="2">{user?.email}</Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">학교</Text>
            <Text size="2">{user?.school_info.name}</Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">학년/반</Text>
            <Text size="2">{user?.grade}학년 {user?.room}반</Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">가입일</Text>
            <Text size="2">{new Date(user?.created_at || "").toLocaleDateString()}</Text>
          </Flex>

        </Flex>
        <Dialog.Close >
          <Button mt="5" variant="solid" color="red" >닫기</Button>
        </Dialog.Close>

      </Dialog.Content>
    </Dialog.Root >

  )
}

export default UserInfoDialog;