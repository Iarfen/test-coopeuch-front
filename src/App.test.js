import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
//import configureMockStore from "redux-mock-store";
import store from './store';
import App from './App';

//const mockStore = configureMockStore();
//const store = mockStore({});

test('renders learn react link', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByRole("navigation");
  expect(linkElement).toBeInTheDocument();
});
