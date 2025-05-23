import { Button, Dialog, Flex, Link, Text } from "@radix-ui/themes";
import { useState } from "react";
import '../animation.css';
import { CreateUserDTO } from "../dtos/user";
import { PartialSchoolInfo } from "../types";
import { Form } from "radix-ui";
import NameFormField from "./Form/Name";
import EmailFormField from "./Form/Email";
import PasswordFormField from "./Form/Password";
import PasswordConfirmFormField from "./Form/PasswordConfirm";
import SchoolFormField from "./Form/School";
import GradeFormField from "./Form/Grade";
import RoomFormField from "./Form/Room";
import { requestRegister } from "../api";

interface RegisterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRevert: () => void;
    onSwitchToLogin: () => void;
}

const RegisterDialog = ({ open, onOpenChange, onSwitchToLogin }: RegisterDialogProps) => {
    const [isPending, setIsPending] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [partialSchoolInfo, setPartialSchoolInfo] = useState<PartialSchoolInfo>({

        name: "",
        edu_office_code: "",
        standard_school_code: ""
    });


    const submit = async (formData: FormData) => {
        const name = formData.get('name or nickname') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const grade = formData.get('grade') as string;
        const room = formData.get('room') as string;

        const createUserDto: CreateUserDTO = {
            name: name,
            email: email,
            password: password,
            grade: parseInt(grade),
            room: parseInt(room),
            school_info: {
                ...partialSchoolInfo,

            }
        }

        const response = await requestRegister(createUserDto);

        const result = await response.json();

        if (!response.ok) {
            setIsPending(false);
            setErrMessage(result.message);
            return;
        }
        setIsPending(false);
        localStorage.setItem('access_token', result.access_token);
        window.location.href = '/';
    }


    return (
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


                <Form.Root className="FormRoot" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsPending(true);
                    const formData = new FormData(e.currentTarget);
                    await submit(formData);
                }} >
                    <Flex direction="column" gap="3">
                        <NameFormField />
                        <EmailFormField />
                        <PasswordFormField />
                        <PasswordConfirmFormField />
                        <SchoolFormField
                            partialSchoolInfo={partialSchoolInfo}
                            setPartialSchoolInfo={setPartialSchoolInfo}
                        />
                        <GradeFormField />
                        <RoomFormField />
                    </Flex>
                    {
                        errMessage && (
                            <Text size="1" color="red" mt="2">
                                {errMessage}
                            </Text>
                        )
                    }
                    <Flex justify="end" align="center" gap="3" mt="4">
                        <Flex gap="2">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    취소
                                </Button>
                            </Dialog.Close>

                            <Form.Submit asChild>
                                <Button loading={isPending}  >
                                    가입하기
                                </Button>
                            </Form.Submit>
                        </Flex>
                    </Flex>
                </Form.Root>
            </Dialog.Content>
        </Dialog.Root >

    )
}

export default RegisterDialog