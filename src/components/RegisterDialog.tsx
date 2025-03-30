import { Button, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import '../animation.css';

const RegisterDialog = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
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


                >회원가입</Text>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>회원가입</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                </Dialog.Description>


                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia.
                        </Text>
                        <TextField.Root
                            placeholder="lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto iste ratione, a, similique rerum non repudiandae mollitia officia tenetur blanditiis esse, commodi deserunt voluptate ex repellat quisquam tempora quia."
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">취소</Button>
                    </Dialog.Close>
                    <Button>확인</Button>

                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}

export default RegisterDialog