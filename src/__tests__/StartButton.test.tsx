import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import StartButton from "../components/controls/start/StartButton";

describe("StartButton component", () => {
  it("should navigate to /play when kana sets are selected", () => {
    render(
      <BrowserRouter>
        <StartButton kanaSelected={["Hiragana"]} />
      </BrowserRouter>
    );
    const button = screen.getByText("Start Game");

    // Assert that the button is a link to /play
    expect(button).toHaveAttribute("href", "/play");
  });

  it("should alert when no kana sets are selected", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <BrowserRouter>
        <StartButton kanaSelected={[]} />
      </BrowserRouter>
    );
    const button = screen.getByText("Start Game");

    // Simulate a click on the button
    fireEvent.click(button);

    // Assert that the alert was called
    expect(alertMock).toHaveBeenCalledWith(
      "Please select what you want to practice."
    );

    alertMock.mockRestore(); // Restore the alert function
  });
});
