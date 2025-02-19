import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/login.json";

const Login = () => {
    const { googleSignin } = useContext(AuthContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await googleSignin();
            setIsAnimating(true);

            setTimeout(() => {
                navigate("/");
            }, 800);
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#6A11CB] to-[#2575FC]"
            initial={{ y: 0 }}
            animate={isAnimating ? { y: "-100vh" } : { y: 0 }}
            transition={{ type: "tween", duration: 0.8 }}
        >
            {/* Login Card */}
            <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center w-full max-w-md">
                {/* Lottie Animation */}
                <div className="w-64 h-64">
                    <Lottie animationData={animationData} loop={true} />
                </div>

                {/* Title */}
                <h1 className="text-xl font-semibold text-gray-700">
                    Task Manager
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Sign in to manage your tasks efficiently.
                </p>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg shadow-md 
               hover:bg-[#2563EB] transition-all duration-300 w-full text-lg font-medium"
                >
                    Sign in with Google
                </button>


            </div>
        </motion.div>
    );
};

export default Login;
