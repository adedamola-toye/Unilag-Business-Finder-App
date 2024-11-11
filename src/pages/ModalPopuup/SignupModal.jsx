

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "../../redux/features/auth/authService";
import { setUserType, setLoading, setError, setUser } from "../../redux/features/auth/authSlice";
import { closeModal } from "../../redux/features/modal/modalSlice";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { signUp } from "../../redux/features/auth/authService";

function SignupModal() {
  const dispatch = useDispatch();
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    businessName:"",
    businessEmail: " ",
    businessType:""
  });
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    dispatch(setUserType(userType));
    setSelectedForm(userType); // Update state to open specific form modal
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setSelectedForm(null); // Reset form selection on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; //extract name and value of input field.
    setFormData((prevData) =>{
     const updatedData = {...prevData, [name]: value};
     console.log(updatedData)
     return updatedData;
    })
  };

  const handleTalentSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    if(password.length < 6){
      dispatch(setError("Password must be at least 6 characters"));
      return;
    }
    dispatch(setLoading(true));
    try {
      const user = await signUp(name, email, password);
      dispatch(setUserType("talent"));
      dispatch(setUser(user));
      handleCloseModal();
      navigate('/job-openings')
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBusinessSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    if(password.length < 5){
      dispatch(setError("Password must be at least 6 characters"));
      return
    }
    dispatch(setLoading(true));
    try {
      const user = await signUp(name, email, password);
      dispatch(setUserType("business"));
      dispatch(setUser(user));
      handleCloseModal();
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(setLoading(true));
    try {
      const user = await signInWithGoogle();
      dispatch(setUser(user));
      handleCloseModal();
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Function for rendering each specific form
  const renderForm = () => {
    const commonFields = [
      { label: "Email*", name: "email", type: "email" },
      { label: "Password", name: "password", type: "password" },
      { label: "Confirm Password*", name: "confirmPassword", type: "password" },
    ];

    const talentFields = [{ label: "Full Name*", name: "name", type: "text" }];

    const businessFields = [
      { label: "Business Name*", name: "businessName", type: "text" },
      { label: "Business Email Address*", name: "businessEmail", type: "text" },
      {
        label: "Business Type*",
        name: "businessType",
        type: "select",
        options: ["Retail", "Food", "Services", "Technology"],  // Changed `option` to `options`
      },
    ];

    const fields = selectedForm === "talent" ? talentFields : businessFields;

    return (
      <form className="flex flex-col gap-3" onSubmit={selectedForm === "talent" ? handleTalentSignUp : handleBusinessSignUp}>
        <div className="w-full mb-4">
          <button className="border-2 border-main bg-[#ffffff] rounded-full p-2 w-full" type="button" onClick={handleGoogleSignIn}>
            Sign up with Google
          </button>
        </div>

        {fields.concat(commonFields).map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                className="p-2 rounded border"
                onChange={handleInputChange}
                required
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="p-2 rounded border"
                name={field.name}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="px-3 py-3 bg-main text-white rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    );
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      {selectedForm ? (
        <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full max-w-md p-8 mx-4 relative">
          <div className="flex justify-end mb-4">
            <FaTimes
              size={24}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleCloseModal}
            />
          </div>
          <h2 className="text-center text-lg font-semibold mb-6">
            {selectedForm === "talent" ? "Sign Up To Get Hired" : "Sign Up As A Business"}
          </h2>
          {renderForm()}
        </div>
      ) : (
        <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full max-w-md p-8 mx-4 relative">
          <div className="flex justify-end mb-4">
            <FaTimes
              size={24}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleCloseModal}
            />
          </div>
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Create an account with us to get started
          </h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleUserTypeSelection("talent")}
              className="border-2 border-blue-500 text-blue-500 rounded-full py-2 px-4 w-full hover:bg-[#800020] hover:text-accent transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
            >
              Sign Up To Get Hired
            </button>

            <button
              onClick={() => handleUserTypeSelection("business")}
              className="border-2 border-blue-500 text-blue-500 rounded-full py-2 px-4 w-full hover:bg-[#800020] hover:text-accent transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
            >
              Sign Up As A Business On Campus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default SignupModal;
