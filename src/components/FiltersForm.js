import React, { useContext, useEffect, useState } from 'react';
import { TableContext } from '../context/TableProvider';
import ClearFiltersButton from './ClearFiltersButton';

function FiltersForm() {
  const {
    filterByName,
    handleFilterByName,
    handleChangeNumericFilters,
    filterOptions,
    updateOptions,
  } = useContext(TableContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleSubmit = () => {
    handleChangeNumericFilters({ column, comparison, value }, true);
    updateOptions(column);
  };

  useEffect(() => {
    setColumn(filterOptions[0]);
  }, [filterOptions]);

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterByName.name }
        onChange={ ({ target }) => handleFilterByName(target.value) }
      />
      <form onSubmit={ (e) => e.preventDefault() }>
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {filterOptions.map((currFilter) => (
            <option key={ currFilter } value={ currFilter }>{currFilter}</option>
          ))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmit }
          disabled={ Boolean(!filterOptions.length) }
        >
          Filtrar
        </button>
        <ClearFiltersButton />
      </form>
    </>
  );
}

export default FiltersForm;
