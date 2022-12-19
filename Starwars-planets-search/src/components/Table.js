// import React, { useContext } from 'react';
import React, { useContext } from 'react';
import { Context } from '../context/Context';

function Table() {
  const {
    planets,
    filterByName,
    filterByNumericValues,
  } = useContext(Context);

  const planetsToRenderFiltered = (planetsToFilter) => {
    if (planetsToFilter.length < 1) {
      return [];
    }
    return planetsToFilter.filter((planet) => planet.name.includes(filterByName.name));
  };

  const filterPlanetsByColumn = (planetsToFilter, filter) => {
    if (filter.length < 1) {
      return planetsToFilter;
    }

    const lastPosition = -1;

    const { column, comparison, value } = filter.at(lastPosition);

    const filteredValues = planetsToFilter.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });

    if (filter.length > 1) {
      return filterPlanetsByColumn(filteredValues, filter.slice(0, lastPosition));
    }

    return filteredValues;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Terrain</th>
          <th>Gravity</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Surface Water</th>
          <th>Diameter</th>
          <th>Created</th>
          <th>Films</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {planetsToRenderFiltered(filterPlanetsByColumn(planets, filterByNumericValues))
          .map((planet) => (
            <tr
              key={ planet.name }
            >
              <th>{ planet.name }</th>
              <th>{ planet.climate }</th>
              <th>{ planet.terrain }</th>
              <th>{ planet.gravity }</th>
              <th>{ planet.population }</th>
              <th>{ planet.rotationperiod }</th>
              <th>{ planet.orbitalperiod }</th>
              <th>{ planet.surfacewater }</th>
              <th>{ planet.diameter }</th>
              <th>{ planet.created }</th>
              <th>{ planet.films }</th>
              <th>{ planet.edited }</th>
              <th>{ planet.url }</th>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
