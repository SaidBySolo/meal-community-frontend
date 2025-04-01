
import { Form } from "radix-ui";
import { Flex } from "@radix-ui/themes"
import SearchSchoolDialog from "../SearchSchoolDialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { PartialSchoolInfo } from "../../types";
import { useState } from "react";

interface SchoolFormFieldProps {
    partialSchoolInfo: PartialSchoolInfo;
    setPartialSchoolInfo: (partialSchoolInfo: PartialSchoolInfo) => void;
}

const SchoolFormField = (
    { partialSchoolInfo, setPartialSchoolInfo }: SchoolFormFieldProps
) => {
    const [isSearchSchoolOpen, setIsSearchSchoolOpen] = useState(false);
    return (
        <>
            <Form.Field
                className="FormField"
                name="school"
            >
                <Flex direction="column">
                    <Flex justify="between" align={"center"}>
                        <Form.Label className="rt-Text rt-r-size-2 rt-r-weight-bold rt-r-mb-1">
                            학교
                        </Form.Label>
                        <Form.Message
                            className="rt-Text rt-r-size-1"
                            match="valueMissing"
                            data-accent-color="red"

                        >
                            학교를 선택해주세요
                        </Form.Message>
                    </Flex>
                    <Flex className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
                        <Form.Control asChild>
                            <input
                                className="rt-reset rt-TextFieldInput"
                                onClick={
                                    () => setIsSearchSchoolOpen(true)
                                }
                                placeholder={partialSchoolInfo.name === "" ? "학교를 입력해주세요." : partialSchoolInfo.name}
                                required />
                        </Form.Control>
                        <Flex className="rt-TextFieldSlot">
                            <MagnifyingGlassIcon height="16" width="16" />
                        </Flex>
                    </Flex>
                </Flex>
            </Form.Field>
            <SearchSchoolDialog setPartialSchoolInfo={setPartialSchoolInfo} open={isSearchSchoolOpen} onOpenChange={setIsSearchSchoolOpen} />
        </>
    )

}

export default SchoolFormField