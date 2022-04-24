import React, { useContext } from 'react';
import { TableContext } from '../context/TableProvider';

function Filters() {
  const {
    filterByNumericValues,
    updateOptions,
    handleChangeNumericFilters,
  } = useContext(TableContext);

  const handleClick = (option, index) => {
    updateOptions(option, true);
    handleChangeNumericFilters(null, false, index);
  };

  return (
    <ol>
      {filterByNumericValues.map(({ column, comparison, value }, index) => (
        <li key={ `${index}-${column}` } data-testid="filter">
          <span>{column}</span>
          <span>{comparison}</span>
          <span>{value}</span>
          <button type="button" onClick={ () => handleClick(column, index) }>X</button>
        </li>
      ))}
    </ol>
  );
}

export default Filters;
