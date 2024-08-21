import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import image from "../images/5a353d1cc50827.4970413315134384928071.png";
import {login }from "../state/actions/LoginActions";


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });




  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error: loginError } = useSelector((state) => state.login);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData?.email === '' || formData?.password === ''){
      alert('Please fill all the fields');
      return;
    }
    dispatch(login( {formData }));


    // try {
    //   // Replace formData with your state or form values
    //   const { data, status } = await axios.post(
    //     "http://localhost:5000/signin",
    //     formData
    //   );

    //   if (status === 200) {
    //     // Check if the request was successful
    //     console.log("Login successful:", data);

    //     // Save the token in localStorage or sessionStorage
    //     localStorage.setItem("token", data.token);

    //     // Redirect the user to the dashboard or another protected route
    //     navigate("/"); // Assuming you have a dashboard route set up
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error.response?.data || error.message);
    //   // Handle the error (e.g., display a message to the user)
    // }
  };

  useEffect(() => {
    if (user?.id) {
      navigate('/'); // Redirect to home page if user is logged in
    }
    if (loginError) {
      alert(loginError); // Show error if login fails
    }
  }, [user, loginError, navigate]);


  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row p-10 m-3"
        >
          <div>
            <h1 className="w-full text-2xl font-bold">Sign In</h1>
            <div className="border-b border-gray-900/10 mt-5">
              <div className="mt-10 grid gap-y-5">
                <div className="sm:col-span-7">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:ml-5">
            <img src={image} alt="img" className="w-60 h-60 object-cover" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
