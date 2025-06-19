import { Form } from "radix-ui";
import { Flex } from "@radix-ui/themes"


const NameFormField = () => {
  return (
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
  )
}

export default NameFormField