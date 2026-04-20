import React from "react";

const Home = () => {
  return (
    <>
      <div className="w-full">
        {/* 🔹 Hero Section */}
        <section className="bg-red-300 text-white text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to XYZ School</h1>
          <p className="text-lg mb-6">Building Future Leaders 🚀</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Explore More
          </button>
        </section>

        {/* 🔹 Features Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Features</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 shadow-lg rounded-xl">📚 Smart Classes</div>
            <div className="p-6 shadow-lg rounded-xl">🏀 Sports</div>
            <div className="p-6 shadow-lg rounded-xl">🧪 Labs</div>
            <div className="p-6 shadow-lg rounded-xl">🎓 Expert Teachers</div>
          </div>
        </section>

        {/* 🔹 Notices Section */}
        <section className="bg-gray-100 py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Latest Notices
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-4 bg-white shadow rounded">
              📢 Holiday on Monday
            </div>
            <div className="p-4 bg-white shadow rounded">
              📢 Exam Schedule Released
            </div>
            <div className="p-4 bg-white shadow rounded">
              📢 New Admissions Open
            </div>
          </div>
        </section>

        {/* 🔹 Teachers Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Teachers</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 shadow rounded-xl">
              <img
                src="https://i.pravatar.cc/100"
                alt="teacher"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold">Mr. Sharma</h3>
              <p>Math Teacher</p>
            </div>

            <div className="p-6 shadow rounded-xl">
              <img
                src="https://i.pravatar.cc/101"
                alt="teacher"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold">Ms. Gupta</h3>
              <p>Science Teacher</p>
            </div>

            <div className="p-6 shadow rounded-xl">
              <img
                src="https://i.pravatar.cc/102"
                alt="teacher"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold">Mr. Khan</h3>
              <p>English Teacher</p>
            </div>
          </div>
        </section>

        {/* 🔹 CTA Section */}
        <section className="bg-blue-600 text-white text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our School?</h2>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Apply Now
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
