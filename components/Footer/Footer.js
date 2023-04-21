import classNames from 'classnames/bind';
import { Container, NavigationMenu } from '../../components';
import styles from './Footer.module.scss';
import Link from 'next/link';

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container>
        <NavigationMenu menuItems={menuItems} />
        <p className={cx('copyright')}>{`Copyright © ${year} ${title}. All rights reserved.`}<br/>Powered by
            <Link href="https://www.bsmg.co"> BSMG Digital</Link>
        </p>
      </Container>
    </footer>
  );
}
