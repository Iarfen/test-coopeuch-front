import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddTask from "./add-task.component";

const mockStore = configureMockStore();
const store = mockStore({});

describe("AddTask component", () => {
  it("should render AddTask component correctly", () => {
    render(<Provider store={store}><AddTask /></Provider>);
    const element = screen.getByRole("textbox");
    expect(element).toBeInTheDocument();
  });
});
