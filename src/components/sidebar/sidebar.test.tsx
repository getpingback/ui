import React from "react";
import { fireEvent, getAllByText, render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./sidebar.stories";

const { Default } =
  composeStories(stories);

describe("Sidebar Component", () => {
    test("It should render the closed sidebar by default", () => {
      const { getByTestId } = render(<Default />);
      const sidebarContainer = getByTestId("sidebar");
        expect(sidebarContainer.className.includes("w-[114px]")).toBe(true); 
      });
      test("render open Sidebar", () => {
        const { getByTestId } = render(<Default />);
        const sidebarContainer = getByTestId("sidebar");
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(sidebarContainer.className.includes("w-[250px]")).toBe(true);
      });
      test("The sidebar should close when the user clicks escape", () => {
        const { getByTestId } = render(<Default />);
        const sidebarContainer = getByTestId("sidebar");
        const button = screen.getByRole("button");
        fireEvent.click(button);
        
        fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
        expect(sidebarContainer.className.includes("w-[114px]")).toBe(true);
      });
      test("should render the correct sidebar layout", () => {
        const { getByTestId } = render(<Default />);
        const sidebarContainer = getByTestId("sidebar");
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(sidebarContainer.className.includes("bg-background-accent")).toBe(true);
        expect(sidebarContainer.className.includes("shadow-bottom_sheet-2")).toBe(true);
        
      });
      test("should render the correct header layout", () => {
        const { getByTestId } = render(<Default />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        
        const header = getByTestId("sidebar-header");
        expect(getAllByText(header, "Header")).not.toBeNull();
        expect(header.className.includes("h-[40px]")).toBe(true);

      });
      test("should render the correct footer layout", () => {
        const { getByTestId } = render(<Default />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
     
        const footer = getByTestId("sidebar-footer");
        expect(getAllByText(footer, "Footer")).not.toBeNull();
        expect(footer.className.includes("h-[68px]")).toBe(true);

      });
      test("should render the correct content layout", () => {
        const { getByTestId } = render(<Default />);
        const button = screen.getByRole("button");
        fireEvent.click(button);

        const content = getByTestId("sidebar-content");
        expect(getAllByText(content, "Dashboard")).not.toBeNull();
        expect(getAllByText(content, "Seetings")).not.toBeNull();
        expect(getAllByText(content, "Create")).not.toBeNull();
        expect(getAllByText(content, "Measure")).not.toBeNull();
        expect(content.className.includes("h-[calc(100vh-68px)]")).toBe(true);
        expect(content.className.includes("overflow-y-scroll")).toBe(true);

      });
      
});
