import React, { useEffect , useState} from 'react'
import { getUsersDetails} from "../../features/user/ClientsActions";
import { useDispatch } from 'react-redux';
import { useTable } from 'react-table';
import { data } from 'autoprefixer';
import { useLocation } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
function UserDetails({meternumber}) {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recordData, setrecordData] = useState()
    const location = useLocation();

    // Access the passed props
    const myProp = location.state && location.state.user;
    const [users,setUsers] = useState(myProp)

    console.log(myProp);
  
    useEffect(() => {

      dispatch(getUsersDetails(users.meter_number)).unwrap()
      .then((payload)=>{

        console.log(payload);
  
      });   
    })
    

 
    // console.log(recordData);
    // const data = React.useMemo(()=> recordData , [])
    // console.log(data);
    // const columns = React.useMemo(()=>[
    //   {
    //     Header:"ID",
    //     accessor:"_id"
    //   },
    //   {
    //     Header:"Date",
    //     accessor:"date"
    //   },
    //   {
    //     Header:"Reading",
    //     accessor:"reading"
    //   },
    //   {
    //     Header:"Billed",
    //     accessor:"billed"
    //   }
    // ],[]);

    // const {getTableBodyProps, getTableProps, headerGroups , rows ,prepareRow} = useTable({columns  , data});
    return (
    <div>

       {loading ? <LineWave
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>:
  <p>Hello world</p>
}

    </div>
  )
}

export default UserDetails