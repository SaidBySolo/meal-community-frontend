import { Form } from "radix-ui";
import { Flex } from "@radix-ui/themes"


const PasswordFormField = () => {
  return (

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
  )
}

export default PasswordFormField