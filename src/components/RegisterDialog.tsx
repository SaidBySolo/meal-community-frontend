import { Button, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import '../animation.css';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchSchoolDialog from "./SearchSchoolDialog";
import { CreateUserDTO, SchoolInfo } from "../dtos/user";
import { PartialSchoolInfo } from "../types";
import { Form } from "radix-ui";
import { API_URL } from "../constant";


interface RegisterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRevert: () => void;
    onSwitchToLogin: () => void;
}

const RegisterDialog = ({ open, onOpenChange, onSwitchToLogin }: RegisterDialogProps) => {
    const [isSearchSchoolOpen, setIsSearchSchoolOpen] = useState(false);
    const [partialSchoolInfo, setPartialSchoolInfo] = useState<PartialSchoolInfo>({
        name: "",
        edu_office_code: "",
        standard_school_code: ""
    });


    const submit = (formData: FormData) => {
        const name = formData.get('name or nickname') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const grade = formData.get('grade') as string;
        const room = formData.get('room') as string;

        const createUserDto: CreateUserDTO = {
            name: name,
            email: email,
            password: password,
            school_info: {
                ...partialSchoolInfo,
                grade: parseInt(grade),
                room: parseInt(room),
            }
        }

        requestRegister(createUserDto);
    }



    const requestRegister = async (createUserDto: CreateUserDTO) => {
        const response = await fetch(API_URL + '/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createUserDto),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            return;
        }

        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <Dialog.Root open={open} onOpenChange={onOpenChange}  >
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


                    <Form.Root className="FormRoot" action={submit}  >
                        <Flex direction="column" gap="3">
                            <Form.Field
                                className="FormField"
                                name="name or nickname"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            이름 또는 닉네임
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"

                                        >
                                            이름 또는 닉네임을 입력해주세요!
                                        </Form.Message>
                                    </Flex>
                                    <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface" justify="center">
                                        <Form.Control asChild>
                                            <input
                                                className="rt-reset rt-TextFieldInput"
                                                type="text"
                                                placeholder="홍길동"
                                                required />
                                        </Form.Control>
                                    </Flex>
                                </Flex>
                            </Form.Field>

                            <Form.Field
                                className="FormField"
                                name="email"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            이메일
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"

                                        >
                                            이메일을 입력해주세요
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="typeMismatch"
                                            data-accent-color="red"
                                        >
                                            유효한 이메일 주소를 입력해주세요
                                        </Form.Message>
                                    </Flex>
                                    <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                                        <Form.Control asChild>
                                            <input
                                                className="rt-reset rt-TextFieldInput"
                                                type="email"
                                                placeholder="이메일을 입력해주세요."
                                                required />
                                        </Form.Control>
                                    </Flex>
                                </Flex>
                            </Form.Field>
                            <Form.Field
                                className="FormField"
                                name="password"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label
                                            className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            비밀번호
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"
                                        >
                                            비밀번호를 입력해주세요
                                        </Form.Message>

                                    </Flex>
                                    <Flex direction="column" gap="2">
                                        <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface" direction="column" justify="center">
                                            <Form.Control asChild>
                                                <input
                                                    className="rt-reset rt-TextFieldInput"
                                                    type="password"
                                                    placeholder="비밀번호를 입력해주세요."
                                                    required />
                                            </Form.Control>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Form.Field>
                            <Form.Field
                                className="FormField"
                                name="passwordConfirm"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label
                                            className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            비밀번호 확인
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"
                                        >
                                            비밀번호를 입력해주세요
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match={(value, formData) => value !== formData.get('password')}
                                            data-accent-color="red"
                                        >
                                            비밀번호가 맞지 않습니다.
                                        </Form.Message>

                                    </Flex>
                                    <Flex direction="column" gap="2">
                                        <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface" direction="column" justify="center">
                                            <Form.Control asChild>
                                                <input
                                                    className="rt-reset rt-TextFieldInput"
                                                    type="password"
                                                    placeholder="비밀번호를 다시 한번 입력해주세요."
                                                    required />
                                            </Form.Control>
                                        </Flex>
                                        <Text size="1" mb="1" >
                                            * 비밀번호는 8자 이상이어야 합니다.
                                        </Text>
                                    </Flex>

                                </Flex>
                            </Form.Field>
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
                            <Form.Field
                                className="FormField"
                                name="grade"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            학년
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"

                                        >
                                            학년을 입력해주세요
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="rangeUnderflow"
                                            data-accent-color="red"
                                        >
                                            학년은 1 이상이어야 합니다
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="rangeOverflow"
                                            data-accent-color="red"
                                        >
                                            학년은 20 이하이어야 합니다
                                        </Form.Message>
                                    </Flex>
                                    <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                                        <Form.Control asChild>
                                            <input
                                                className="rt-reset rt-TextFieldInput"
                                                min={1}
                                                max={20}
                                                type="number"
                                                placeholder="학년을 입력해주세요."
                                                required />
                                        </Form.Control>
                                    </Flex>
                                </Flex>
                            </Form.Field>
                            <Form.Field
                                className="FormField"
                                name="room"
                            >
                                <Flex direction="column">
                                    <Flex justify="between" align={"center"}>
                                        <Form.Label className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                                            반
                                        </Form.Label>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="valueMissing"
                                            data-accent-color="red"

                                        >
                                            반을 입력해주세요
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="rangeUnderflow"
                                            data-accent-color="red"
                                        >
                                            반은 1 이상이어야 합니다
                                        </Form.Message>
                                        <Form.Message
                                            className="rt-Text rt-r-size-1"
                                            match="rangeOverflow"
                                            data-accent-color="red"
                                        >
                                            반은 20 이하이어야 합니다
                                        </Form.Message>
                                    </Flex>
                                    <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                                        <Form.Control asChild>
                                            <input
                                                className="rt-reset rt-TextFieldInput"
                                                type="number"
                                                min={1}
                                                max={20}
                                                placeholder="반을 입력해주세요."
                                                required />
                                        </Form.Control>
                                    </Flex>
                                </Flex>
                            </Form.Field>
                        </Flex>
                        <Flex justify="end" align="center" gap="3" mt="4">
                            <Flex gap="2">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        취소
                                    </Button>
                                </Dialog.Close>

                                <Form.Submit asChild>
                                    <Button>
                                        가입하기
                                    </Button>
                                </Form.Submit>
                            </Flex>
                        </Flex>
                    </Form.Root>
                </Dialog.Content>
            </Dialog.Root >
            <SearchSchoolDialog setPartialSchoolInfo={setPartialSchoolInfo} open={isSearchSchoolOpen} onOpenChange={setIsSearchSchoolOpen} />
        </>

    )
}

export default RegisterDialog