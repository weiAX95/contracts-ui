import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              首页
            </Link>
          </li>
          <li>
            <Link to="/test/data" className="text-gray-700 hover:text-blue-600 font-medium">
              测试页面
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
