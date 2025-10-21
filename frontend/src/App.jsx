import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/chat" /> : <SignUp />}
        />
        <Route
          path="/chat"
          element={user ? <Chat user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/chat" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
