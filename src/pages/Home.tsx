import WalletConnect from '@/components/WalletConnect';
import { Helmet } from 'react-helmet-async';
// import daoABI from '../abi/types/DAOContract';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>🐻🐻🐻一灯SPA架构</title>
      </Helmet>
      <WalletConnect />
    </>
  );
};
export default HomePage;
