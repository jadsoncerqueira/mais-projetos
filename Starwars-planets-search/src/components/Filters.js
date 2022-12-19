// import React, { useContext } from 'react';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';

function Filters() {
  const {
    filterByName,
    setFilterByName,
    setColumnFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    removeFilter,
  } = useContext(Context);

  const [options, removeFilters] = useState({
    population: true,
    orbital_period: true,
    diameter: true,
    rotation_period: true,
    surface_water: true,
  });

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterAvailable, setFilter] = useState(true);

  useEffect(() => {
    removeFilters({
      population: !filterByNumericValues.some((filter) => filter.column === 'population'),
      orbital_period: !filterByNumericValues.some((filter) => filter.column
      === 'orbital_period'),
      diameter: !filterByNumericValues.some((filter) => filter.column === 'diameter'),
      rotation_period: !filterByNumericValues.some(
        (filter) => filter.column === 'rotation_period',
      ),
      surface_water: !filterByNumericValues.some((filter) => filter.column
      === 'surface_water'),
    });
  }, [filterByNumericValues]);

  useEffect(() => {
    const hasFilters = Object.entries(options).some((filter) => filter[1]);

    setFilter(hasFilters);

    if (hasFilters) {
      const firstOption = Object.entries(options).find((filter) => filter[1])[0];
      setColumn(firstOption);
    }
  }, [options]);

  return (
    <div
      data-testid="filters-component"
    >
      <h1>Filters</h1>
      <div>
        <label htmlFor="name-filter">
          <input
            id="name-filter"
            type="text"
            placeholder="planet"
            data-testid="name-filter"
            onChange={ (e) => setFilterByName({
              name: e.target.value,
            }) }
            value={ filterByName.name }
          />
        </label>
        <select
          data-testid="column-filter"
          onChange={ (e) => { setColumn(e.target.value); } }
          value={ column }
        >
          {options.population && <option value="population">population</option>}
          {options.orbital_period
            && <option value="orbital_period">orbital_period</option>}
          {options.diameter && <option value="diameter">diameter</option>}
          {options.rotation_period
        && <option value="rotationperiod">rotation_period</option>}
          {options.surface_water && <option value="surfacewater">surface_water</option>}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => { setComparison(e.target.value); } }
          value={ comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ value }
          data-testid="value-filter"
          onChange={ (e) => { setValue(e.target.value); } }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            if (filterAvailable) {
              setColumnFilter(column, comparison, value);
            }
          } }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setFilterByNumericValues([]) }
        >
          Remover filtros
        </button>
      </div>

      <div>
        {filterByNumericValues.map((filter, index) => (
          <p key={ `${column}${index}` } data-testid="filter">
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
            <button
              type="button"
              onClick={
                () => removeFilter(filter.column)
              }
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Filters;
