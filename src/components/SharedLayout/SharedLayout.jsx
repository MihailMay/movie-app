import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;