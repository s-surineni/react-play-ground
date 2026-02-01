import React, { useState, useRef, useEffect } from "react";
import "./SelectableTable.css";

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
    <div className="selectable-table">
      <h1 className="selectable-table__title">Selectable Table</h1>
      <p className="selectable-table__intro">
        Click rows to select or deselect. Use the header checkbox to select all.
      </p>

      {selectedIds.size > 0 && (
        <p className="selectable-table__selected-count">
          Selected: {selectedIds.size} row{selectedIds.size !== 1 ? "s" : ""}
        </p>
      )}


      <div className="selectable-table__wrapper">
        <table className="selectable-table__table">
          <thead>
            <tr className="selectable-table__thead-row">
              <th className="selectable-table__th selectable-table__th--checkbox">
                <label className="selectable-table__th-label">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={isAllSelected}
                    onChange={toggleAll}
                    className="selectable-table__checkbox"
                  />
                </label>
              </th>
              <th className="selectable-table__th">Name</th>
              <th className="selectable-table__th">Role</th>
              <th className="selectable-table__th">Department</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={`selectable-table__row ${isSelected ? "selectable-table__row--selected" : ""}`}
                >
                  <td className="selectable-table__td selectable-table__td--checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="selectable-table__checkbox"
                    />
                  </td>
                  <td className="selectable-table__td selectable-table__td--name">
                    {row.name}
                  </td>
                  <td className="selectable-table__td">{row.role}</td>
                  <td className="selectable-table__td">{row.department}</td>
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
