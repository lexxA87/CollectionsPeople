import NotFound from "../components/helper/NotFound";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders correctly NotFound component", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NotFound />);
  const view = renderer.getRenderOutput();

  expect(view).toMatchSnapshot();
});
