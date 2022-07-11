import Loading from "../components/helper/Loading";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders correctly Loading component", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Loading />);
  const view = renderer.getRenderOutput();

  expect(view).toMatchSnapshot();
});
