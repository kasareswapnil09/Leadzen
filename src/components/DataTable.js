// src/components/DataTable.js
import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleRow = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <tr onClick={() => toggleRow(index)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
            {selectedRow === index && (
              <tr>
                <td colSpan="3">
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
