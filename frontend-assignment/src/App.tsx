import { useState } from "react";
import { InputField } from "./components/InputField/InputField";

import { DataTable } from "./components/DataTable/DataTable";
import type { Column } from "./components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
];



const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];


function App() {
  const [val, setVal] = useState("");

  return (
    <div className="p-6 space-y-6">
      <InputField
        label="Username"
        placeholder="Enter username"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText="Helper text example"
        clearable
      />

      <DataTable<User> data={data} columns={columns} selectable />
    </div>
  );
}

export default App;
