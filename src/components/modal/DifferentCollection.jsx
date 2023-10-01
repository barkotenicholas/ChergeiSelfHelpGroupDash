import React from 'react'

function DifferentCollection({selectedChoice,user}) {

    console.log(user);
    function checkSelect(params, user) {
        console.log(user);
        selectedChoice(params, user)
    }
    
  return (
    <div className="bg-white whitespace-no-wrap py-3 px-4 text-center">
        <button className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
            onClick={()=>checkSelect("ViewReading",user)}
        >View Readings</button>
        <button className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
            onClick={()=>checkSelect("Edit",user)}
        >Edit User</button>
        <button className="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4">Button 3</button>
    </div>
  )
}

export default DifferentCollection