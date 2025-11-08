"use client"
import React, { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/auth/user-session");
        const data = await userRes.json();
        const name = data?.user?.name ?? "";
        const email = data?.user?.email ?? "";
        setUser({ name, email });
      } catch (err) {
        setError("User data load failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const initials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .filter(Boolean)
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "U";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-sm md:text-base text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-[50px] from-orange-50 via-white to-orange-50 py-6 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">My Account</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
              {/* Gradient Header */}
              <div className="h-20 md:h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              
              {/* Profile Content */}
              <div className="px-4 md:px-6 pb-6 md:pb-8">
                {/* Avatar */}
                <div className="flex justify-center -mt-10 md:-mt-12 mb-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-xl ring-4 ring-white">
                    {initials(user.name)}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                    {user.name || "Guest User"}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 break-all px-2">
                    {user.email || "No email provided"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                  <button className="w-full px-4 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg md:rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all text-sm md:text-base">
                    Edit Profile
                  </button>
                  <button 
                    onClick={async () => { 
                      await fetch('/api/auth/clear-user', { method: 'POST' });
                      window.location.href = '/';
                    }} 
                    className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg md:rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm md:text-base"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-orange-600">0</div>
                    <div className="text-xs md:text-sm text-gray-500">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-orange-600">0</div>
                    <div className="text-xs md:text-sm text-gray-500">Wishlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-orange-600">0</div>
                    <div className="text-xs md:text-sm text-gray-500">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Account Details */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2 text-xl md:text-2xl">👤</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Full Name</label>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-sm md:text-base text-gray-800">
                    {user.name || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Email Address</label>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-sm md:text-base text-gray-800 break-all">
                    {user.email || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Phone Number</label>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-sm md:text-base text-gray-500 italic">
                    Not added yet
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-600 mb-2 block">Date of Birth</label>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-sm md:text-base text-gray-500 italic">
                    Not added yet
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2 text-xl md:text-2xl">📦</span>
                Recent Orders
              </h3>
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🛒</div>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">No orders yet</p>
                <button className="px-4 md:px-6 py-2 md:py-2.5 bg-orange-500 text-white rounded-lg md:rounded-xl hover:bg-orange-600 transition-colors text-sm md:text-base font-semibold">
                  Start Shopping
                </button>
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2 text-xl md:text-2xl">📍</span>
                Saved Addresses
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg md:rounded-xl p-6 md:p-8 text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">🏠</div>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">No addresses saved</p>
                <button className="px-4 md:px-6 py-2 md:py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg md:rounded-xl hover:bg-orange-50 transition-colors text-sm md:text-base font-semibold">
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2 text-xl md:text-2xl">⚙️</span>
                Account Settings
              </h3>
              <div className="space-y-3 md:space-y-4">
                <button className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg md:text-xl">🔔</span>
                    <span className="font-medium text-gray-700">Notifications</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg md:text-xl">🔒</span>
                    <span className="font-medium text-gray-700">Privacy & Security</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg md:text-xl">💳</span>
                    <span className="font-medium text-gray-700">Payment Methods</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg md:text-xl">❓</span>
                    <span className="font-medium text-gray-700">Help & Support</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
