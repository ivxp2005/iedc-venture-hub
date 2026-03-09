import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bell, User, LogOut, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/Intergrations/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  designation: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const notifications = [
    {
      id: 1,
      title: "New Event: Tech Startup Workshop",
      message: "Join us for an exciting workshop on building tech startups",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Program Application Approved",
      message:
        "Your application for the Entrepreneurship Program has been approved",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      title: "Weekly Newsletter",
      message:
        "Check out this week's innovation highlights and success stories",
      time: "3 days ago",
      unread: false,
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">I</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                IEDC Dashboard
              </h1>
              <p className="text-gray-600">Innovation Hub</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {profile?.full_name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {profile?.full_name || "User"}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600">
                    {profile?.designation || "IEDC Member"}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter((n) => n.unread).length} new
                </span>
              </CardTitle>
              <CardDescription>
                Stay updated with the latest from IEDC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.unread
                        ? "bg-orange-50 border-orange-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full ml-2 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">View Events</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse upcoming events and workshops
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Join Programs</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Apply for entrepreneurship programs
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Success Stories</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Read inspiring success stories
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
