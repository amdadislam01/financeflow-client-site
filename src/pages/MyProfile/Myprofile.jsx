import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
      setPreview(user.photoURL || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setPhoto(imageUrl);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPhoto(url);
    setPreview(url);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photo);
      const res = await fetch(`http://localhost:3000/users/${user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          photo: photo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Database updated:", data);
      } else {
        console.error("Failed to update:", data.message);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 py-16 transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-green-50 to-teal-50"
      }`}
    >
      <div
        className={`shadow-xl rounded-2xl p-8 w-full max-w-md border text-center transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-teal-100 text-gray-800"
        }`}
      >
        <img
          src={photo}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-2 border-emerald-500"
        />
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
            isDarkMode ? "bg-black/60" : "bg-gray-900/30"
          }`}
        >
          <div
            className={`rounded-2xl p-6 w-full max-w-md border shadow-2xl transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-teal-100 text-gray-800"
            }`}
          >
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 text-center">
              Update Profile
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full mb-3 border-2 border-emerald-500 object-cover"
                />
                <label className="cursor-pointer text-teal-600 dark:text-teal-400 font-medium hover:underline">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={handleUrlChange}
                  placeholder="Enter photo URL"
                  className={`w-full p-3 rounded-lg outline-none focus:border-emerald-500 transition border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full p-3 rounded-lg outline-none focus:border-emerald-500 transition border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 rounded-lg border transition cursor-pointer ${
                    isDarkMode
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
