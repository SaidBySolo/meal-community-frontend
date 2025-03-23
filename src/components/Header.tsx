import { Box, Flex } from "@radix-ui/themes"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"


const Header = () => {
    return (
        <Flex
            height="4.5rem"
            style={
                {
                    backgroundColor: 'green'
                }
            }
            align="center"
        >
            <HamburgerMenuIcon
                style={
                    {
                        marginLeft: '1rem',
                    }
                }
                width={30}
                height={30}
                
            />
        </Flex>
    )

}

export default Header;