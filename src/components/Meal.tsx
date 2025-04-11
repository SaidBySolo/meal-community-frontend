import { Box, Flex, Heading, RadioCards, ScrollArea, Text } from "@radix-ui/themes"

const MealCard = () => {
    return (
        <RadioCards.Item value="0">
            <Flex direction="column" width="100%">
                <Text weight="bold">조식</Text>

                <Text>
                </Text>
            </Flex>
        </RadioCards.Item>
    )
}



const MealStructure = () => {
    return (
        <ScrollArea scrollbars="horizontal" style={{ height: 180 }}>
            <RadioCards.Root defaultValue="0" orientation="horizontal">
                <MealCard />
                <MealCard />
                <MealCard />
            </RadioCards.Root>
        </ScrollArea>
    )
}