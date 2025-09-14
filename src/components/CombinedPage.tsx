import { Box, Tabs, Text } from "@radix-ui/themes";
import MealPage from "./MealPage";
import TimetablePage from "./TimetablePage";

const CombinedPage = () => {
  return (
    <Tabs.Root defaultValue="meal" >
      <Tabs.List style={{
        justifyContent: "center",
        position: "relative",
        top: "-40px",
        zIndex: 5000,

      }}>
        <Tabs.Trigger value="meal">급식</Tabs.Trigger>
        <Tabs.Trigger value="timetable">시간표</Tabs.Trigger>
      </Tabs.List>

      <Box pt="3">
        <Tabs.Content value="meal">
          <MealPage />
        </Tabs.Content>

        <Tabs.Content value="timetable">
          <TimetablePage />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}

export default CombinedPage;