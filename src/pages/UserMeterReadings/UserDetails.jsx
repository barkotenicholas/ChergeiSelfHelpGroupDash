import React, { useEffect, useState, useMemo } from 'react'
import { getUsersDetails, addNewReading } from "../../features/user/ClientsActions";
import { useDispatch } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import { useLocation } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { FaUserPlus, FaPlusSquare } from "react-icons/fa";
import AddNewMeterReading from '../../components/modal/AddNewMeterReading';
import Modal from "../../components/modal/modal";
import Swal from "sweetalert2";

function UserDetails() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [recordData, setrecordData] = useState([]);
  const location = useLocation();
  const [showModalNew, setshowModalNew] = useState(false)
  const [currentSelectedUser, setcurrentSelectedUser] = useState({})
  const [recorded, setrecorded] = useState(false)

  function updateModal(value) {
    setshowModalNew(false)
  }
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setmodalContent] = useState(null)

  // Access the passed props
  const myProp = location.state && location.state.user;
  const [users, setUsers] = useState(myProp)

  useEffect(() => {

    dispatch(getUsersDetails(users.meter_number)).unwrap()
      .then((payload) => {

        setrecordData((prev) => payload.readings);
        setLoading(false)
        const latest = recordData.find((data) => {
          let thedate = new Date(data.date)
          let thedateyear = thedate.getFullYear()
          let thedatemonth = thedate.getMonth()
          let todaydate = new Date()
          let todaydateyear = todaydate.getFullYear()
          let todaydatemonth = todaydate.getMonth()

          if (thedateyear == todaydateyear && thedatemonth == todaydatemonth) {
            console.log("asda");
            return data
          }
        });
        if(latest){
          console.log(latest);
          setrecorded(true)

        }

      });

  }, []);

  const data = React.useMemo(() => recordData, [recordData])

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
      Header: "Reading",
      accessor: "reading"
    },
    {
      Header: "Billed",
      accessor: "billed",
      Cell: ({ value }) => value ? "Yes" : "No", // Display "Yes" for true and "No" for false

    }
  ], []);

  function handleMeterReadingAdd(data) {

    const todayDate = new Date();

    const addReading = {
      "meter_number": users.meter_number,
      "meter_reading": data.new_meter,
      "date": todayDate
    }
    setLoading(true)
    dispatch(addNewReading(addReading)).unwrap()
      .then((payload) => {
        setLoading((prev) => false)
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

  function handleNewClick() {
    setshowModalNew(true)
    setModalTitle("Add New Meter Reading")
    setmodalContent(<AddNewMeterReading handleMeterReadingAdd={handleMeterReadingAdd} />)
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
          <>
            {recorded ?
              (<p>
                This months bill already recorded you can update or delete one of it
              </p>)
              :
              (<>
                <button onClick={handleNewClick} className="flex items-center gap-3 rounded-md m-2 p-2 bg-violet-500">
                  Add Meter record
                  <FaPlusSquare />
                </button>
              </>)
            }

          </>
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
          title={modalTitle}
          setshowModalNew={updateModal}
        >
          {modalContent}
        </Modal>
      ) : null}
    </div>
  )
}

export default UserDetails