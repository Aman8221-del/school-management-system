import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");

  const handelqueryform = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post("http://localhost:4000/query/", {
        name,
        phone,
        message,
      });
      alert(res.data.message);
      setname("")
      setphone("")
      setmessage("")
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100   ">
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg grid md:grid-cols-2">
        {/* LEFT SIDE - FORM */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <form onSubmit={handelqueryform} className="space-y-4">
            <input
            value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full border p-3 rounded-lg"
            />

            <input
            value={phone}
              onChange={(e) => setphone(e.target.value)}
              type="tel"
              placeholder="Enter your phone"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
            value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Write your message..."
              rows="4"
              className="w-full border p-3 rounded-lg"
            ></textarea>

            <button className="w-full cursor-pointer bg-blue-500 text-white p-3 rounded-lg">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - ADDRESS */}
        <div className="bg-blue-400 text-white p-6 rounded-r-lg  ">
          <p className="text-xl pb-4">🏫 MS Public school </p>
          <p className="text-xl pb-4">
            📍 Head Office:- New Bus Stand, In Front Of Main Post Office,
            jaipur, Rajasthan - 300000
          </p>
          <p className="text-xl pb-4">📞 +962321-450676, +96877865235</p>
          <p className="text-xl pb-4">📧 school@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
