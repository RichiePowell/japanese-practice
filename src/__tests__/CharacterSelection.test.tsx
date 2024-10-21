import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CharacterSelection from "../components/controls/start/CharacterSelection";

const mockKana = {
  Hiragana: {
    name: "Hiragana",
    characters: { a: ["あ"], i: ["い"], u: ["う"] },
  },
  Katakana: {
    name: "Katakana",
    characters: { a: ["ア"], i: ["イ"], u: ["ウ"] },
  },
};

const mockActions = {
  toggleKana: vi.fn(),
  toggleAllKana: vi.fn(),
};

describe("CharacterSelection component", () => {
  it("should render kana options and handle toggle actions", () => {
    const mockKanaSelected = ["Hiragana"];

    render(
      <CharacterSelection
        kana={mockKana}
        kanaSelected={mockKanaSelected}
        actions={mockActions}
      />
    );

    // Check that kana options are rendered
    expect(screen.getByLabelText(/Hiragana/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Katakana/)).toBeInTheDocument();

    // Check that the "Hiragana" set is already selected
    const hiraganaCheckbox = screen.getByLabelText(/Hiragana/);
    expect(hiraganaCheckbox).toBeChecked();

    // Toggle "Katakana" set
    const katakanaCheckbox = screen.getByLabelText(/Katakana/);
    fireEvent.click(katakanaCheckbox);
    expect(mockActions.toggleKana).toHaveBeenCalledWith("Katakana");

    // Test the "Toggle All" functionality
    const toggleAllCheckbox = screen.getByLabelText(/Toggle all/);
    fireEvent.click(toggleAllCheckbox);
    expect(mockActions.toggleAllKana).toHaveBeenCalledWith(true);
  });

  it("should update total kana selected correctly", () => {
    const mockKanaSelected = ["Hiragana"];

    render(
      <CharacterSelection
        kana={mockKana}
        kanaSelected={mockKanaSelected}
        actions={mockActions}
      />
    );

    // Use a function matcher to check the presence of "1 selected"
    expect(
      screen.getByText((content, element) => {
        const hasText = element?.textContent?.includes("1 selected");
        return Boolean(hasText);
      })
    ).toBeInTheDocument();

    // Toggle "Katakana" and check updated selection
    const katakanaCheckbox = screen.getByLabelText(/Katakana/);
    fireEvent.click(katakanaCheckbox);
    expect(mockActions.toggleKana).toHaveBeenCalledWith("Katakana");

    // Check for "2 selected" after toggle
    expect(
      screen.getByText((content, element) => {
        const hasText = element?.textContent?.includes("2 selected");
        return Boolean(hasText);
      })
    ).toBeInTheDocument();
  });
});
