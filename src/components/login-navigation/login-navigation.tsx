import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, RequestStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { userActions, userSelectors } from '../../store/slices/user';
import { favoritesActions, favoritesSelector } from '../../store/slices/favorites';

function LoginNavigation(): JSX.Element {
  const user = useAppSelector(userSelectors.user);
  const {logout} = useActionCreators(userActions);

  const favoritesStatus = useAppSelector(favoritesSelector.status);
  const favoritesLength = useAppSelector(favoritesSelector.favoritesLength);
  const {fetchFavorites} = useActionCreators(favoritesActions);

  useEffect(() => {
    if (favoritesStatus === RequestStatus.Idle) {
      fetchFavorites();
    }
  }, [favoritesStatus, fetchFavorites]);

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
          <span className="header__favorite-count">{favoritesLength}</span>
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
