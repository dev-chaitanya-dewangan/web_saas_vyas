import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded mt-4"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;