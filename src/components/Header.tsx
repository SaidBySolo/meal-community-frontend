import { Box, IconButton, Flex } from "@radix-ui/themes"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"


const Header = () => {
    return (
        <Flex
            height="4.5rem"
            align="center"

        >
            <IconButton
                variant="ghost"
                color="gray"
                style={{
                    cursor: 'pointer',
                    
                }}

            >
                <HamburgerMenuIcon
                    width={30}
                    height={30}

                />
            </IconButton>

        </Flex>
    )

}

export default Header;