import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleUserBill } from "../../features/user/ClientsActions";
import { LineWave } from "react-loader-spinner";
import { load } from "npm";

function UserBills({ user }) {
  // const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);

  // // Access the passed props
  // const myProp = location.state && location.state.user;
  // const [users, setUsers] = useState(myProp);
  // const [bills, setBills] = useState([]);

  // useEffect(() => {
  //   dispatch(getSingleUserBill(users.meter_number))
  //     .unwrap()
  //     .then((payload) => {
  //       console.log(payload);
  //       setBills(payload.bills);
  //       setLoading(false);
  //     });
  // }, [loading]);

  // const data = React.useMemo(() => bills, [bills]);
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Date",
  //       accessor: "date",
  //     },
  //     {
  //       Header: "Bill",
  //       accessor: "bill",
  //     },
  //     {
  //       Header: "Amount consumed",
  //       accessor: "diff",
  //     },
  //   ],
  //   []
  // );

  // const { 
  //   getTableBodyProps,
  //   getTableProps,
  //   headerGroups,
  //   page,
  //   nextPage,
  //   previousPage,
  //   pageOptions,
  //   state,
  //   canNextPage,
  //   canPreviousPage,
  //   gotoPage,

  //   pageCount,
  //   prepareRow } = useTable({ columns, data: data }, useSortBy, usePagination);


  return (
    <>
   
    </>
  );
}

export default UserBills;
