// src/components/AllTiffin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode";

// Import jsPDF and html2canvas
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BACKEND_URL = "http://localhost:5000";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  if (isNaN(d)) return "Invalid date";
  return d.toLocaleDateString();
};

const AllTiffin = () => {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;
  try {
    if (userStr && userStr !== "undefined") {
      user = JSON.parse(userStr);
    }
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }

  // Fetch all tiffins (with populated requests.user)
  const fetchTiffins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/tiffins/getAllTiffins`
      );
      setTiffins(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch tiffin services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  // Student requests a tiffin subscription
  const handleRequest = async (tiffinId) => {
    if (!token || !user) {
      toast.error("You must be logged in to request a tiffin.");
      return;
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/tiffins/requestMess/${tiffinId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Tiffin request submitted successfully!");
      fetchTiffins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    }
  };

  // Owner approves or rejects student requests
  const handleRequestStatusChange = async (tiffinId, userId, approve) => {
    if (!token || !user) {
      toast.error("You must be logged in as owner to perform this action.");
      return;
    }
    try {
      await axios.put(
        `${BACKEND_URL}/api/tiffins/updateRequestStatus/${tiffinId}/${userId}`,
        {
          status: approve ? "approved" : "rejected",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(
        `Request ${approve ? "approved" : "rejected"} successfully!`
      );
      fetchTiffins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };
  const handleDownloadCard = async (
    tiffinName,
    studentName,
    requestedAt,
    approvedAt
  ) => {
    try {
      const validUntil = new Date(
        new Date(approvedAt).getTime() + 30 * 24 * 60 * 60 * 1000
      );

      // Prepare data to encode in QR code (as JSON string)
      const qrData = JSON.stringify({
        mess: tiffinName,
        student: studentName,
        requestedAt,
        approvedAt,
        validUntil: validUntil.toISOString(), // Include valid until date
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 100,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });
      const validUntilDate = new Date(
        new Date(approvedAt).getTime() + 30 * 24 * 60 * 60 * 1000
      );

      const cardContent = `
  <div
    id="tiffin-card"
    style="
      width: 270px;
      height: 360px;
      padding: 24px 28px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 16px;
      background: linear-gradient(145deg, #f5f7fa, #e4ebf5);
      box-shadow: 6px 6px 12px #bec8d2, -6px -6px 12px #ffffff;
      color: #222;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      border: 1px solid #d0d7df;
      position: relative;
      overflow: hidden;
    "
  >
    <div style="
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      background: #a5b8f3;
      border-radius: 50%;
      opacity: 0.2;
      filter: blur(30px);
      z-index: 0;
    "></div>

    <h2 style="
      margin: 0 0 20px 0;
      font-size: 26px;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 2px solid #a5b8f3;
      padding-bottom: 8px;
      z-index: 1;
      position: relative;
    ">
      Tiffin Card
    </h2>

    <div style="font-size: 16px; line-height: 1.6; z-index: 1; position: relative;">
      <p><strong style='color:#475569'>Mess:</strong> ${tiffinName}</p>
      <p><strong style='color:#475569'>Student:</strong> ${studentName}</p>
      <p><strong style='color:#475569'>Requested At:</strong> ${formatDate(
        requestedAt
      )}</p>
      <p><strong style='color:#475569'>Approved At:</strong> ${formatDate(
        approvedAt
      )}</p>
      <p><strong style='color:#475569'>Valid Until:</strong> ${formatDate(
        validUntilDate
      )}</p>
    </div>

    <div style="margin-top: 10px; text-align: center; z-index: 1; position: relative;">
      <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 100px; height: 100px; margin: 0 auto;" />
      <p style="font-size: 12px; color: #475569; margin-top: 6px;">Scan for details</p>
    </div>
  </div>
`;

      // Append off-screen, capture, generate PDF as before
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.top = "-9999px";
      wrapper.innerHTML = cardContent;
      document.body.appendChild(wrapper);

      const cardElement = wrapper.querySelector("#tiffin-card");
      const canvas = await html2canvas(cardElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`tiffin_card_${studentName}.pdf`);

      document.body.removeChild(wrapper);
    } catch (error) {
      console.error("Error generating PDF with QR code:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center">
        All Tiffin Services
      </h1>

      {/* ====== Student’s Applied Tiffin Status (top section) ====== */}
      {user?.role === "student" && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Your Tiffin Status
          </h2>

          {tiffins
            .map((tiffin) => {
              const match = (tiffin.requests || []).find(
                (r) => r.user._id === user._id
              );
              return match
                ? {
                    name: tiffin.name,
                    status: match.status,
                    requestedAt: match.requestedAt,
                    approvedAt: match.approvedAt,
                    messStartDate: formatDate(tiffin.messStartDate),
                  }
                : null;
            })
            .filter(Boolean).length > 0 ? (
            tiffins
              .map((tiffin) => {
                const match = (tiffin.requests || []).find(
                  (r) => r.user._id === user._id
                );
                return match
                  ? {
                      name: tiffin.name,
                      status: match.status,
                      requestedAt: match.requestedAt,
                      approvedAt: match.approvedAt,
                      messStartDate: formatDate(tiffin.messStartDate),
                    }
                  : null;
              })
              .filter(Boolean)
              .map(
                (
                  { name, status, requestedAt, approvedAt, messStartDate },
                  idx
                ) => (
                  <div key={idx} className="mb-4">
                    <div>
                      <span className="font-medium">{name}:</span>{" "}
                      <span
                        className={`${
                          status === "approved"
                            ? "text-green-600"
                            : status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } font-semibold`}
                      >
                        {typeof status === "string"
                          ? status.charAt(0).toUpperCase() + status.slice(1)
                          : ""}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 ml-2">
                      <p>
                        <strong>Requested At:</strong> {formatDate(requestedAt)}
                      </p>
                      {status === "approved" && (
                        <>
                          {approvedAt && (
                            <p>
                              <strong>Approved At:</strong>{" "}
                              {formatDate(approvedAt)}
                            </p>
                          )}
                          <p>
                            <strong>Mess Start Date:</strong> {messStartDate}
                          </p>
                          {/* Show Download Card button when approved */}
                          <button
                            onClick={() =>
                              handleDownloadCard(
                                name,
                                user.fullName || user.name,
                                requestedAt,
                                approvedAt
                              )
                            }
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                          >
                            Download Tiffin Card
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              )
          ) : (
            <p className="text-gray-600 italic">
              You haven’t applied to any tiffin yet.
            </p>
          )}
        </div>
      )}

      {/* ====== List of All Tiffin Services ====== */}
      {tiffins.length === 0 ? (
        <p className="text-center text-gray-600">No tiffin services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiffins.map((tiffin) => {
            const requests = tiffin.requests || [];

            return (
              <div
                key={tiffin._id}
                className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {tiffin.name || "Unnamed Service"}
                </h2>
                <p className="mb-1">
                  <strong>Area:</strong> {tiffin.area || "Not specified"}
                </p>
                <p className="mb-3">
                  <strong>Mess Start Date:</strong>{" "}
                  {formatDate(tiffin.messStartDate)}
                </p>

                <div className="mb-4">
                  <strong className="block mb-1">Weekly Menu:</strong>
                  {tiffin.weeklyPlan &&
                  Object.keys(tiffin.weeklyPlan).length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {Object.entries(tiffin.weeklyPlan).map(([day, menu]) => (
                        <li key={day} className="capitalize">
                          <span className="font-medium">{day}:</span>{" "}
                          {menu || "No menu provided"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-gray-500">
                      No weekly menu available.
                    </p>
                  )}
                </div>

                {user?.role === "student" ? (
                  <>
                    {requests.some(
                      (r) => r.user._id === user._id && r.status === "approved"
                    ) ? (
                      <p className="text-green-600 font-semibold">
                        You are subscribed to this tiffin.
                      </p>
                    ) : requests.some(
                        (r) => r.user._id === user._id && r.status === "pending"
                      ) ? (
                      <p className="text-yellow-600 font-semibold">
                        Your request is pending approval.
                      </p>
                    ) : (
                      <button
                        onClick={() => handleRequest(tiffin._id)}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Request Subscription
                      </button>
                    )}
                  </>
                ) : user?.role === "owner" && tiffin.owner._id === user._id ? (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Student Requests:</h3>
                    {requests.length === 0 ? (
                      <p className="italic text-gray-500">No requests yet.</p>
                    ) : (
                      <ul>
                        {requests.map(({ user: reqUser, status }) => (
                          <li
                            key={reqUser._id}
                            className="mb-2 flex items-center justify-between"
                          >
                            <span>
                              {reqUser.fullName} ({reqUser.email}) –{" "}
                              <span
                                className={
                                  status === "approved"
                                    ? "text-green-600 font-semibold"
                                    : status === "rejected"
                                    ? "text-red-600 font-semibold"
                                    : "text-yellow-600 font-semibold"
                                }
                              >
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </span>
                            </span>
                            {status === "pending" && (
                              <div>
                                <button
                                  onClick={() =>
                                    handleRequestStatusChange(
                                      tiffin._id,
                                      reqUser._id,
                                      true
                                    )
                                  }
                                  className="mr-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleRequestStatusChange(
                                      tiffin._id,
                                      reqUser._id,
                                      false
                                    )
                                  }
                                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Only students can request subscriptions.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTiffin;
