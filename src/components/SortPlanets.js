import React, { useContext, useState } from 'react';
import { TableContext } from '../context/TableProvider';

function SortPlanets() {
  const { initialOptions, setOrder } = useContext(TableContext);

  const [column, setColumn] = useState(initialOptions[0]);
  const [sort, setSort] = useState('ASC');

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <select
        data-testid="column-sort"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {initialOptions.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <fieldset>
        <label htmlFor="sort-asc">
          <input
            id="sort-asc"
            name="sort"
            type="radio"
            data-testid="column-sort-input-asc"
            onChange={ () => setSort('ASC') }
          />
          Ascendent
        </label>
        <label htmlFor="sort-desc">
          <input
            id="sort-desc"
            name="sort"
            type="radio"
            data-testid="column-sort-input-desc"
            onChange={ () => setSort('DESC') }
          />
          Descendent
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setOrder({ column, sort }) }
        >
          Ordenar
        </button>
      </fieldset>
    </form>
  );
}

export default SortPlanets;
