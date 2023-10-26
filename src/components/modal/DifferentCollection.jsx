import React from "react";

function DifferentCollection({ selectedChoice, user }) {
  function checkSelect(params, user) {
    console.log(user);
    selectedChoice(params, user);
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-extrabold dark:text-white">{user.name}</h2>
      </div>
      <div className="bg-white whitespace-no-wrap py-3 px-4 text-center">
        <button
          className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
          onClick={() => checkSelect("ViewReading", user)}
        >
          View Readings
        </button>
        <button
          className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
          onClick={() => checkSelect("Edit", user)}
        >
          Edit User
        </button>
        <button
          className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
          onClick={() => checkSelect("Payments", user)}
        >
          View Payments
        </button>
        <button
          className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
          onClick={() => checkSelect("Bills", user)}
        >
          View Bills
        </button>
      </div>
    </>
  );
}

export default DifferentCollection;
