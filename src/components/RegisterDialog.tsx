import { Button, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import '../animation.css';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchSchoolDialog from "./SearchSchoolDialog";
import { CreateUserDTO, SchoolInfo } from "../dtos/user";
import { PartialSchoolInfo } from "../types";


interface RegisterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRevert: () => void;
    onSwitchToLogin: () => void;
}

const RegisterDialog = ({ open, onOpenChange, onRevert, onSwitchToLogin }: RegisterDialogProps) => {
    const [isSearchSchoolOpen, setIsSearchSchoolOpen] = useState(false);
    const [partialSchoolInfo, setPartialSchoolInfo] = useState<PartialSchoolInfo>({
        name: "",
        edu_office_code: "",
        standard_school_code: ""
    });

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const gradeRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);

    const requestRegister = async (createUserDto: CreateUserDTO) => {
        const response = await fetch('http://localhost:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createUserDto),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <Dialog.Root open={open} onOpenChange={onOpenChange} >
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>회원가입</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        <Text size="2" mb="1" weight="bold">
                            회원가입을 위해 아래 정보를 입력해주세요.
                        </Text>
                        <br />
                        <Text size="1" mb="1" >
                            * 이미 계정이 있으신가요? <Link
                                size="1"
                                weight="bold"
                                style={
                                    {
                                        alignSelf: 'center',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        flex: "1"
                                    }
                                }
                                onClick={() => onSwitchToLogin()}
                            >로그인</Link>
                        </Text>
                    </Dialog.Description>


                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                이름 또는 닉네임
                            </Text>
                            <TextField.Root
                                placeholder="홍길동"
                                ref={nameRef}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                이메일
                            </Text>
                            <TextField.Root
                                placeholder="s@id.by.solo.moe"
                                type="email"
                                ref={emailRef}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                비밀번호
                            </Text>
                            <TextField.Root
                                placeholder="비밀번호를 입력하세요"
                                type="password"
                                ref={passwordRef}
                            />
                            <TextField.Root
                                placeholder="비밀번호를 다시 입력하세요"
                                type="password"
                                ref={passwordConfirmRef}
                                mt={"2"}
                            />
                            <Text size="1" mb="1" >
                                * 비밀번호는 8자 이상이어야 합니다.
                            </Text>
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">학교 검색</Text>
                            <TextField.Root
                                placeholder={partialSchoolInfo.name === "" ? "학교를 검색해주세요" : partialSchoolInfo.name}
                                onClick={() => setIsSearchSchoolOpen(true)}
                                style={{
                                    pointerEvents: 'stroke',
                                    caretColor: 'transparent',
                                }}
                            >
                                <TextField.Slot>
                                    <MagnifyingGlassIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                학년
                            </Text>
                            <TextField.Root
                                placeholder="1"
                                type="number"
                                ref={gradeRef}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                반
                            </Text>
                            <TextField.Root
                                placeholder="1"
                                type="number"
                                ref={roomRef}
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Link
                            size="1"
                            weight="bold"
                            color="gray"
                            style={
                                {
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    flex: "1"
                                }
                            }
                            onClick={() => onRevert()}
                        >돌아가기</Link>
                        <Dialog.Close>
                            <Button variant="soft" color="gray">취소</Button>
                        </Dialog.Close>
                        <Button
                            onClick={
                                () => {
                                    const schoolInfo: SchoolInfo = {
                                        name: partialSchoolInfo.name,
                                        grade: Number(gradeRef.current?.value),
                                        room: Number(roomRef.current?.value),
                                        edu_office_code: partialSchoolInfo.edu_office_code,
                                        standard_school_code: partialSchoolInfo.standard_school_code,
                                    }
                                    requestRegister({
                                        name: nameRef.current?.value || "",
                                        email: emailRef.current?.value || "",
                                        password: passwordRef.current?.value || "",
                                        school_info: schoolInfo
                                    })
                                }
                            }
                        >확인
                        </Button>

                    </Flex>
                </Dialog.Content>
            </Dialog.Root >
            <SearchSchoolDialog setPartialSchoolInfo={setPartialSchoolInfo} open={isSearchSchoolOpen} onOpenChange={setIsSearchSchoolOpen} />
        </>

    )
}

export default RegisterDialog