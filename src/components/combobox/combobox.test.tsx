import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./combobox.stories";

const { Default, Detailed, IconCompact, ImageDetailed, ShouldFilterFalse } = composeStories(stories);

describe("Combobox Component", () => {
  describe("Default Variant", () => {
    it("should render correctly with default props", () => {
      const { getByRole } = render(<Default />);
      const comboboxButton = getByRole("combobox");
      expect(comboboxButton).toBeInTheDocument();
      expect(comboboxButton).toHaveTextContent("Selecione o link");
    });

    it("should open dropdown when clicked", () => {
      const { getByRole, getByTestId } = render(<Default />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);
      expect(getByTestId("comboxbox-popover-content")).toBeVisible();
    });

    it("should display correct items and handle selection", () => {
      const onSelectMock = jest.fn();
      const { getByRole, getByText } = render(<Default onSelect={onSelectMock} />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const item = getByText("https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/");
      fireEvent.click(item);

      expect(onSelectMock).toHaveBeenCalledWith({
        label: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
        value: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
      });
      expect(comboboxButton).toHaveTextContent("https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/");
    });
  });

  describe("Detailed Variant", () => {
    it("should render correctly with detailed items", () => {
      const { getByRole, getByText } = render(<Detailed />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      expect(getByText("Comunidades inativas")).toBeInTheDocument();
      expect(getByText("117 membros")).toBeInTheDocument();
    });

    it("should handle selection and display detailed item correctly in the button", () => {
      const onSelectMock = jest.fn();
      const { getByRole, getByText } = render(<Detailed onSelect={onSelectMock} />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const item = getByText("Comunidades inativas");
      fireEvent.click(item);

      expect(onSelectMock).toHaveBeenCalledWith({
        description: "117 membros",
        label: "Comunidades inativas",
        value: "comunidades inativas",
      });
      expect(comboboxButton).toHaveTextContent("Comunidades inativas");
    });
  });

  describe("IconCompact Variant", () => {
    it("should open dropdown and display icon items correctly", () => {
      const { getByRole, getByText } = render(<IconCompact />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);
      expect(getByText("Enviar a newsletter...")).toBeVisible();
      const icon = getByText("Enviar a newsletter...")?.parentNode?.querySelector("svg");
      expect(icon).toBeVisible();
    });

    it("should handle selection and show selected icon item in the button", () => {
      const onSelectMock = jest.fn();
      const { getByRole, getByText } = render(<IconCompact onSelect={onSelectMock} />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const item = getByText("Enviar a newsletter...");
      fireEvent.click(item);

      expect(comboboxButton).toHaveTextContent("Enviar a newsletter...");
      const iconInButton = comboboxButton.querySelector("svg");
      expect(iconInButton).toBeInTheDocument();
    });
  });

  describe("ImageDetailed Variant", () => {
    it("should render correctly with image and text details", () => {
      const { getByRole, getByText, getByAltText } = render(<ImageDetailed />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      expect(getByText("8 métricas essenciais para acompanhar no seu blog post")).toBeInTheDocument();
      const image = getByAltText("8 métricas essenciais para acompanhar no seu blog post");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", expect.stringContaining("https://source.unsplash.com/100x100/?blog"));
    });

    it("should open dropdown and display image items correctly", () => {
      const { getByRole, getByText, getByAltText } = render(<ImageDetailed />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);
      expect(getByText("8 métricas essenciais para acompanhar no seu blog post")).toBeVisible();
      const image = getByAltText("8 métricas essenciais para acompanhar no seu blog post");
      expect(image).toBeVisible();
    });

    it("should handle selection and show selected image item in the button", () => {
      const onSelectMock = jest.fn();
      const { getByRole, getByText, getByAltText } = render(<ImageDetailed onSelect={onSelectMock} />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const item = getByText("8 métricas essenciais para acompanhar no seu blog post");
      fireEvent.click(item);

      expect(onSelectMock).toHaveBeenCalledWith({
        imageUrl: "https://source.unsplash.com/100x100/?blog",
        label: "8 métricas essenciais para acompanhar no seu blog post",
        value: "8 métricas essenciais para acompanhar no seu blog post",
      });
      expect(comboboxButton).toHaveTextContent("8 métricas essenciais para acompanhar no seu blog post");
      const imageInButton = getByAltText("8 métricas essenciais para acompanhar no seu blog post");
      expect(imageInButton).toBeInTheDocument();
    });
  });

  describe("shouldFilter false property", () => {
    it("should render all items regardless of search input", () => {
      const { getByRole, getByText, getByPlaceholderText } = render(<ShouldFilterFalse />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const searchInput = getByPlaceholderText("Pesquise pelo link...");
      fireEvent.change(searchInput, { target: { value: "nonexistent" } });

      expect(getByText("https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/")).toBeVisible();
      expect(getByText("https://pingback.com/juliano-fabbro")).toBeVisible();
      expect(getByText("https://pingback.com/juliano-fabbro/pods-construcao-civil")).toBeVisible();
      expect(getByText("https://blog.pipelovers.net/")).toBeVisible();
    });

    it("should allow selection from unfiltered results", () => {
      const onSelectMock = jest.fn();
      const { getByRole, getByText } = render(<ShouldFilterFalse onSelect={onSelectMock} />);
      const comboboxButton = getByRole("combobox");
      fireEvent.click(comboboxButton);

      const item = getByText("https://pingback.com/juliano-fabbro");
      fireEvent.click(item);

      expect(onSelectMock).toHaveBeenCalledWith({
        label: "https://pingback.com/juliano-fabbro",
        value: "https://pingback.com/juliano-fabbro",
      });
      expect(comboboxButton).toHaveTextContent("https://pingback.com/juliano-fabbro");
    });
  });
});
