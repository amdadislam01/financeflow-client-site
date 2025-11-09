import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
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
      // ✅ Step 1: Firebase user profile update
      await updateUserProfile(name, photo);

      // ✅ Step 2: MongoDB database update
      const res = await fetch(
        `http://localhost:3000/users/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            photo: photo,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Database updated:", data);
      } else {
        console.error("❌ Failed to update:", data.message);
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
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-teal-100 text-center">
        <img
          src={photo}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-2 border-emerald-500"
        />
        <h2 className="text-2xl font-bold text-emerald-700 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{user?.email}</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-teal-100 shadow-2xl">
            <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">
              Update Profile
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full mb-3 border-2 border-emerald-500 object-cover"
                />
                <label className="cursor-pointer text-teal-600 font-medium hover:underline">
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
                <label className="block text-gray-600 mb-1 font-medium">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={handleUrlChange}
                  placeholder="Enter photo URL"
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
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
