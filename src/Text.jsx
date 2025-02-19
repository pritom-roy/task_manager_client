import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark"); // Enable dark mode
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark"); // Disable dark mode
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <div className="bg-[var(--color-background)] text-[var(--color-text)] min-h-screen p-6">
            {/* Toggle Button */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="fixed top-4 right-4 px-4 py-2 rounded-lg shadow-md 
                 bg-[var(--color-primary)] text-white transition-all"
            >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-[var(--color-primary)]">
                    Task Manager
                </h1>
                <p className="text-[var(--color-text)] text-lg mt-2">
                    Stay organized and manage your tasks efficiently.
                </p>
            </header>

            {/* Task Section */}
            <div className="max-w-3xl mx-auto bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
                    Your Tasks
                </h2>

                <ul className="space-y-3">
                    <li className="p-4 bg-[var(--color-secondary)] text-white rounded-md shadow-sm">
                        🚀 Build a Task Management App
                    </li>
                    <li className="p-4 bg-[var(--color-secondary)] text-white rounded-md shadow-sm">
                        🎨 Improve UI Design & Dark Mode
                    </li>
                    <li className="p-4 bg-[var(--color-secondary)] text-white rounded-md shadow-sm">
                        ✅ Add Task Reordering Feature
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DarkModeToggle;
