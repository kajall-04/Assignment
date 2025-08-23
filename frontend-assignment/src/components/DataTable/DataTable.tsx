import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const toggleRow = (index: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelectedRows(newSet);
    if (onRowSelect) {
      onRowSelect([...newSet].map((i) => sortedData[i]));
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!data.length) {
    return <div className="p-4 text-center text-gray-500">No data available</div>;
  }

  return (
    <table className="min-w-full border border-gray-300 text-left">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && handleSort(col.dataIndex)}
              className={`p-2 ${col.sortable ? "cursor-pointer" : ""}`}
            >
              {col.title}
              {sortKey === col.dataIndex && (sortOrder === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i} className="border-t">
            {selectable && (
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.has(i)}
                  onChange={() => toggleRow(i)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
