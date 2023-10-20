import React from "react";
import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./badge.stories";

const { Default, Counter, Full, Ghost, Medium, New, Outline, Soon, Suspended } =
  composeStories(stories);

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
    test("renders counter type badge", () => {
      const { getByTestId } = render(<Counter data-testid='counter' />);

      const counter = getByTestId("counter");
      expect(counter.className.includes("bg-badge-counter")).toBe(true);
    });

    test("renders new type badge", () => {
      const { getByTestId } = render(<New data-testid='newEl' />);

      const newEl = getByTestId("newEl");
      expect(newEl.className.includes("bg-badge-new")).toBe(true);
    });

    test("renders soon type badge", () => {
      const { getByTestId } = render(<Soon data-testid='soon' />);

      const soon = getByTestId("soon");
      expect(soon.className.includes("bg-badge-soon")).toBe(true);
    });

    test("renders suspended type badge", () => {
      const { getByTestId } = render(<Suspended data-testid='suspended' />);

      const suspended = getByTestId("suspended");
      expect(suspended.className.includes("bg-badge-suspended")).toBe(true);
    });
  });
});
