import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (rowIndex) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(-sortDirection);
    } else {
      setSortField(field);
      setSortDirection(1);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortField) {
    filteredData.sort((a, b) => {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) return -sortDirection;
      if (fieldA > fieldB) return sortDirection;
      return 0;
    });
  }

  // Calculate the number of pages
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the starting and ending index for the current page
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Name or Email"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('username')}>Username</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('phone')}>Phone</th>
            <th onClick={() => handleSort('website')}>Website</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr onClick={() => toggleDropdown(index + startIndex)}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
              </tr>
              {selectedRow === index + startIndex && (
                <tr>
                  <td colSpan="6">
                    <div>
                      <strong>ID:</strong> {item.id}<br />
                      <strong>Name:</strong> {item.name}<br />
                      <strong>Username:</strong> {item.username}<br />
                      <strong>Email:</strong> {item.email}<br />
                      <strong>Address:</strong> {item.address.street}, {item.address.suite}, {item.address.city}, {item.address.zipcode}<br />
                      <strong>Phone:</strong> {item.phone}<br />
                      <strong>Website:</strong> {item.website}<br />
                      <strong>Company:</strong> {item.company.name}<br />
                      <strong>Catch Phrase:</strong> {item.company.catchPhrase}<br />
                      <strong>BS:</strong> {item.company.bs}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default DataComponent;
