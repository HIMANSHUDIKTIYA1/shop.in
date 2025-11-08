"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("/api/auth/session");

                const name = data.data.admin.name ?? "";
                const email = data.data?.admin.email ?? "";

                setUser({ name, email });
            } catch (err) {
                setError("User data load failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const initials = (user.name || "")
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center py-24 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Loading profile…</p>
                    </div>
                ) : error ? (
                    <div className="py-8 text-center">
                        <p className="text-red-500 mb-2">{error}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Try refreshing the page.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                                {initials || "?"}
                            </div>
                            <div className="text-left">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {user.name || "Name not provided"}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-300">{user.email || "Email not provided"}</p>
                            </div>
                        </div>

                        <div className="w-full border-t pt-4">
                            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Account</h3>
                            <div className="text-sm text-gray-700 dark:text-gray-200">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">Role</span>
                                    <span className="font-medium">Admin</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">Status</span>
                                    <span className="font-medium text-green-600">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
