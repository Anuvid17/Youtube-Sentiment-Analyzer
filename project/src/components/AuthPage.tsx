// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, ArrowRight } from 'lucide-react';
// import Footer from './Footer';

// interface FormData {
//   email: string;
//   password: string;
//   username?: string;
// }

// interface UserProfile {
//   email: string;
//   username: string;
// }

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     password: '',
//     username: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors: Partial<FormData> = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!isLogin && !formData.username) {
//       newErrors.username = 'Username is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const showLoginPopup = () => {
//     const popup = document.createElement('div');
//     popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-center transition-opacity duration-300';
//     popup.textContent = isLogin ? 'Successfully logged in!' : 'Account created successfully!';
//     document.body.appendChild(popup);

//     setTimeout(() => {
//       popup.style.opacity = '0';
//       setTimeout(() => document.body.removeChild(popup), 300);
//     }, 3000);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       if (isLogin) {
//         const existingUser = localStorage.getItem(formData.email);
//         if (!existingUser) {
//           setErrors({ email: 'Account not found. Please register first.' });
//           setIsLogin(false);
//           return;
//         }

//         const userData = JSON.parse(existingUser);
//         if (userData.password !== formData.password) {
//           setErrors({ password: 'Incorrect password' });
//           return;
//         }

//         setUserProfile({
//           email: formData.email,
//           username: userData.username
//         });
//         localStorage.setItem('currentUser', formData.email);
//       } else {
//         localStorage.setItem(formData.email, JSON.stringify(formData));
//         localStorage.setItem('currentUser', formData.email);
//         setUserProfile({
//           email: formData.email,
//           username: formData.username || ''
//         });
//       }

//       showLoginPopup();
//       setTimeout(() => {
//         navigate('/analyze');
//       }, 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
//       <div className="container mx-auto px-4 py-16">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
//             <h1 className="text-3xl font-bold mb-6 text-white">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </h1>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {!isLogin && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Username</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       value={formData.username}
//                       onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                       className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Enter your username"
//                     />
//                   </div>
//                   {errors.username && (
//                     <p className="mt-1 text-sm text-red-400">{errors.username}</p>
//                   )}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-400">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-400">{errors.password}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg py-2 px-4 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-colors flex items-center justify-center gap-2"
//               >
//                 {isLogin ? 'Sign In' : 'Create Account'}
//                 <ArrowRight className="w-5 h-5" />
//               </button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AuthPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
// import Footer from './Footer';

// interface FormData {
//   email: string;
//   password: string;
//   username?: string;
// }

// interface UserProfile {
//   email: string;
//   username: string;
// }

// const AuthPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     password: '',
//     username: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors: Partial<FormData> = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!isLogin && !formData.username) {
//       newErrors.username = 'Username is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const showLoginPopup = (message: string) => {
//     const popup = document.createElement('div');
//     popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-center transition-opacity duration-300';
//     popup.textContent = message;
//     document.body.appendChild(popup);

//     setTimeout(() => {
//       popup.style.opacity = '0';
//       setTimeout(() => document.body.removeChild(popup), 300);
//     }, 3000);
//   };

//   const handleSubmit = async () => {
//     if (validateForm()) {
//       // Determine the endpoint based on login or registration
//       const endpoint = isLogin
//         ? `http://localhost:5000/api/auth/login`
//         : `http://localhost:5000/api/auth/register`;
  
//       // Prepare the request body based on the action (login or register)
//       const requestBody = isLogin
//         ? { identifier: formData.email, password: formData.password }
//         : { email: formData.email, password: formData.password, username: formData.username };
  
//       try {
//         // Sending POST request
//         const response = await fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody),
//         });
  
//         // Handle response if not OK
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => {
//             // Fallback if JSON is not returned in error response
//             return { message: 'Something went wrong' };
//           });
//           setErrors({ email: errorData.message || 'Something went wrong' });
//           return;
//         }
  
//         // Parse successful response and retrieve data
//         const data = await response.json();
  
//         // Store token and user profile in localStorage
//         try {
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('userProfile', JSON.stringify(data.user));
        
//           // NEW — ensure the profile page recognizes the logged-in user
//           localStorage.setItem('currentUser', data.user.identifier);
//           localStorage.setItem(data.user.identifier, JSON.stringify(data.user));
//         } catch (e) {
//           console.error('Error saving to localStorage', e);
//           setErrors({ email: 'Error saving user data' });
//           return;
//         }
  
//         // Update user profile in the state
//         setUserProfile(data.user);
  
//         // Show appropriate success message
//         showLoginPopup(isLogin ? 'Successfully logged in!' : 'Account created successfully!');
  
//         // Redirect after a short delay to allow the success message to be visible
//         setTimeout(() => {
//           navigate('/analyze'); // Redirect to the analyze page
//         }, 3000);
  
//       } catch (err) {
//         // Handle error if fetch fails
//         setErrors({ email: 'Error: Could not reach the server' });
//         console.error(err);
//       }
//     }
//   };  

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
//       <div className="container mx-auto px-4 py-16">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
//             <h1 className="text-3xl font-bold mb-6 text-white">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </h1>
            
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//               {!isLogin && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-2">Username</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       value={formData.username}
//                       onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                       className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Enter your username"
//                     />
//                   </div>
//                   {errors.username && (
//                     <p className="mt-1 text-sm text-red-400">{errors.username}</p>
//                   )}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-400">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     className="pl-10 pr-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
//                     tabIndex={-1}
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-400">{errors.password}</p>
//                 )}
//               </div>


//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg py-2 px-4 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-colors flex items-center justify-center gap-2"
//               >
//                 {isLogin ? 'Sign In' : 'Create Account'}
//                 <ArrowRight className="w-5 h-5" />
//               </button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Footer from './Footer';

interface FormData {
  email: string;
  password: string;
  username?: string;
}

interface UserProfile {
  email: string;
  username: string;
  identifier?: string;
}

const AuthPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  // Clear username and username errors immediately when toggling between login/signup
  useEffect(() => {
    setFormData(prev => ({ ...prev, username: '' }));
    setErrors(prev => ({ ...prev, username: undefined }));
  }, [isLogin]);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showLoginPopup = (message: string) => {
    const popup = document.createElement('div');
    popup.className =
      'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 text-center transition-opacity duration-300';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => document.body.removeChild(popup), 300);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const endpoint = isLogin
        ? `http://localhost:5000/api/auth/login`
        : `http://localhost:5000/api/auth/register`;

      const requestBody = isLogin
        ? { identifier: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, username: formData.username };

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Something went wrong' }));
          setErrors({ email: errorData.message || 'Something went wrong' });
          return;
        }

        const data = await response.json();

        if (data && data.user) {
          try {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userProfile', JSON.stringify(data.user));
            localStorage.setItem('currentUser', data.user.identifier || data.user.email);
            localStorage.setItem(data.user.identifier || data.user.email, JSON.stringify(data.user));
          } catch (e) {
            console.error('Error saving to localStorage', e);
            setErrors({ email: 'Error saving user data' });
            return;
          }

          setUserProfile(data.user);
          showLoginPopup(isLogin ? 'Successfully logged in!' : 'Account created successfully!');

          setTimeout(() => {
            navigate('/analyze');
          }, 3000);
        } else {
          setErrors({ email: 'Invalid response from server. Please try again later.' });
          console.error('Invalid response:', data);
        }
      } catch (err) {
        setErrors({ email: 'Error: Could not reach the server' });
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 w-full bg-white/5 border border-gray-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg py-2 px-4 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(prev => !prev)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
