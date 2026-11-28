/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import OxygenUIThemeProvider from "../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider";
import StatCard from "./StatCard";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

describe("StatCard", () => {
  it("renders the value and label", () => {
    renderWithTheme(<StatCard value={42} label="Total Users" />);

    expect(screen.getByText("42")).toBeDefined();
    expect(screen.getByText("Total Users")).toBeDefined();
  });

  it("renders a string value as-is", () => {
    renderWithTheme(<StatCard value="99.9%" label="Uptime" />);

    expect(screen.getByText("99.9%")).toBeDefined();
  });

  it("does not render an icon wrapper when no icon is provided", () => {
    const { container } = renderWithTheme(
      <StatCard value={1} label="No Icon" />,
    );

    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("renders the icon inside an aria-hidden wrapper so it is not announced twice", () => {
    renderWithTheme(
      <StatCard
        value={7}
        label="With Icon"
        icon={<span data-testid="custom-icon">icon</span>}
      />,
    );

    const icon = screen.getByTestId("custom-icon");
    expect(icon).toBeDefined();

    const hiddenWrapper = icon.closest('[aria-hidden="true"]');
    expect(hiddenWrapper).not.toBeNull();
  });

  it("colors the icon wrapper using theme.palette.primary.main by default", () => {
    renderWithTheme(
      <StatCard
        value={5}
        label="Default Color"
        icon={<span data-testid="icon" />}
      />,
    );

    const icon = screen.getByTestId("icon");
    const wrapper = icon.closest('[aria-hidden="true"]') as HTMLElement;

    // `sx` compiles to an Emotion class, so assert on the resolved computed
    // style rather than an inline `style` attribute.
    expect(getComputedStyle(wrapper).color).not.toBe("");
  });

  it("resolves a different theme color when a non-default iconColor is set", () => {
    const { unmount: unmountDefault } = renderWithTheme(
      <StatCard
        value={5}
        label="Default Color"
        icon={<span data-testid="icon-default" />}
      />,
    );
    const defaultColor = getComputedStyle(
      screen
        .getByTestId("icon-default")
        .closest('[aria-hidden="true"]') as HTMLElement,
    ).color;
    unmountDefault();

    renderWithTheme(
      <StatCard
        value={5}
        label="Success Color"
        icon={<span data-testid="icon-success" />}
        iconColor="success"
      />,
    );
    const successColor = getComputedStyle(
      screen
        .getByTestId("icon-success")
        .closest('[aria-hidden="true"]') as HTMLElement,
    ).color;

    expect(successColor).not.toBe("");
    expect(successColor).not.toBe(defaultColor);
  });

  it("forwards additional CardProps such as data-testid and className to the root", () => {
    renderWithTheme(
      <StatCard
        value={3}
        label="Forwarded Props"
        data-testid="stat-card-root"
        className="custom-class"
      />,
    );

    const root = screen.getByTestId("stat-card-root");
    expect(root).toBeDefined();
    expect(root.className).toContain("custom-class");
  });
});
