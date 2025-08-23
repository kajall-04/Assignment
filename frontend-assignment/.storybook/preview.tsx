import React from "react";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    themes: {
      default: "light",
      list: [
        { name: "light", class: "light", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#000000" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context as any).globals.theme || "light";
      return (
        <div className={theme}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
