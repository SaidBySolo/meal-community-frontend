import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FormEvent, useRef, useState } from "react";
import '../animation.css';
import { Form } from "radix-ui"
import { API_URL } from "../constant";
import PasswordFormField from "./Form/Password";
import EmailFormField from "./Form/Email";


interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToRegister: () => void;
}


const LoginDialog = ({ open, onOpenChange, onSwitchToRegister }: LoginDialogProps) => {
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [errorKey, setErrorKey] = useState(0)


    const submit = (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        requestLogin(email!, password!);
    }

    const requestLogin = async (email: string, password: string) => {
        const response = await fetch(API_URL + "/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            credentials: "include",
        });
        const body = await response.json();

        if (response.status === 200) {
            setError(false);
            setErrMessage('');
            localStorage.setItem('access_token', body.access_token);
            window.location.href = '/';
        } else {
            setError(true);
            setErrMessage(body.message);
            setErrorKey(prev => prev + 1);
        }

    }

    const handleClose = () => {
        setError(false);
        setErrMessage('');
        setErrorKey(0);
    }


    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>로그인</Dialog.Title>
                <Dialog.Description
                    size="2"
                    mb="4"
                    style={{ color: error ? 'red' : 'inherit' }}
                    className={error ? 'shake-animation' : ''}
                    key={errorKey}
                >
                    {error ? errMessage : '이메일과 비밀번호를 입력해주세요.'}
                </Dialog.Description>


                <Form.Root className="FormRoot" action={submit} >
                    <Flex direction="column" gap="3">
                        <EmailFormField />
                        <PasswordFormField />
                    </Flex>
                    <Flex justify="between" align="center" gap="3" mt="4">
                        <Text
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
                            onClick={() => {
                                onSwitchToRegister()
                                handleClose()
                            }}
                        >회원가입</Text>
                        <Flex gap="2">
                            <Dialog.Close>
                                <Button variant="soft" color="gray"
                                    onClick={handleClose}>
                                    취소
                                </Button>
                            </Dialog.Close>
                            <Form.Submit asChild>
                                <Button>
                                    로그인
                                </Button>
                            </Form.Submit>
                        </Flex>
                    </Flex>
                </Form.Root>
            </Dialog.Content>
        </Dialog.Root >

    )
}

export default LoginDialog