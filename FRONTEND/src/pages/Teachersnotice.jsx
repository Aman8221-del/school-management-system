import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Teachersnotice = () => {
  const [notice, setnotices]=useState([])
  useEffect(()=>{
    const fetchnotices= async()=>{
      try {
        const res=await axios.get("http://localhost:4000/notice/?type=teacher",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        setnotices(res.data)
      } catch (error) {
      console.log(error)        
      }
    }
    fetchnotices()
  }, [])
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notices</h2>
      <div className="grid gap-4">
        {notice.map((n)=>(
            <div key={notice._id} className='bg-white p-5 rounded-xl shadow'>
                <h3 className='text-lg font-bold'>{n.title}</h3>
                <p>{n.description}</p>
                <p className='text-sm text-gray-400 mt-2'>{n.audience} | 
                    {new Date(n.createdAt).toLocaleDateString()}
                </p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Teachersnotice
