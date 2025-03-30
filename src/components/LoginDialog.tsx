import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import '../animation.css';


interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToRegister: () => void;
}



const LoginDialog = ({ open, onOpenChange, onSwitchToRegister }: LoginDialogProps) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [errorKey, setErrorKey] = useState(0)

    const requestLogin = async () => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value


        if (!email || !password) {
            setError(true);
            setErrorKey(prev => prev + 1);
            setErrMessage('이메일과 비밀번호를 모두 입력해주세요!');
            return;
        }

        const response = await fetch("http://localhost:8000/api/user/login", {
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


                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Root
                            placeholder="이메일을 입력해주세요."
                            ref={emailRef}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Password
                        </Text>
                        <TextField.Root
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            ref={passwordRef}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
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

                    <Dialog.Close>
                        <Button variant="soft" color="gray"
                            onClick={handleClose}>
                            취소
                        </Button>
                    </Dialog.Close>
                    <Button
                        onClick={requestLogin}
                    >로그인</Button>

                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}

export default LoginDialog