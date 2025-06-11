import { Button, Flex } from "@radix-ui/themes";
import { CameraIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <div style={{ width: "100%", backgroundColor: "blue" }}>
      <Flex
        direction="row"
        align="center"
        justify="center"
        style={{
          marginTop: "auto",
          margin: "0",
          padding: "0",
          width: "100%",
          position: "relative",
        }}
      >
        <Button radius="full" style={{ cursor: "pointer" }}>
          <CameraIcon />
        </Button>
      </Flex>
    </div>
  );
};

export default Footer;
