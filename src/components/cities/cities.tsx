import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useActionCreators } from '../../hooks/store';
import { offersActions, offersSelectors } from '../../store/slices/offers';
type CardsProps = {
  cities: string[];
}

function CitiesListComp(props: CardsProps): JSX.Element {
  const {cities} = props;
  const currentCity = useAppSelector(offersSelectors.city);
  const {setCity} = useActionCreators(offersActions);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li onClick={(evt) => {
          evt.preventDefault();
          setCity(city);
        }}
        className="locations__item"
        key={city}
        >
          <Link className={city === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
            to="#"
          >
            <span>{city}</span>
          </Link>
        </li>))}
    </ul>
  );
}

const CitiesList = memo(CitiesListComp);

export default CitiesList;

