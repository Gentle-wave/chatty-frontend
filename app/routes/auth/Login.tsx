import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '~/redux/auth/authActions';
import type { AppDispatch, RootState } from '~/redux/store';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { loading, token, error } = useSelector((state: RootState) => state.auth)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(credentials);


        dispatch(login(credentials));
    };

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    return (
        <div className="flex items-center justify-center p-6 md:p-10 lg:p-16">
            <div className={`w-full max-w-md p-3 sm:p-8 bg-white rounded-lg shadow-md ${loading ? "pointer-events-none opacity-60" : ""}`}>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    {error && <p className="text-red-800 font-sans">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
                    >
                        {loading ? "Loading..." : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
