import React from "react";

function TableRow({
  item,
  index,
  selectedItems,
  handleCheckboxChange,
  handleDelete,
  handleEdit,
  isEditing,
}) {
  return (
    <tr key={item.id}>
      <td>
        <input
          type="checkbox"
          value={item.id}
          onChange={(e) => handleCheckboxChange(e, item.id)}
          checked={selectedItems.includes(item.id)}
          disabled={isEditing}
          className="checkbox-input"
        />
      </td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
        <button disabled={isEditing} onClick={() => handleDelete(item.id)}>
          <i className="fas fa-trash"></i>
        </button>
        <button disabled={isEditing} onClick={() => handleEdit(item, index)}>
          <i className="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
