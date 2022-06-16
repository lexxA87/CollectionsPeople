import React from "react";
// import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function Dashboard() {
  // const redirect = useNavigate();

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Welcome to admin dashboard!</Card.Title>
        <Card.Text>
          You can do most things with data base "Collections People"
        </Card.Text>
        <Button
          variant="outline-danger"
          size="lg"
          // onClick={() => redirect("/")}
        >
          Exit from..
        </Button>
      </Card.Body>
    </Card>
  );
}

// export default withRouter(Dashboard);
export default Dashboard;
