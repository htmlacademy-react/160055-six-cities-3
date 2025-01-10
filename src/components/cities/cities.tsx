import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { CITIES_FULL, CityName } from '../../const';

type Props = {
  currentCity: CityName;
};

function CitiesListComp({currentCity}: Props): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {CITIES_FULL.map(({name, slug}) => (
        <li onClick={(evt) => {
          evt.preventDefault();
        }}
        className="locations__item"
        key={name}
        >
          <NavLink className={name === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
            to={`/${slug}`}
          >
            <span>{name}</span>
          </NavLink>
        </li>))}
    </ul>
  );
}

const CitiesList = memo(CitiesListComp);

export default CitiesList;

