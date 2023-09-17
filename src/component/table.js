import React, { useEffect, useState } from "react";
import Modal from "./modal-form";
import SearchInput from "./SearchInput";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

function Table() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfElement = 10;
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [valueToPass, setValueToPass] = useState({});

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setOriginalData(data);
      })
      .catch((error) => {
      
      });
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setNumberOfPages(Math.ceil(originalData.length / numberOfElement));
    const paginatedData = [...originalData].slice(
      0,
      Math.min(numberOfElement, originalData.length)
    );
    setData(paginatedData);
  }, [originalData]);

  useEffect(() => {
    setCurrentPage(0);
    setNumberOfPages(Math.ceil(searchResult.length / numberOfElement));
    const paginatedData = [...searchResult].slice(
      0,
      Math.min(numberOfElement, searchResult.length)
    );
    setData(paginatedData);
  }, [searchResult]);

  const handleDelete = (id) => {
    const updatedData = [...originalData].filter((item) => item.id !== id);
    setOriginalData(updatedData);
    setSearchValue("");
  };

  const handleEdit = (item, index) => {
   
    setValueToPass(item);
    setEditing(true);
  };

  const saveUserData = (item) => {

    const updatedData = [...originalData];
    
    updatedData.forEach((ele) => {
      if (ele.id === item.id) {
        ele.name = item.name;
        ele.role = item.role;
        ele.email = item.email;
        return;
      }
    });
    
    setOriginalData(updatedData);
    setSearchValue("");
    setEditing(false);
  };

  const moveToPage = (index) => {
    
    const paginatedData = [...originalData].slice(
      numberOfElement * index,
      Math.min(numberOfElement * (index + 1), originalData.length)
    );
    setData(paginatedData);
    setCurrentPage(index);
  };

  const goToNextPage = () => {
    const index = currentPage + 1;
    
    const paginatedData = [...originalData].slice(
      numberOfElement * index,
      Math.min(numberOfElement * (index + 1), originalData.length)
    );
    setData(paginatedData);
    setCurrentPage(index);
  };

  const goToPrevPage = () => {
    const index = currentPage - 1;
    
    const paginatedData = [...originalData].slice(
      numberOfElement * index,
      Math.min(numberOfElement * (index + 1), originalData.length)
    );
    setData(paginatedData);
    setCurrentPage(index);
  };

  const goToFirstPage = () => {
    const index = 0;
    
    const paginatedData = [...originalData].slice(
      numberOfElement * index,
      Math.min(numberOfElement * (index + 1), originalData.length)
    );
    setData(paginatedData);
    setCurrentPage(index);
  };
  const goToLastPage = () => {
    const index = numberOfPages - 1;
    
    const paginatedData = [...originalData].slice(
      numberOfElement * index,
      Math.min(numberOfElement * (index + 1), originalData.length)
    );
    setData(paginatedData);
    setCurrentPage(index);
  };

  const toggleAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
      return;
    }
    const items = data.map((ele) => ele.id);
  
    setSelectedItems(items);
    
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
     
      setSelectedItems([...selectedItems, id]);
    } else {
      
      setSelectedItems(selectedItems.filter((item) => item !== id));
      
    }
  };

  const deleteSelectedItems = () => {
  
    const updatedData = [...originalData].filter(
      (ele) => !selectedItems.includes(ele.id)
    );
   
    setSelectedItems([]);
    setOriginalData(updatedData);
    setSearchValue("");
  };
  const filterData = (e) => {
    if (originalData.length === 0) return;
    setSearchValue(e.target.value);
    const updatedData = [...originalData].filter(
      (ele) =>
        ele.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ele.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ele.role.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult(updatedData)
  };
  return (
    <div>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filterData={filterData}
        isEditing={isEditing}
      />
      <table className="table">
        <TableHeader
          selectedItems={selectedItems}
          toggleAll={toggleAll}
          isEditing={isEditing}
          data={data}
        />
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              item={item}
              index={index}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isEditing={isEditing}
            />
          ))}
        </tbody>
      </table>
      <div className="table-footer">
      <button
        disabled={selectedItems.length === 0 || isEditing}
        onClick={() => deleteSelectedItems()}
        className="delete-selected-button"
      >
        Delete users
      </button>
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        goToFirstPage={goToFirstPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage}
        isEditing={isEditing}
        moveToPage={moveToPage}
      />
      </div>
      {isEditing ? (
        <Modal props={valueToPass} onSubmit={saveUserData} />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Table;
