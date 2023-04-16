import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import styles from './Header.module.scss';
import Image from "next/image";

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx('component')}>
      <SkipNavigationLink />
        {/*<Container>*/}
      <div className="container mx-auto px-8 max-w-[1200px] w-full example-two-header grid grid-cols-12 py-3">
          <div className="logo col-span-3 md:col-span-2">
              <Link className="max-w-[200px]" href="/">
                  <Image alt={title} layout="fixed" height="51px" width="50px" src="https://cms.goallineextended.com/wp-content/uploads/2023/04/gle-whiteicon.png" />
              </Link>
          </div>
          <nav className=' thisclass flex flex-row vertical-align-middle overflow-x-auto whitespace-nowrap col-span-9 md:col-span-10 items-center text-white gap-6  md:gap-8 uppercase font-bold'>
              <Link href="/" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold hover:text-[#03146e]'>Home</Link>
              <Link href="category/headlines" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold hover:text-[#03146e]'>Headlines</Link>
                  <Link href="category/scores" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold hover:text-[#03146e]'>Scores</Link>
                  <Link href="category/sports" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold'>Sports</Link>
                  <Link href="category/front-office" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold'>Front Office</Link>
                  <Link href="category/community-rec" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold'>Community & Rec</Link>
                  <Link href="category/tx-black-hof" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold'>TX Black HOF</Link>
                  <Link href="category/media-gallery" className='nav-item no-underline px-3 text-gray-100 text-xl uppercase font-bold'>Media Gallery</Link>
          </nav>
            {/*<button*/}
            {/*  type="button"*/}
            {/*  className={cx('nav-toggle')}*/}
            {/*  onClick={() => setIsNavShown(!isNavShown)}*/}
            {/*  aria-label="Toggle navigation"*/}
            {/*  aria-controls={cx('primary-navigation')}*/}
            {/*  aria-expanded={isNavShown}*/}
            {/*>*/}
            {/*  ☰*/}
            {/*</button>*/}
            {/*<NavigationMenu*/}
            {/*  className={cx(['primary-navigation', isNavShown ? 'show' : undefined])}*/}
            {/*  menuItems={menuItems}*/}
            {/*/>*/}
      </div>
      {/*</Container>*/}
    </header>
  );
}
