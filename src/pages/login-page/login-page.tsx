import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FormEvent, useRef} from 'react';
import { AppRoute } from '../../const';
import { userActions } from '../../store/slices/user';
import { useActionCreators } from '../../hooks/store';

type HTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

// type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function LoginPage(): JSX.Element {
  const {login} = useActionCreators(userActions);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: FormEvent<HTMLLoginForm>) {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      login({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  }
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  // const handleChange: ChangeHandler = (evt) => {
  //   const {name, value} = evt.currentTarget;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  // function handleSubmit(evt: FormEvent<HTMLLoginForm>) {
  //   evt.preventDefault();
  //   login(formData);
  // }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} pattern="/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
