import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Text, H2 } from "@adminjs/design-system";

function Dashboard(props) {
  let redirect = useNavigate();
  // const redirectClick = redirect("/", { replace: true });

  return (
    <Box flex width={["auto", "auto", "auto"]}>
      <Box
        p="x3"
        flexGrow={2}
        display={["block", "block", "block"]}
        position="relative"
      >
        <H2 fontWeight="lighter" textAlign="center">
          Welcome!!!
        </H2>
        <Text fontWeight="lighter" textAlign="center" mt="default">
          Yoooooo!
        </Text>
        <Text mt="xl" textAlign="center">
          <Button
            variant="danger"
            rounded={true}
            onClick={() => redirect("/", { replace: true })}
          >
            Exit
          </Button>
        </Text>
      </Box>
    </Box>
  );
}

// export default withRouter(Dashboard);
export default Dashboard;
