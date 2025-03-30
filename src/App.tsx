import { Flex, Text, Button, Box, Section } from "@radix-ui/themes"
import Header from "./components/Header"
import MainPage from "./components/MainPage"
import Footer from "./components/Footer"


function App() {

  return (
    <Flex height="100vh" direction="column">
      <MainPage />
    </Flex>

  )
}

export default App
