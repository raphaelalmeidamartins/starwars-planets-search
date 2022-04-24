import React, { useContext } from 'react';
import { TableContext } from '../context/TableProvider';

function Table() {
  const { data } = useContext(TableContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {Boolean(data.length) && data.map((currPlanet) => (
          <tr key={ currPlanet.name }>
            <td data-testid="planet-name">{currPlanet.name}</td>
            <td>{currPlanet.rotation_period}</td>
            <td>{currPlanet.orbital_period}</td>
            <td>{currPlanet.diameter}</td>
            <td>{currPlanet.climate}</td>
            <td>{currPlanet.gravity}</td>
            <td>{currPlanet.terrain}</td>
            <td>{currPlanet.surface_water}</td>
            <td>{currPlanet.population}</td>
            <td>{currPlanet.films}</td>
            <td>{currPlanet.created}</td>
            <td>{currPlanet.edited}</td>
            <td>{currPlanet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
