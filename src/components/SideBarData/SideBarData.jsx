import React from 'react'

const SideBarData = ({ toggle }) => {
  return (
    
    <div className='' >
        <div className={`${ toggle ? 'last:w-[3.6rem]':'last:w-17rem]' } sidebar last:absolute left-4 bottom-4`}>
            <div className='mr-8 text-[1.7rem] text-brown'> Clients</div>
        </div>
    </div>
  )
}

export default SideBarData