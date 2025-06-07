import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = "http://localhost:5000"; // Change this if using a deployed backend

const TiffinRequest = () => {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/tiffins/myRequests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTiffins(response.data.data || []);
      } catch (err) {
        setError("Failed to load tiffin requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleUpdateRequestStatus = async (tiffinId, userId, approve) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/tiffins/updateRequestStatus/${tiffinId}/${userId}`,
        { status: approve ? "approved" : "rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        `Request ${approve ? "approved" : "rejected"} successfully.`
      );

      const refreshed = await axios.get(
        `${BACKEND_URL}/api/tiffins/myRequests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTiffins(refreshed.data.data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update request status"
      );
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tiffin Subscription Requests
      </h1>

      {tiffins.length === 0 ? (
        <p className="text-center text-gray-600">No tiffin services found.</p>
      ) : (
        tiffins.map((tiffin) => (
          <div
            key={tiffin._id}
            className="border rounded-lg p-6 mb-6 shadow bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{tiffin.name}</h2>

            {tiffin.requests && tiffin.requests.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">Student Email</th>
                    <th className="border-b px-4 py-2">Status</th>
                    <th className="border-b px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tiffin.requests.map(({ user, status }) => (
                    <tr key={user._id}>
                      <td className="border-b px-4 py-2">{user.email}</td>
                      <td className="border-b px-4 py-2 capitalize">
                        {status}
                      </td>
                      <td className="border-b px-4 py-2 space-x-2">
                        {status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateRequestStatus(
                                  tiffin._id,
                                  user._id,
                                  true
                                )
                              }
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateRequestStatus(
                                  tiffin._id,
                                  user._id,
                                  false
                                )
                              }
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="italic text-gray-600">
                            No actions available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="italic text-gray-600">
                No requests for this tiffin.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TiffinRequest;
