import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TasksList from "./task.component";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => mockedUsedNavigate
}));

const mockStore = configureMockStore();
const store = mockStore({});

describe("TasksList component", () => {
  it("should render TasksList component correctly", () => {
    render(<Provider store={store}><TasksList /></Provider>);
    const element = screen.getAllByRole("button");
    expect(element).toBeDefined();
  });
});
