import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/use-auth';
import LoginNavigation from '../login-navigation/login-navigation';

type NavigationProps = {
  pathname: string;
};

function Navigation({ pathname }: NavigationProps): JSX.Element {
  const location = pathname;
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location;
  const isAuthorized = useAuth();

  if (isLoginPage) {
    return <nav className="header__nav"></nav>;
  }

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

export default Navigation;
