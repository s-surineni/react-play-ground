import React, { useState, useRef, useEffect } from "react";

const SAMPLE_DATA = [
  { id: 1, name: "Alice Johnson", role: "Engineer", department: "Product" },
  { id: 2, name: "Bob Smith", role: "Designer", department: "Design" },
  { id: 3, name: "Carol Williams", role: "Manager", department: "Operations" },
  { id: 4, name: "David Brown", role: "Engineer", department: "Platform" },
  { id: 5, name: "Eve Davis", role: "Analyst", department: "Data" },
];

const SelectableTable = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [data] = useState(SAMPLE_DATA);

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((row) => row.id)));
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;
  const isSomeSelected = selectedIds.size > 0;
  const headerCheckboxRef = useRef(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSelected && !isAllSelected;
    }
  }, [isSomeSelected, isAllSelected]);

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px", color: "#333" }}>Selectable Table</h1>
      <p style={{ marginBottom: "24px", color: "#666", fontSize: "14px" }}>
        Click rows to select or deselect. Use the header checkbox to select all.
      </p>

      {selectedIds.size > 0 && (
        <p style={{ marginBottom: "16px", fontSize: "14px", color: "#007bff" }}>
          Selected: {selectedIds.size} row{selectedIds.size !== 1 ? "s" : ""}
        </p>
      )}

      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  width: "48px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={isAllSelected}
                    onChange={toggleAll}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                </label>
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Role
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Department
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  style={{
                    backgroundColor: isSelected ? "#e7f3ff" : "white",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "white";
                    }
                  }}
                >
                  <td style={{ padding: "12px 16px", width: "48px" }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "500" }}>
                    {row.name}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#495057" }}>
                    {row.role}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#495057" }}>
                    {row.department}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectableTable;
