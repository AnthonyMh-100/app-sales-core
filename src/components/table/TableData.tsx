import React from "react";

type TableColumn<T> = {
  key: string;
  label?: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

interface TableDataProps<T> {
  data?: T[];
  columns?: TableColumn<T>[];
}
function getCellValue<T>(row: T, col: TableColumn<T>): React.ReactNode {
  if (col.render) return col.render(row);
  if (col.accessor) return row[col.accessor] as React.ReactNode;
  return null;
}

export const TableData = <T extends { id: string }>({
  data = [],
  columns = [],
}: TableDataProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={index < data.length - 1 ? "border-b border-gray-50" : ""}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {getCellValue(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
