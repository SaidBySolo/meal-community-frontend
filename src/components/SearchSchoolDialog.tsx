import { Button, Dialog, Flex, Link, RadioCards, ScrollArea, Text, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import '../animation.css';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { PartialSchoolInfo } from "../types";

interface SearchSchoolDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setPartialSchoolInfo: (schoolInfo: PartialSchoolInfo) => void;
}

interface School {
    edu_office_code: string;
    standard_school_code: string;
    name: string;
    street_name_address: string
}

interface SearchResultItemProps {
    value: string;
    name: string;
    street_name_address: string;
}

const SearchResultItem = ({ value, name, street_name_address }: SearchResultItemProps) => {
    return (
        <RadioCards.Item value={value} style={{ width: "93%" }}>
            <Flex direction="column" width="100%">
                <Text weight="bold">{name}</Text>
                <Text>{street_name_address}</Text>
            </Flex>
        </RadioCards.Item>
    )
}

const SearchSchoolDialog = ({ open, onOpenChange, setPartialSchoolInfo }: SearchSchoolDialogProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("0");
    const [isFound, setIsFound] = useState(false);
    const [setSchools, setSetSchools] = useState<School[]>([]);
    const [errMessage, setErrMessage] = useState<string>("");


    const searchSchool = async (schoolName: string) => {
        const response = await fetch(`http://localhost:8000/api/school/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: schoolName }),
        });

        const result = await response.json()

        if (!response.ok) {
            setErrMessage(result.message);
            setIsFound(false);
            return;
        }

        setIsFound(true);
        const schools = result.results as School[];
        setSetSchools(schools);
    }


    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange} >
            <Dialog.Content maxWidth="600px">
                <Dialog.Title>학교 검색</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    학교를 검색한후 선택해주세요.
                    <br />
                    <Text size="1" mb="1" >
                        * 학교를 검색하기 위해서는 학교 이름을 입력한 후 돋보기 아이콘을 클릭해주세요.
                    </Text>
                </Dialog.Description>
                <Flex direction="column" gap="3">
                    <label>

                        <TextField.Root
                            placeholder="학교를 검색해주세요"
                            style={
                                {
                                    paddingLeft: 10,
                                    flexDirection: "row-reverse"
                                }
                            }
                            ref={inputRef}
                        >
                            <TextField.Slot >
                                <MagnifyingGlassIcon height="16" width="16"
                                    onClick={() => searchSchool(inputRef.current?.value ?? "")}
                                    style={{
                                        cursor: "pointer",
                                    }} />
                            </TextField.Slot>
                        </TextField.Root>

                    </label>
                    <ScrollArea scrollbars="vertical" style={{ height: 180 }}>
                        <RadioCards.Root
                            defaultValue="0"
                            columns={{ initial: "1", sm: "1" }}
                            onValueChange={setValue}
                            style={{
                                justifyItems: "center"
                            }}
                        >
                            {
                                isFound ? setSchools.map((school, index) => (
                                    <SearchResultItem value={index.toString()} name={school.name} street_name_address={school.street_name_address} />
                                )) : errMessage ? <Text color="red">{errMessage}</Text> : <Text>학교를 검색해주세요</Text>
                            }

                        </RadioCards.Root>
                    </ScrollArea>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">취소</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            onClick={() => {
                                const selectedSchool = setSchools[Number(value)];
                                setPartialSchoolInfo({
                                    edu_office_code: selectedSchool.edu_office_code,
                                    standard_school_code: selectedSchool.standard_school_code,
                                    name: selectedSchool.name,
                                });
                            }}
                        >확인</Button>
                    </Dialog.Close>

                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}

export default SearchSchoolDialog