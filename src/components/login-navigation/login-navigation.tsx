import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';
import { userActions, userSelectors } from '../../store/slices/user';

function LoginNavigation(): JSX.Element {
  const user = useAppSelector(userSelectors.user);
  const {logout} = useActionCreators(userActions);

  const offers = useAppSelector(offersSelectors.offers);
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img src={user?.avatarUrl} alt="avatar" width={20} height={20} style={{borderRadius: '50%'}} />
          </div>
          <span className="header__user-name user__name">
            {user?.email}
          </span>
          <span className="header__favorite-count">{favoritesOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          onClick={() => {
            logout();
          }}
          to='#'
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default LoginNavigation;
