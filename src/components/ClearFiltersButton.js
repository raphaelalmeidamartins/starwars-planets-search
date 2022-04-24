import React, { useContext } from 'react';
import { TableContext } from '../context/TableProvider';

function ClearFiltersButton() {
  const {
    setFilterByNumericValues,
    initialOptions,
    setFilterOptions,
  } = useContext(TableContext);

  return (
    <button
      type="button"
      data-testid="button-remove-filters"
      onClick={ () => {
        setFilterByNumericValues([]);
        setFilterOptions(initialOptions);
      } }
    >
      Limpar filtros
    </button>
  );
}

export default ClearFiltersButton;
