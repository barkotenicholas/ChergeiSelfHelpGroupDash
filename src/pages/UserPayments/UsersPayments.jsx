import React, { useEffect, useState, useMemo } from 'react'
import { getUsersPayments, updateUsersPayment } from "../../features/user/ClientsActions";
import { useDispatch } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import { useLocation } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Modal from '../../components/modal/modal';
import UpdatePayment from '../../components/modal/UpdatePayment';
import { FaPlusSquare } from "react-icons/fa";
import Swal from "sweetalert2";
import AddNewPayment from '../../components/modal/AddNewPayment';


function UsersPayments() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordData, setrecordData] = useState([]);
  const location = useLocation();
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [showModalNew, setshowModalNew] = useState(false)
  const [modalContent, setmodalContent] = useState(null)

  // Access the passed props
  const myProp = location.state && location.state.user;
  const [users, setUsers] = useState(myProp)

  useEffect(() => {

    dispatch(getUsersPayments(users.meter_number)).unwrap()
      .then((payload) => {

        setrecordData(payload.readings);
        setLoading(false)
      });
  }, [])
  console.log(recordData);
  const data = React.useMemo(() => recordData, [recordData])

  const handleDelete = (data) => {
    console.log(data.values.amount_payed);
    Swal.fire({
      title: 'Are you sure?',
      text: `Do You want to delete this payment Record ${data.values.amount_payed} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const handleEdit = (data) => {

    setshowModalNew(true)
    setmodalContent(<UpdatePayment info={data.values} UpdateUserPayment={UpdateUserPayment}></UpdatePayment>)

  }
  function UpdateUserPayment(data) {
    setLoading((prev) => true)
    setshowModalNew((prev) => false)
    const new_data = {
      "meter_number": users.meter_number,
      "payment": data.amount_payed,
      "id": data._id
    }
    console.log(new_data);
    dispatch(updateUsersPayment(new_data)).unwrap()
      .then((payload) => {
        setLoading((prev) => false)

        console.log(payload);
        Swal.fire(
          'Record Updated',
          `${payload.message}`,
          'success'
        )

      }).catch((error) => {
        Swal.fire(
          'Update Failed',
          `An error occurred: ${error.message}`,
          'error'
        );
        setLoading((prev) => false)

      });

  }
  const columns = useMemo(() => [

    {
      Header: "Date",
      accessor: "date",
      Cell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleString(); // Format the timestamp as a user-readable string
      },
    },
    {
      Header: "From",
      accessor: "from"
    },
    {
      Header: "Amount",
      accessor: "amount_payed"
    },
    {
      "Header": "Actions",
      "accessor": "_id",
      Cell: ({ row }) => (

        <div className='flex'>
          <FaEdit onClick={() => handleEdit(row)} >Edit</FaEdit>
          <FaTrashAlt onClick={() => handleDelete(row)} >Delete</FaTrashAlt>
        </div>
      ),
    }
  ], []);

  function handleNewClick() {
    setshowModalNew(true)
    setmodalContent(<AddNewPayment users={users}/>)
  }

  const { getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state,
    canNextPage,
    canPreviousPage,
    gotoPage,

    pageCount,
    prepareRow } = useTable({ columns, data: data }, useSortBy, usePagination);

  const { pageIndex } = state
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
      /> :
        <>
          <div>
            <button onClick={handleNewClick} className="flex items-center gap-3 rounded-md m-2 p-2 bg-violet-500">
              Add New Payment
              <FaPlusSquare />
            </button>
          </div>
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">

              {data && (
                <>
                  <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                    <thead className="bg-gray-50" >
                      {
                        headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()} >
                            {
                              headerGroup.headers.map((column) => (
                                <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted ? (column.isSortedDesc ? <IoCaretUp /> : <IoCaretDown />) : ""}
                                  </span>
                                </th>
                              ))
                            }
                          </tr>
                        ))
                      }
                    </thead>
                    <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
                      {page.map((row) => {
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" {...cell.getCellProps()} >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </>

              )}
              <div className='m-5'>
                <div className="inline-flex">
                  <span className='mr-2'>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>

                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                  </button>
                  <button onClick={() => previousPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" disabled={!canPreviousPage}>
                    Prev
                  </button>
                  <button onClick={() => nextPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" disabled={!canNextPage}>
                    Next
                  </button>

                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {showModalNew ? (
        <Modal
          title="Edit Payment Details"
          setshowModalNew={setshowModalNew}
        >
          {modalContent}
        </Modal>
      ) : null}
    </div>)
}

export default UsersPayments