import { render, screen } from "@testing-library/react";
import App from "../App";

describe("RENDER", () => {
  test("world Element", () => {
    render(<App />);
    const linkElement = screen.getByTestId("world");
    expect(linkElement).toBeInTheDocument();
  });
});
