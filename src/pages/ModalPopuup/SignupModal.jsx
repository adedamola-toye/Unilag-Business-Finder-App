import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/features/auth/authService";
import { setUser, setLoading, setError } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import ModalContext from "../../contexts/ModalContext";
import { FaTimes } from "react-icons/fa";

export default function SignupModal() {
  const { currentModal, closeModal, openModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // State hooks for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchToLoginModal = () => {
    openModal("login");
  };

  if (currentModal !== "signup") {
    return null;
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    dispatch(setLoading(true));
    try {
      const user = await signUp(username, email, password); // Sign up with Firebase
      dispatch(setUser(user)); // Update Redux store with user
      closeModal(); // Close the modal on successful signup
    } catch (error) {
      dispatch(setError(error.message)); // Show error if signup fails
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full lg:w-[700px] p-8 lg:px-[50px] relative mx-4 sm:mx-0">
        <div className="cursor-pointer flex justify-end">
          <FaTimes size={30} onClick={closeModal} />
        </div>
        <h2 className="text-center text-lg font-semibold mb-6">
          Create an account with us to get started
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <button className="border-2 border-main bg-[#ffffff] rounded-full p-2 w-full">
              Sign in with Google
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-main text-md">Username*</label>
            <input
              type="text"
              className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="text-main text-md">Email*</label>
            <input
              type="email"
              className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-main text-md">Create Password*</label>
            <input
              type="password"
              className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="text-main text-md">Confirm Password*</label>
            <input
              type="password"
              className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="mt-5">
              <button
                type="submit"
                className="px-3 py-3 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <p className="text-center mt-5">
            Already have an account with us?{" "}
            <Link className="text-main" onClick={switchToLoginModal}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
