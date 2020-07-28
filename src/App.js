
import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './products.json';
import Header from "./Header.js"
import "./App.css"
 class App extends Component {
  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: data.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5  // which size per page you want to locate as default
    
    };
    return (
      <div>
        <Header />
        <h4 className="bmw">BMW Tabular Dashboard</h4>
      <BootstrapTable data={data} striped hover pagination={ true } options={ options }>
      <TableHeaderColumn isKey={ true } dataField='id' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 }}>Sl No</TableHeaderColumn>
      <TableHeaderColumn dataField='purhcasedate' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }>Purchased Date</TableHeaderColumn>
      <TableHeaderColumn dataField='price' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }>Price-Rs</TableHeaderColumn>
      <TableHeaderColumn dataField='quantity' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }> Quantity</TableHeaderColumn>
      <TableHeaderColumn dataField='name' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }>Emp Name</TableHeaderColumn>
      <TableHeaderColumn dataField='requestDate' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }>  Requested date</TableHeaderColumn>
      </BootstrapTable>
      </div>
    )
  }
}

export default App


