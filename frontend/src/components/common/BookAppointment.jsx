import React, { useState } from "react";

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Johnson");
  const [selectedDate, setSelectedDate] = useState("8");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [showModal, setShowModal] = useState(false);

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      rating: 4.8,
      reviews: 124,
    },
    { name: "Dr. Michael Chen", role: "Neurologist", rating: 4.2, reviews: 98 },
    {
      name: "Dr. Emily Rodriguez",
      role: "Dermatologist",
      rating: 5.0,
      reviews: 156,
    },
  ];

  const dates = [6, 7, 8, 9, 13, 14, 15, 20, 21, 22, 27, 28, 29];

  const times = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center h-auto bg-gray-50 font-sans">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">Book an Appointment</h1>
      </div>
      {/* Steps */}
      <div className="flex justify-center gap-8  text-sm font-medium">
        {[
          { step: 1, label: "Select Doctor" },
          { step: 2, label: "Choose Date" },
          { step: 3, label: "Select Time" },
          { step: 4, label: "Confirm Booking" },
        ].map((s) => (
          <div key={s.step} className="flex flex-col gap-2 items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 text-white font-bold ${
                s.step === 1 ? "bg-red-700" : "bg-gray-300"
              }`}
            >
              {s.step}
            </div>
            <p className={s.step === 1 ? "text-red-700 font-semibold" : "text-gray-500"}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Doctor Selection */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="font-semibold mb-4">Select a Doctor</h2>
        <div className="grid grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              onClick={() => setSelectedDoctor(doc.name)}
                  className={`cursor-pointer bg-white rounded-lg shadow p-6 border ${
                selectedDoctor === doc.name
                  ? "border-red-600 bg-red-50"
                  : "border-transparent"
              }`}
            >
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-4xl text-gray-400">
                👤
              </div>
              <h3 className="mt-4 font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.role}</p>
              <div className="flex items-center mt-2 text-yellow-500 text-sm">
                {"★".repeat(5)}
                <span className="ml-2 text-gray-600">
                  {doc.rating} ({doc.reviews} reviews)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Date Selection */}
        <h2 className="font-semibold mt-10 mb-4">Select a Date</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium mb-4">June 2023</h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[...Array(30).keys()].map((d) => {
              const day = d + 1;
              const isAvailable = dates.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => isAvailable && setSelectedDate(String(day))}
                  disabled={!isAvailable}
                  className={`py-2 rounded-full text-sm font-medium ${
                    !isAvailable
                      ? "text-gray-300"
                      : selectedDate === String(day)
                      ? "bg-red-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <h2 className="font-semibold mt-10 mb-4">Select a Time</h2>
        <div className="grid grid-cols-4 gap-4 mb-20">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              disabled={["12:00 PM", "12:30 PM", "5:00 PM", "5:30 PM"].includes(
                t
              )}
              className={`py-2 px-4 rounded-lg border text-sm font-medium ${
                selectedTime === t
                  ? "border-red-600 bg-red-700 text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className="text-center mt-20">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 w-[30%] text-white py-[15px] px-[10px] rounded-full font-medium hover:bg-red-800"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg justify-center shadow-lg max-w-md w-full mx-4 my-4">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Confirm Appointment
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Doctor:</strong> {selectedDoctor}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Date:</strong> June {selectedDate}, 2023
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Time:</strong> {selectedTime}
            </p>

            <div className="flex gap-2 justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 w-[100px] rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("✅ Appointment booked successfully!");
                  setShowModal(false);
                }}
                className="px-4 py-2 w-[100px] rounded-lg bg-red-700 text-white hover:bg-red-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
