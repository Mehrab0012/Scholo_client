import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { Link } from "react-router";

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer relative bg-blue-200 p-2 rounded-full shadow-2xl shadow-teal-700" ref={menuRef}>
      {/* Avatar */}
      <img
        src={user?.photoURL}
        alt="User"
        
        className="w-9 h-9 rounded-full  object-cover border"
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

          {user && (
            <Link to={'/dashboard'}>
              <button className="w-full py-2 mt-5 text-lg cursor-pointer bg-blue-100 rounded-lg text-blue-600 font-bold hover:bg-red-50 transition">
                Dashboard
              </button>
            </Link>
          )}

          <button
            onClick={() => signOut(auth)}
            className="w-full py-2 mt-5 text-sm rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
