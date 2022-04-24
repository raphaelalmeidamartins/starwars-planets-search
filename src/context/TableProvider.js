import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const TableContext = createContext({});

function TableProvider({ children }) {
  const initialOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filterOptions, setFilterOptions] = useState(initialOptions);
  const [order, setOrder] = useState({
    column: '',
    sort: '',
  });

  const updateOptions = (selectedOption, add) => {
    let updatedOptions;
    if (add) {
      updatedOptions = [...filterOptions, selectedOption];
    } else {
      updatedOptions = filterOptions.filter(
        (option) => option !== selectedOption,
      );
    }
    setFilterOptions(updatedOptions);
  };

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((planets) => planets.json())
      .then(({ results }) => {
        setData([...results]);
        setFilteredPlanets([...results]);
      })
      .catch((error) => console.error(`Something went wrong: ${error.message}`));
  }, []);

  useEffect(() => {
    let updatedPlanets = [...data];

    filterByNumericValues.forEach(({ column, comparison, value }) => {
      const filterValues = (planetValue, filterValue) => {
        if (comparison === 'maior que') return +planetValue > +filterValue;
        if (comparison === 'menor que') return +planetValue < +filterValue;
        if (comparison === 'igual a') return +planetValue === +filterValue;
        return true;
      };

      updatedPlanets = updatedPlanets
        .filter((planet) => filterValues(planet[column], value));
    });

    setFilteredPlanets(updatedPlanets);
  }, [filterByNumericValues, data]);

  const handleFilterByName = (name) => {
    setFilterByName({ name });
  };

  const handleChangeNumericFilters = (filters, add, index) => {
    if (add) {
      setFilterByNumericValues([...filterByNumericValues, filters]);
    } else {
      const updatedFilters = [...filterByNumericValues];
      updatedFilters.splice(index, 1);
      setFilterByNumericValues(updatedFilters);
    }
  };

  const sortPlanets = () => {
    const sortedPlanets = [...filteredPlanets];
    if (order.sort === 'ASC') {
      sortedPlanets.sort((prev, curr) => {
        const prevValue = prev[order.column] === 'unknown'
          ? Number.POSITIVE_INFINITY : prev[order.column];
        const currValue = curr[order.column] === 'unknown'
          ? Number.POSITIVE_INFINITY : curr[order.column];
        return prevValue - currValue;
      });
    }
    if (order.sort === 'DESC') {
      sortedPlanets.sort((prev, curr) => {
        const prevValue = prev[order.column] === 'unknown'
          ? Number.NEGATIVE_INFINITY : prev[order.column];
        const currValue = curr[order.column] === 'unknown'
          ? Number.NEGATIVE_INFINITY : curr[order.column];
        return currValue - prevValue;
      });
    }
    if (order.sort === '') {
      sortedPlanets.sort((prev, curr) => prev.name.localeCompare(curr.name));
    }
    return sortedPlanets;
  };

  const contextValue = {
    data: sortPlanets().filter((planet) => planet.name.match(filterByName.name)),
    filterByName,
    handleFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    handleChangeNumericFilters,
    initialOptions,
    filterOptions,
    setFilterOptions,
    updateOptions,
    order,
    setOrder,
  };

  return (
    <TableContext.Provider value={ contextValue }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { TableProvider, TableContext };
