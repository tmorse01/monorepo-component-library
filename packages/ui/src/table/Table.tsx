import React from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

/**
 * Table Component - Heavy/Complex (~50KB with all features)
 *
 * A feature-rich table component with sorting, filtering, pagination.
 * This is intentionally larger to demonstrate tree-shaking effectiveness.
 * When Button is imported alone, this entire component should be excluded.
 */
export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [filterText, setFilterText] = React.useState("");

  // Sorting logic (adds to bundle size)
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === bVal) return 0;
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  // Filtering logic (adds to bundle size)
  const filteredData = React.useMemo(() => {
    if (!filterText) return sortedData;

    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [sortedData, filterText]);

  // Pagination logic (adds to bundle size)
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column.key);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {/* Search/Filter */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "300px",
          }}
        />
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => handleSort(column)}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                  cursor: column.sortable ? "pointer" : "default",
                  width: column.width,
                }}
              >
                {column.header}
                {column.sortable && sortColumn === column.key && (
                  <span style={{ marginLeft: "8px" }}>
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              style={{
                cursor: onRowClick ? "pointer" : "default",
                backgroundColor: rowIndex % 2 === 0 ? "white" : "#f8f9fa",
              }}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ padding: "6px 12px" }}
          >
            Previous
          </button>
          <span style={{ padding: "6px 12px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ padding: "6px 12px" }}
          >
            Next
          </button>
        </div>
      )}

      {/* Stats */}
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#6c757d" }}>
        Showing {paginatedData.length} of {filteredData.length} rows
        {filterText && ` (filtered from ${data.length} total)`}
      </div>
    </div>
  );
}

// Add metadata to make bundle size more measurable
export const TABLE_VERSION = "1.0.0";
export const TABLE_FEATURES = [
  "sorting",
  "filtering",
  "pagination",
  "row-click",
  "custom-renderers",
];
export const TABLE_METADATA = {
  name: "Table",
  size: "heavy",
  category: "data-display",
  estimatedSize: "~50KB",
};
