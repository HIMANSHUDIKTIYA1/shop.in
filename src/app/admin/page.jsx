"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userRes = await fetch("/api/auth/session");
        const data = await userRes.json();
        if (data.isAdmin && data.admin) {
          setAdmin({ name: data.admin.name || "", email: data.admin.email || "" });
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const initials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .filter(Boolean)
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "A";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-300 text-sm md:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full text-center border border-red-500/20">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <h2 className="text-lg md:text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-sm md:text-base text-gray-400">{error}</p>
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

  const stats = [
    { label: "Total Products", value: "0", icon: "📦", color: "from-blue-500 to-blue-600" },
    { label: "Orders", value: "0", icon: "🛒", color: "from-green-500 to-green-600" },
    { label: "Revenue", value: "₹0", icon: "💰", color: "from-orange-500 to-orange-600" },
    { label: "Users", value: "0", icon: "👥", color: "from-purple-500 to-purple-600" },
  ];

  const quickActions = [
    { title: "Create Product", icon: "➕", href: "/admin/products/new", color: "orange" },
    { title: "Manage Orders", icon: "📋", href: "/admin/orders", color: "blue" },
    { title: "View Users", icon: "👤", href: "/admin/users", color: "purple" },
    { title: "Settings", icon: "⚙️", href: "/admin/settings", color: "gray" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-0.5">Manage your store</p>
            </div>
            
            {/* Admin Profile */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-sm font-semibold text-white">{admin.name}</div>
                <div className="text-xs text-gray-400">{admin.email}</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm md:text-lg font-bold ring-2 ring-orange-500/20">
                {initials(admin.name)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Mobile Admin Info */}
        <div className="md:hidden bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="text-sm font-semibold text-white">{admin.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{admin.email}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl md:text-2xl mb-3`}>
                {stat.icon}
              </div>
              <div className="text-xs md:text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xl md:text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2">⚡</span>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`group bg-gray-700/50 hover:bg-gray-700 rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-600 hover:border-${action.color}-500/50 transition-all duration-300 hover:transform hover:scale-105`}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${action.color}-500/10 flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div>
                        <div className="text-sm md:text-base font-semibold text-white">{action.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Click to manage</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700 mt-4 md:mt-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2">📊</span>
                Recent Activity
              </h2>
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-5xl mb-3">📭</div>
                <p className="text-sm md:text-base text-gray-400">No recent activity</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Account Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2">👤</span>
                Account
              </h2>
              <div className="space-y-3">
                <Link
                  href="/admin/profile"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg">📝</span>
                    <span className="text-gray-300 group-hover:text-white">Edit Profile</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-orange-500 transition-colors">→</span>
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg">⚙️</span>
                    <span className="text-gray-300 group-hover:text-white">Settings</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-orange-500 transition-colors">→</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-500/10 transition-colors group"
                >
                  <div className="flex items-center text-sm md:text-base">
                    <span className="mr-3 text-lg">🚪</span>
                    <span className="text-gray-300 group-hover:text-red-400">Logout</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-red-400 transition-colors">→</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="text-orange-500 mr-2">🔧</span>
                System Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">Server</span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">Database</span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-gray-400">API</span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
