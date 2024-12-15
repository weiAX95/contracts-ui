import Header from '@/components/common/Heaer';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
// MainLayout.whyDidYouRender = true;
export default memo(MainLayout);
