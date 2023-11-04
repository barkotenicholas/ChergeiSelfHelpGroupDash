import React from 'react'
import { FaPlusSquare } from "react-icons/fa";
import { getSingleUser } from "../../features/user/ClientsActions";
import { useDispatch } from 'react-redux';
import { LineWave } from 'react-loader-spinner';
import { useState } from 'react';
import { useEffect } from 'react';



function UserPaymentHeader({ users, handleNewClick }) {

    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(true);
    const [singleusers, setsingleusers] = useState(users)

    useEffect(() => {

        dispatch(getSingleUser(users._id)).unwrap()
            .then((payload) => {
                setsingleusers((pre) => payload.user[0])
                setLoading(false)
            }).catch((e) => {
                console.log(e);
            });

    }, [loading])


    return (

        <>
            {
                loading ? <LineWave
                    height="100"
                    width="100"
                    color="#8B5CF6"
                    ariaLabel="line-wave"
                    wrapperStyle={{}
                    }
                    wrapperClass=""
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                /> :
                    <>
                        <div className='flex'>
                            <button onClick={handleNewClick} className="flex items-center gap-3 rounded-md m-2 p-2 border border-violet-500 text-violet-500">
                                Add New Payment
                                <FaPlusSquare />
                            </button>
                            <button className="flex items-center gap-3 rounded-md m-2 p-2 border border-violet-500 text-violet-500">
                                {singleusers.name} has {singleusers.arears} in areas
                            </button>

                        </div>
                    </>
            }
        </>

    )
}

export default UserPaymentHeader