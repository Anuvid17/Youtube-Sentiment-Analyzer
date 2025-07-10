// import { useState } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import logo from '../../assets/logo.png';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [activeButton, setActiveButton] = useState<string | null>(location.pathname);

//   const userEmail = localStorage.getItem('currentUser');
//   const userData = userEmail ? JSON.parse(localStorage.getItem(userEmail) || '{}') : null;

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleNavigation = (path: string) => {
//     setActiveButton(path);
//     if (location.pathname === '/' && path === '/') {
//       scrollToSection('learn-more');
//     } else if (location.pathname !== path) {
//       navigate(path);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     navigate('/');
//     setActiveButton('/login');
//     setShowUserMenu(false);
//   };

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/analyze', label: 'Analyze' },
//   ];

//   const showBackButton = location.pathname !== '/';

//   const handleLoginClick = () => {
//     setActiveButton('/login');
//     navigate('/login');
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white z-50 transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-4">
//             {showBackButton && (
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//             )}
//             <div 
//               className="flex items-center gap-2 cursor-pointer" 
//               onClick={() => handleNavigation('/')}
//             >
//               <img 
//                 src={logo} 
//                 alt="YouTube Sentiment Analyzer Logo" 
//                 className="w-16 h-16"
//               />
//               <span className="text-xl font-bold">Sentiment Analyzer</span>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               {navItems.map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeButton === item.path
//                       ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
//                       : 'text-gray-300 hover:bg-gray-800'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {userData ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
//                 >
//                   {userData.username}
//                 </button>
//                 {showUserMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-800">
//                     <button
//                       onClick={() => {
//                         navigate('/profile');
//                         setShowUserMenu(false);
//                       }}
//                       className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                     >
//                       Profile
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeButton === '/login'
//                     ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
//                     : 'text-gray-300 hover:bg-gray-800'
//                 }`}
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useState, useEffect } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import logo from '../../assets/logo.png';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [activeButton, setActiveButton] = useState<string | null>(location.pathname);
//   const [userData, setUserData] = useState<any>(null); // Store user data from localStorage

//   useEffect(() => {
//     // Load user profile from localStorage on mount
//     const storedUser = localStorage.getItem('userProfile');
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     // Update active button when location changes (handles refresh/navigation)
//     setActiveButton(location.pathname);
//   }, [location.pathname]);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleNavigation = (path: string) => {
//     setActiveButton(path);
//     if (location.pathname === '/' && path === '/') {
//       scrollToSection('learn-more');
//     } else if (location.pathname !== path) {
//       navigate(path);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userProfile');
//     setUserData(null);
//     setShowUserMenu(false);
//     setActiveButton('/login');
//     navigate('/');
//   };

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/analyze', label: 'Analyze' },
//   ];

//   const showBackButton = location.pathname !== '/';

//   const handleLoginClick = () => {
//     setActiveButton('/login');
//     navigate('/login');
//   };

//   const handleProfileClick = () => {
//     setActiveButton('/profile');
//     navigate('/profile');
//     setShowUserMenu(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white z-50 transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-4">
//             {showBackButton && (
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//             )}
//             <div 
//               className="flex items-center gap-2 cursor-pointer" 
//               onClick={() => handleNavigation('/')}
//             >
//               <img 
//                 src={logo} 
//                 alt="YouTube Sentiment Analyzer Logo" 
//                 className="w-16 h-16"
//               />
//               <span className="text-xl font-bold">Sentiment Analyzer</span>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               {navItems.map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeButton === item.path
//                       ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
//                       : 'text-gray-300 hover:bg-gray-800'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {userData ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
//                 >
//                   {userData.username}
//                 </button>
//                 {showUserMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-800">
//                     <button
//                       onClick={handleProfileClick}
//                       className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                     >
//                       Profile
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeButton === '/login'
//                     ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
//                     : 'text-gray-300 hover:bg-gray-800'
//                 }`}
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(location.pathname);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    setActiveButton(path);
    if (location.pathname === '/' && path === '/') {
      const element = document.getElementById('learn-more');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setActiveButton('/login');
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/analyze', label: 'Analyze' },
  ];

  const showBackButton = location.pathname !== '/';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavigation('/')}
            >
              <img src={logo} alt="Logo" className="w-16 h-16" />
              <span className="text-xl font-bold">Sentiment Analyzer</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeButton === item.path
                      ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {user.username}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-800">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveButton('/login');
                  navigate('/login');
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeButton === '/login'
                    ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
