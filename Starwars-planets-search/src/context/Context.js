import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const INITIAL_STATE = {
  planet_filter: 'population',
  comparation_filter: 'maior que',
  value_filter: '0',
};

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterNumericValues, setNumericFilters] = useState(INITIAL_STATE);
  const [filterEnabled, setFilter] = useState(false);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const fetchPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await response.json();

    setPlanets(json.results.map(({
      name,
      rotation_period: rotationperiod,
      orbital_period: orbitalperiod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfacewater,
      population,
      films,
      created,
      edited,
      url,

    }) => ({
      name,
      rotationperiod,
      orbitalperiod,
      diameter,
      climate,
      gravity,
      terrain,
      surfacewater,
      population,
      films,
      created,
      edited,
      url,
    })));
  };

  function setColumnFilter(column, comparison, value) {
    setFilterByNumericValues((prevState) => ([
      ...prevState,
      { column,
        comparison,
        value,
      }]));
  }

  function removeFilter(column) {
    setFilterByNumericValues((prevState) => ([
      ...prevState.filter((el) => el.column !== column),
    ]));
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const context = { planets,
    filterByName,
    setFilterByName,
    filterNumericValues,
    setNumericFilters,
    filterEnabled,
    setFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    setColumnFilter,
    removeFilter,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export { Context, PlanetsProvider as Provider };
