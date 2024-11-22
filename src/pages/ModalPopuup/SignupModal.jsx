

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "../../redux/features/auth/authService";
import { setUserType, setLoading, setError, setUser } from "../../redux/features/auth/authSlice";
import { closeModal, openModal } from "../../redux/features/modal/modalSlice";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { signUp } from "../../redux/features/auth/authService";
import { Link } from "react-router-dom";

function SignupModal() {
  const dispatch = useDispatch();
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    businessName:"",
    businessEmail: "",
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

  const switchToLogInModal =() =>{
    handleCloseModal();
   dispatch(openModal("login"))
  }

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
      console.log("Attempting to sign up......")
      const user = await signUp(name, email, password, "talent");
      dispatch(setUserType("talent"));
      dispatch(setUser(user));
      handleCloseModal();
      navigate('/welcome-talent')
    } catch (error) {
      console.error("Sign-up error: ", error.message)
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
      const user = await signUp(name, email, password,"business");
      dispatch(setUserType("business"));
      dispatch(setUser(user));
      handleCloseModal();
      navigate('/welcome-business')
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
      const { uid, email, displayName, userType } = user; 
      const username = displayName ? displayName : email.split("@")[0]; 
      dispatch(setUser({ uid, email, userType, username }));
      dispatch(closeModal());
      if (user.userType === "talent") {
        navigate("/welcome-talent", { state: { username } }); 
      } else if (user.userType === "business") {
        navigate("/welcome-business", { state: { username } }); 
      }
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
        <div className="w-full">
          <button className="border-2 border-main bg-white rounded-full py-3 text-main hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 w-full" type="button" onClick={handleGoogleSignIn}>
            Sign up with Google
          </button>
        </div>

        {fields.concat(commonFields).map((field) => (
          <div key={field.name} className="w-full">
            <label className="block text-main text-sm font-medium mb-2">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                className="p-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-main transition"
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
                className="p-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-main transition"
                name={field.name}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="py-3 bg-main text-white rounded w-full hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"
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
            <p className="text-center mt-4">Already have an account with us? <Link className="text-main" onClick={switchToLogInModal}>Log in</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}
export default SignupModal;
