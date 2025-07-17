import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  user = { name: "user name", email: "smartcart@gmail.com" },
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    window.location.reload(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col justify-between bg-white shadow-lg md:flex">
        <div>
          <nav className="mt-4">
            <div className="flex cursor-pointer items-center px-6 py-3 font-semibold text-gray-700 hover:bg-indigo-50">
              <User className="mr-3 h-5 w-5 text-indigo-500" /> Profile
            </div>
            <div
              className="cursor-pointer px-6 py-3 hover:bg-indigo-50"
              onClick={handleLogout}
            >
              <div className="flex items-center font-semibold text-red-500 hover:text-red-600">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          User Profile
        </h1>

        <div className="max-w-md space-y-4 rounded bg-white p-6 shadow-md">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <h2 className="text-lg font-medium text-gray-800">{user.email}</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
