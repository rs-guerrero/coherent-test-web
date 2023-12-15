// ReservationForm.js
"use client";
import { useState, useEffect } from 'react';

const UpdateReservation = () => {

  const [formData, setFormData] = useState({
   
    reservationDates: [""],
  });

  const [id, setId] = useState(0);
  const [clientFullName, setClientFullName] = useState("");
  const [roomNumber, setRoomNumber] = useState(0);
  const [reservationDates, setReservationDates] = useState([""]);

  const handleChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    //formData.clientFullName = sessionStorage.getItem("clientFullName");
    setClientFullName(sessionStorage.getItem("clientFullName"));
    setId(sessionStorage.getItem("id"));
    setRoomNumber(sessionStorage.getItem("roomNumber"));
   // setReservationDates(sessionStorage.getItem("reservationDates"));
    
  }, []);

  const handleDateChange = (e, index) => {
    console.log(e);
    console.log(index);
    console.log(formData.reservationDates);
    const { value } = e.target;
    console.log(value);
    setFormData((prevData) => {
        const newReservationDates = [...prevData.reservationDates];
        newReservationDates[index] = value;
        return {
          ...prevData,
          reservationDates: newReservationDates,
        };
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos, por ejemplo, a un servidor.
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md ">
      <h2 className="text-2xl font-semibold mb-4">Edit Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">ID</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Client full name</label>
          <input
            type="text"
            name="clientFullName"
            value={clientFullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Room number</label>
          <input
            type="text"
            name="roomNumber"
            value={roomNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Reservation Dates</label>
          {formData.reservationDates?.map((date, index) => (
            <input
              key={index}
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e, index)}
              className="mt-1 p-2 w-full border rounded-md mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prevData) => ({
                ...prevData,
                reservationDates: [...prevData.reservationDates, ''],
              }))
            }
            className="text-blue-500 underline"
          > Add new date
          </button>
        </div>
        <br />
        <br />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          update Reservation
        </button>
      </form>
    </div>
  );
};

export default UpdateReservation;
