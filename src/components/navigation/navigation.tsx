import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/use-auth';
import LoginNavigation from '../login-navigation/login-navigation';

function NavigationComp(): JSX.Element {
  const isAuthorized = useAuth();

  return (
    <nav className="header__nav">
      {isAuthorized ? (
        <LoginNavigation />
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

const Navigation = memo(NavigationComp);

export default Navigation;
