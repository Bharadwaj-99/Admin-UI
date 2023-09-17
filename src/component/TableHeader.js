import React from 'react';

function TableHeader({ selectedItems, toggleAll, isEditing,data }) {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={selectedItems.length === data.length}
            onChange={() => toggleAll()}
            disabled={isEditing}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
