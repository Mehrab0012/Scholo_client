import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase.config";


const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <img
        src={user?.photoURL}
        alt="User"
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full cursor-pointer object-cover border"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-70 rounded-xl bg-white border-blue-300 shadow-blue-100 shadow-lg border p-3 z-50">
          
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.photoURL}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.displayName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="w-full py-2 text-sm cursor-pointer rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
