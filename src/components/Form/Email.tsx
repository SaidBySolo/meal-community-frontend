import { Form } from "radix-ui";
import { Flex } from "@radix-ui/themes"
import { useState } from "react";

const EmailFormField = () => {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
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
                            onChange={handleEmailChange}
                            value={email}
                            required />
                    </Form.Control>
                </Flex>
            </Flex>
        </Form.Field>
    )
}

export default EmailFormField