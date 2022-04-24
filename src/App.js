import React from 'react';
import './App.css';
import { TableProvider } from './context/TableProvider';
import Table from './components/Table';
import FiltersForm from './components/FiltersForm';
import Filters from './components/Filters';
import SortPlanets from './components/SortPlanets';

function App() {
  return (
    <TableProvider>
      <div>
        <FiltersForm />
        <Filters />
        <SortPlanets />
      </div>
      <Table />
    </TableProvider>
  );
}

export default App;
