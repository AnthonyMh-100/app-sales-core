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
        <thead className="bg-[var(--surface-hover)]">
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="border-b border-[var(--border)] px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]"
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
              className={`transition-colors hover:bg-[var(--surface-hover)] ${
                index < data.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 text-[var(--foreground-secondary)]">
                  {getCellValue(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1 px-4 py-14 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">Sin registros</p>
          <p className="text-xs text-[var(--foreground-muted)]">
            Aún no hay datos para mostrar en esta tabla.
          </p>
        </div>
      )}
    </div>
  );
};
