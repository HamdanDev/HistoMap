import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/MapView", () => () => <div data-testid="map" />);
jest.mock("./hooks/useEvents", () => ({
  useEvents: () => ({ events: [], loading: false, error: null }),
}));

test("renders the historical map shell", () => {
  render(<App />);
  expect(screen.getByText(/histomap europe/i)).toBeInTheDocument();
});
