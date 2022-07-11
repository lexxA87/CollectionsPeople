import { render, screen } from "@testing-library/react";
import Loading from "../components/helper/Loading";

test("renders learn react link", () => {
  render(<Loading />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
