import React from "react";
import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./badge.stories";

const { Default, Full, Ghost, Medium, Outline } = composeStories(stories);

describe("Badge Component", () => {
  describe("appearence variant", () => {
    test("renders default badge", () => {
      render(<Default />);
      expect(screen.getByText(/Badge/i)).not.toBeNull();
    });

    test("renders outline appearence badge", () => {
      const { getByTestId } = render(<Outline data-testid='outline' />);

      const outline = getByTestId("outline");
      expect(outline.className.includes("border")).toBe(true);
      expect(outline.className.includes("bg-transparent")).toBe(true);
    });

    test("renders ghost appearence badge", () => {
      const { getByTestId } = render(<Ghost data-testid='ghost' />);

      const ghost = getByTestId("ghost");
      expect(ghost.className.includes("border-none")).toBe(true);
    });
  });

  describe("radius variant", () => {
    test("renders full radius badge", () => {
      const { getByTestId } = render(<Full data-testid='full' />);

      const full = getByTestId("full");
      expect(full.className.includes("rounded-full")).toBe(true);
    });

    test("renders medium radius badge", () => {
      const { getByTestId } = render(<Medium data-testid='medium' />);

      const medium = getByTestId("medium");
      expect(medium.className.includes("rounded-md")).toBe(true);
    });
  });

  describe("type variant", () => {
    test("renders gray type badge", () => {
      const { getByTestId } = render(<Default type='gray' data-testid='gray' />);

      const gray = getByTestId("gray");
      expect(gray.className.includes("bg-badge-gray")).toBe(true);
    });

    test("renders green type badge", () => {
      const { getByTestId } = render(<Default type="green" data-testid='greenEl' />);

      const greenEl = getByTestId("greenEl");
      expect(greenEl.className.includes("bg-badge-green")).toBe(true);
    });

    test("renders teal type badge", () => {
      const { getByTestId } = render(<Default type="teal" data-testid='teal' />);

      const teal = getByTestId("teal");
      expect(teal.className.includes("bg-badge-teal")).toBe(true);
    });

    test("renders red type badge", () => {
      const { getByTestId } = render(<Default type="red" data-testid='red' />);

      const red = getByTestId("red");
      expect(red.className.includes("bg-badge-red")).toBe(true);
    });
  });
});
