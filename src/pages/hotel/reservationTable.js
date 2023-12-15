"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from "axios";

const ReservationTable = () => {
    const router = useRouter();
 
    const [reservations, setReservations] = useState([]);
      const handleSubmit = (e) => {
        console.log("entro submit");
        router.push("/hotel/createReservation");

      };

      const handleUpdate = (e, value) => {
        e.preventDefault();

        console.log("entro handleEdit" );
        console.log(value);
        sessionStorage.setItem(  "id", value.id);
        sessionStorage.setItem("clientFullName", value.clientFullName);
        sessionStorage.setItem("roomNumber", value.roomNumber);
        sessionStorage.setItem("reservationDates", value.reservationDates);
        router.push("/hotel/updateReservation");

      };

      const fetchData = async () => {
        console.log("entro fetchData");
        try {
            const response = await axios.get(
          
                "http://localhost:9089/coherent-hotel/api/v1/reservation",
              {
                headers: {
                },
              }
            );
  
            const items = response.data;
  
            const data = items.result;
            
            setReservations(data);
        } catch (error) {
            console.log(error);
        }
        
      }

      useEffect(() => {
        fetchData();
        console.log(reservations);
      }, []);
    
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <table className="min-w-full bg-grey border border-gray-800 shadow-sm rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-black-100 border-b">ID</th>
            <th className="px-6 py-3 bg-black-100 border-b">Client full name</th>
            <th className="px-6 py-3 bg-black-100 border-b">Room Number</th>
            <th className="px-6 py-3 bg-black-100 border-b">Reservation Dates</th>
          </tr>
        </thead>
        <tbody>
          {reservations?.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-6 py-4 whitespace-nowrap border-b">
             

                <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            handleUpdate(event, reservation);
                          }}
                        >  {reservation.id}</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{reservation.clientFullName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{reservation.roomNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                {reservation.reservationDates.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Create Reservation
        </button>
    </div>
  );
};

export default ReservationTable;
