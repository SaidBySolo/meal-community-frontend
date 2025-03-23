import { Flex, Text, Button, Box, Section } from "@radix-ui/themes"
import Header from "./components/Header"


function App() {

  return (
    <Flex height="100vh" direction="column" style={{ backgroundColor: 'gray' }}>
      <Header />
      <Box
        height="100vh"
        style={{ backgroundColor: 'gray' }}>
      </Box>
    </Flex>

  )
}

export default App
