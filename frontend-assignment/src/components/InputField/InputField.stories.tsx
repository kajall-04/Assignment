import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText="This is a helper text"
      />
    );
  },
};

export const Error: Story = {
  render: () => (
    <InputField
      label="Email"
      placeholder="Enter email"
      invalid
      errorMessage="Invalid email"
    />
  ),
};

export const Password: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <InputField
        label="Password"
        placeholder="Enter password"
        type="password"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const Loading: Story = {
  render: () => <InputField label="Loading" loading placeholder="Loading..." />,
};
