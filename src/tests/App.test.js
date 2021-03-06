import ShallowRenderer from "react-test-renderer/shallow";
import App from "../App";

it("renders correctly App component", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const view = renderer.getRenderOutput();

  expect(view).toMatchSnapshot();
});
