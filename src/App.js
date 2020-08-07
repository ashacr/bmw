import React,{useState,useMemo,useEffect} from 'react';
import Header from "./Header.js"
import Pagination from 'react-paginate';
import usePagination from './Pagination';
import data from './products.json';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const handleFilterChange = e => {
  setSearchTerm(e.target.value);
  
};
const [errMsg, setErrMsg] = useState(true);
useEffect(() => {  
  let results =data.filter((item) =>  
     item.id.toString().toLowerCase().includes(searchTerm) + 
     item.name.toLowerCase().includes(searchTerm) +
     item.purhcasedate.toLowerCase().includes(searchTerm) +
     item.requestdate.toLowerCase().includes(searchTerm) +
     item.price.toString().toLowerCase().includes(searchTerm)  +
     item.quantity.toString().toLowerCase().includes(searchTerm)      
  ); 
  if(results == ''){  
    setErrMsg(currenterrMsg => !currenterrMsg) 
      
  }else{
    setErrMsg(currenterrMsg => true) 
  }
  setSearchResults(results);
 
}, [searchTerm]);

let [page, setPage] = useState(1);
const PER_PAGE = 6;
const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(searchResults, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    if(e.selected){    
      _DATA.next(p); 
    }else{
      _DATA.prev(p); 
    }
   
  };
  
  const { items, requestSort, sortConfig } = useSortableData(_DATA.currentData());
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const tableHeader =
   [
    "Id",
    "Purhcase Date",
    "Price",
    "Quantity",
    "Name",
    "Request Date"
  ]

  return (
    <div>      
    <Header />
    <h4 className="bmw">BMW Tabular Dashboard</h4>
    <div className="table-container">
        <input
            type="text"
            placeholder="Search the fileds here"
            value={searchTerm}
            onChange={handleFilterChange}
            className="filterinput"
          />   
    <table>  
    <thead>
      <tr>           
        {   
        tableHeader.map((item, i) =>          
          <th key={item + i}>     
            <button  key={item}
            type="button"
            onClick={() => requestSort(item.replace(/\s+/g, '').toLowerCase())}
            className={getClassNamesFor(item.replace(/\s+/g, '').toLowerCase())}
            > {item}</button> 
          </th>
          )
        } 
      </tr>
      </thead> 
      <tbody>
        { 
         (errMsg) ? 
       items.map((item) => (              
          <tr  key={item.id} >
            <td>{item.id}</td>
              <td>{item.purhcasedate}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.name}</td>
            <td>{item.requestdate}</td>
          </tr>
          ))
          :
       <tr className="errMsg" ><td colSpan="6">NO RESULTS FOUND</td></tr>
      }
     
      </tbody>
    </table>
   { (errMsg) ? 
    <Pagination
          pageCount={count}
          marginPagesDisplayed={page}
          pageRangeDisplayed={page}
          onPageChange={handleChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
        :
        ""
   }
    </div>    
    </div>
  );
};

export default function App() {  
  return (
    <div className="App">
      <ProductTable
        products={data.row}
      />
    </div>
  );
}
