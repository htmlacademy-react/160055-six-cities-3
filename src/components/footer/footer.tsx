import { memo } from 'react';

function FooterComp(): JSX.Element {
  return (
    <footer className="footer">
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
      </a>
    </footer>
  );
}

const Footer = memo(FooterComp);

export default Footer;
