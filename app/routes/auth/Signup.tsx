import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signup } from "~/redux/auth/authActions";
import { type AppDispatch, type RootState } from "~/redux/store";

interface signupType {
    photo: File | null;
    dateOfBirth: string;
    gender: string
    username: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, token, error } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState<signupType>({
        photo: null,
        dateOfBirth: "",
        gender: "",
        username: "",
        email: "",
        password: "",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSignupData({ ...signupData, photo: file });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(signupData);

        const { email, username, password, dateOfBirth, gender, photo } = signupData

        // if (!photo) {
        //     alert('Please select a profile picture');
        //     return;
        // }

        // const formData = new FormData();
        // formData.append('email', email);
        // formData.append('username', username);
        // formData.append('password', password);
        // formData.append('dateOfBirth', dateOfBirth);
        // formData.append('gender', gender);

        const payload = {
            email, username, password, dateOfBirth, gender
        }
        // formData.append('profilePicture', photo);

        dispatch(signup(payload));
    };


    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    return (
        <div className="flex justify-center p-6 md:p-10 lg:p-16">
            <div className={`w-full max-w-3xl bg-white p-3 sm:p-8 rounded-lg shadow-lg ${loading ? "pointer-events-none opacity-50" : ""}`}>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Let’s set up your profile
                    </h1>
                    <p className="text-gray-600">
                        Provide your details so we can create your account and personalize
                        your experience.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Upload */}
                    {/* <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            {signupData.photo ? (
                                <img
                                    src={URL.createObjectURL(signupData.photo)}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200">
                                    <span className="text-gray-400 text-sm">No Image</span>
                                </div>
                            )}
                            <label
                                htmlFor="photo"
                                className="mt-4 inline-block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-50"
                            >
                                Upload Image
                            </label>
                        </div>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            .png, .jpeg, or .gif files up to 5MB. Recommended size: 256x256px.
                        </p>
                    </div> */}

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signupData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="dateOfBirth"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={signupData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <select
                        value={signupData.gender}
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        {/* <option value="other">Other</option> */}
                    </select>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-800 font-sans">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:ring focus:ring-blue-200"
                    >
                        {loading ? "Creating..." : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
