import axios from "axios";
import React, { useEffect, useState } from "react";

const Queryspage = () => {
  const [querys, setquerys] = useState([]);

  const fetchQuerys = async () => {
    try {
      const res = await axios.get("http://localhost:4000/query/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     
      setquerys(res.data.queries);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchQuerys();
  }, []);

  // delete querys

  const HandelDelete = async (id) => {
    await axios.delete(`http://localhost:4000/query/${id}`);
    fetchQuerys();
  };

  return (
    <>
      <h1 className="text-4xl font-bold pb-10"> All Querys</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(querys) &&
            querys.map((q) => (
              <tr key={q._id}>
                <td className="border p-2 text-center">{q.name}</td>
                <td className="border p-2 text-center">{q.phone}</td>
                <td className="border p-2 max-w-xs break-words">{q.message}</td>
                <td className="border text-center">
                  <button
                    onClick={() => HandelDelete(q._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Queryspage;
