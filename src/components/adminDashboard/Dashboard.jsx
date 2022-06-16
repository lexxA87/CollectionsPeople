import React from "react";
import {
  Box,
  Text,
  H2,
  Button,
  NavigationElement,
} from "@adminjs/design-system";

function Dashboard(props) {
  return (
    <Box flex width={["auto", "auto", "auto"]}>
      <Box
        p="x3"
        flexGrow={2}
        display={["block", "block", "block"]}
        position="relative"
      >
        <H2 fontWeight="lighter" textAlign="center">
          Welcome to Admin's dashboard!
        </H2>
        <Text fontWeight="lighter" textAlign="center" mt="default">
          You can make most things here with data-base "Collections People".
          Have a good work!
        </Text>
        <Text fontWeight="lighter" textAlign="center" mt="default">
          OR
        </Text>

        <Box justifyContent="center" alignItems="center" flex mt="default">
          <Box
            borderStyle="solid"
            borderColor="love"
            borderWidth={1}
            bg="errorLight"
          >
            <NavigationElement href="/" label="Go out" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
