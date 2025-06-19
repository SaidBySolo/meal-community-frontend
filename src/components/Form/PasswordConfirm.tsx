import { Form } from "radix-ui";
import { Flex, Text } from "@radix-ui/themes"



const PasswordConfirmFormField = () => {
  return (
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
  )
}

export default PasswordConfirmFormField