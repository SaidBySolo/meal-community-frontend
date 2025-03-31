import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FormEvent, useRef, useState } from "react";
import '../animation.css';
import { Form } from "radix-ui"
import { API_URL } from "../constant";


interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToRegister: () => void;
}


const LoginDialog = ({ open, onOpenChange, onSwitchToRegister }: LoginDialogProps) => {
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [errorKey, setErrorKey] = useState(0)
    const [email, setEmail] = useState('');

    const submit = (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        requestLogin(email!, password!);
    }

    const requestLogin = async (email: string, password: string) => {
        setEmail(email);

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
            setEmail('')
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
        setEmail('')
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
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
                                <div className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                                    <Form.Control asChild>
                                        <input
                                            className="rt-reset rt-TextFieldInput"
                                            type="email"
                                            placeholder="이메일을 입력해주세요."
                                            onChange={handleEmailChange}
                                            value={email}
                                            required />
                                    </Form.Control>
                                </div>
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
                                <div className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                                    <Form.Control asChild>
                                        <input
                                            className="rt-reset rt-TextFieldInput"
                                            type="password"
                                            placeholder="비밀번호를 입력해주세요."
                                            required />
                                    </Form.Control>
                                </div>
                            </Flex>
                        </Form.Field>
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