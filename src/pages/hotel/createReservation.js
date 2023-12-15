// ReservationForm.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const ReservationForm = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    clientFullName: '',
    roomNumber: '',
    reservationDates: [""],
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

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

  const saveData = async () => {
    console.log("entro saveData");
    const response = await axios.post(
      
          "http://localhost:9089/coherent-hotel/api/v1/reservation",
          formData,
        {
          headers: {
          },
        }
      );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos, por ejemplo, a un servidor.
    console.log('Form data submitted:', formData);
    saveData();
    router.push("/hotel/reservationTable");

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md ">
      <h2 className="text-2xl font-semibold mb-4">Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
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
            value={formData.clientFullName}
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
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Reservation Dates</label>
          {formData.reservationDates.map((date, index) => (
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
          Send Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
