import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCity } from '../../store/action';
type CardsProps = {
  cities: string[];
}

function CitiesList(props: CardsProps): JSX.Element {
  const {cities} = props;
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);


  const handleCitySet = (event: MouseEvent<HTMLLIElement>)=>{
    const value = event.currentTarget.innerText;
    dispatch(setCity(value));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li onClick={handleCitySet} className="locations__item" key={city}>
          <a className={city === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#">
            <span>{city}</span>
          </a>
        </li>))}
    </ul>
  );
}
export default CitiesList;

