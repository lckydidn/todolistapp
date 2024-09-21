import { useState } from "react";
import { loginUser } from "@/fetching/fetch";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log("Login Response:", response);
      const token = response.token;
      console.log("Token received:", token);
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-6 bg-white shadow-md'
      >
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md '
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
