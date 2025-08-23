import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
  { id: 3, name: "Charlie", email: "charlie@test.com" },
];

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: () => <DataTable<User> data={data} columns={columns} />,
};

export const Loading: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} />,
};

export const Selectable: Story = {
  render: () => (
    <DataTable<User>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log("Selected", rows)}
    />
  ),
};
