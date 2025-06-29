import { Form } from "radix-ui";
import { Flex } from "@radix-ui/themes"



const RoomFormField = () => {
  return (
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
  )
}

export default RoomFormField