import { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { FiLogOut, FiMoon } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { MdSunny } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const [currentTime, setCurrentTime] = useState(format(new Date(), "hh:mm:ss a"));

    // Handle Dark Mode Toggle
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    // Update Time Every Second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(format(new Date(), "hh:mm:ss a"));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("User logged out successfully");
            })
            .catch(error => {
                console.log("Error during log out:", error.message);
            });
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[var(--color-background)] shadow-md p-3 z-50">
            <div className="hidden md:flex justify-between items-center w-11/12 md:w-10/12 mx-auto">
                {/* Left: User Info */}
                <div className="flex items-center space-x-4">
                    <img
                        src={user?.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full border border-[var(--color-text)]"
                    />
                    <span className="text-[var(--color-text)] text-lg font-semibold">
                        {user?.displayName}
                    </span>
                </div>

                <div className="text-lg text-[var(--color-primary)] font-semibold">
                    {currentTime}
                </div>
                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="text-[var(--color-text)] text-xl cursor-pointer"
                    >
                        {isDarkMode ? <MdSunny className="text-[#FFD700]" /> : <FiMoon className="text-[#B0C4DE]" />}
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer text-[var(--color-danger)] px-3 py-2 rounded-md border border-[var(--color-danger)] flex items-center space-x-2 text-lg font-semibold"
                    >
                        <h1>Logout</h1>
                        <FiLogOut />
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-between items-center">
                {/* User Image */}
                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-[var(--color-text)]"
                />

                {/* Dark Mode Toggle + Logout */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="text-[var(--color-text)] text-xl"
                    >
                        {isDarkMode ? <MdSunny className="text-[#FFD700]" /> : <FiMoon className="text-[#B0C4DE]" />}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="text-[var(--color-danger)] flex items-center space-x-2 text-lg font-semibold"
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
