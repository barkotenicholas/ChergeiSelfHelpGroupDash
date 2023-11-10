import React, { useEffect, useState, useMemo } from "react";
import {
  getUsersDetails,
  addNewReading,
  updateMeterreading,
  billThisMonth,
  getATSmsBalance,
  DeleteLatestMeterreading,
} from "../../features/user/ClientsActions";
import { useDispatch } from "react-redux";
import { useTable, usePagination, useSortBy } from "react-table";
import { useLocation } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import AddNewMeterReading from "../../components/modal/AddNewMeterReading";
import Modal from "../../components/modal/modal";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditMeterReading from "../../components/modal/EditMeterReading";

function UserDetails() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [recordData, setrecordData] = useState({data:[],latest:""});
  const location = useLocation();
  const [showModalNew, setshowModalNew] = useState(false);
  const [recorded, setrecorded] = useState(false);
  const [smsBalance, setsmsBalance] = useState(null);
  const [latest_date, setLatest_date] = useState("");
  function updateModal(value) {
    setshowModalNew(false);
  }
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setmodalContent] = useState(null);

  // Access the passed props
  const myProp = location.state && location.state.user;
  const [users, setUsers] = useState(myProp);
  let latestdates;


 

  useEffect(() => {
    dispatch(getATSmsBalance())
      .unwrap()
      .then((payload) => {
        setsmsBalance(payload.data.data.UserData.balance);
      });
    dispatch(getUsersDetails(users.meter_number))
      .unwrap()
      .then((payload) => {
        const reversedreading = payload.readings.reverse();
        setrecordData((prev) => {
          return {...prev,data:reversedreading};
        });

        if (payload.readings) {
          let latest_date = new Date(
            Math.max(...payload.readings.map((e) => new Date(e.date)))
          );

          if (latest_date) {
            latestdates = latest_date;
            setrecordData((prev) => {
              return {...prev,latest:latestdates};
            });

            setLatest_date((latest_date) => latest_date);
          }
        }
        const latest = payload.readings.find((data) => {
          const thedate = new Date(data.date);
          const todaydate = new Date();

          return (
            thedate.getFullYear() === todaydate.getFullYear() &&
            thedate.getMonth() === todaydate.getMonth()
          );
        });
        if (latest) {
          setrecorded(true);
        }else{
          setrecorded(false)
        }
      });
    setLoading(false);
  }, [loading]);

  const data = React.useMemo(() => recordData.data, [recordData.data,latestdates]);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row, value }) => {
          const date = new Date(value);

          const isLatest = date.getTime() === new Date(recordData.latest).getTime();
          return isLatest ? (
            <>
              <div className="mb-2">{date.toLocaleString()}</div>
              <div className="flex space-x-1">
                <FaEdit onClick={() => handleEdit(row)}>Edit</FaEdit>
                <FaTrashAlt onClick={() => handleDelete(row)}>
                  Delete
                </FaTrashAlt>
              </div>
            </>
          ) : (
            <>{date.toLocaleString()}</>
          );
        },
      },
      {
        Header: "Reading",
        accessor: "reading",
      },
      {
        Header: "Billed",
        accessor: "billed",
        Cell: ({ value }) => {
          if (value) {
            return (
              <>
                <p>Already Billed</p>
              </>
            );
          } else {
            return (
              <>
                <button
                  onClick={() => bill(value)}
                  className="text-white bg-gradient-to-r bg-violet-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:bg-violet-300 font-medium rounded-sm text-sm px-2 text-center mr-2 mb-2"
                >
                  Bill
                </button>
              </>
            );
          }
        }, // Display "Yes" for true and "No" for false
      },
    ],
    [recordData]
  );
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      cancelButton: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
    },
    buttonsStyling: false,
  });

  function handleDelete(row) {


    const data = {
      meter_number: users.meter_number,
      id: row.original._id,
    };

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          dispatch(DeleteLatestMeterreading(data))
            .unwrap()
            .then((payload) => {
              setshowModalNew(false)

              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: `${payload.message}`,
                icon: "success",
              });

            })
            .catch((error) => {
              setshowModalNew(false)

              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "File Deletion has been cancelled ",
                icon: "error",
              });


            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "File Deletion has been cancelled ",
            icon: "error",
          });
        }
      });
      setshowModalNew(false)

  }

  function handleMeterReadingEdit(newValue, oldValue) {
    setshowModalNew(false);

    if (newValue.new_meter === oldValue) {
      console.log("same value");
    } else {
      const updateInfo = {
        meter_number: users.meter_number,
        meter_reading: newValue.new_meter,
      };
      setLoading(true);

      dispatch(updateMeterreading(updateInfo))
        .unwrap()
        .then((payload) => {
          setLoading(false);
          Swal.fire("Message", `${payload.data.message}`, "success");
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire("Record Updated", `${error}`, "error");
        });
    }
  }

  function handleEdit(row) {
    setshowModalNew(true);
    setModalTitle("Edit Meter Reading");
    setmodalContent(
      <EditMeterReading
        existingreading={row.original.reading}
        handleMeterReadingEdit={handleMeterReadingEdit}
      />
    );
  }

  function bill(row) {
    setLoading(true);
    const bill = {
      meter_number: users.meter_number,
    };
    dispatch(billThisMonth(bill))
      .unwrap()
      .then((payload) => {
        setLoading(false);
        Swal.fire("Message", `${payload.data.message}`, "success");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire("Message", `${error}`, "error");
      });
  }

  function handleMeterReadingAdd(data) {
    const todayDate = new Date();

    let sms = Number(smsBalance.split(" ")[1])
    if(sms < 10 ){
      Swal.fire("S.M.S balance is low please update it", `please updatesms balance`, "info");
      return
    }
    const addReading = {
      meter_number: users.meter_number,
      meter_reading: data.new_meter,
      date: todayDate,
    };
    setLoading(true);
    dispatch(addNewReading(addReading))
      .unwrap()
      .then((payload) => {
        setLoading((prev) => false);
        Swal.fire("Record Updated", `${payload.message}`, "success");
        setshowModalNew(false)

      })
      .catch((error) => {
        Swal.fire(
          "Update Failed",
          `An error occurred: ${error.message}`,
          "error"
        );
        setLoading((prev) => false);
        setshowModalNew(false)

      });
  }

  function handleNewClick() {
    setshowModalNew(true);
    setModalTitle("Add New Meter Reading");
    setmodalContent(
      <AddNewMeterReading handleMeterReadingAdd={handleMeterReadingAdd} />
    );
  }

  const {
    getTableBodyProps,
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
    prepareRow,
  } = useTable({ columns, data: data }, useSortBy, usePagination);

  const { pageIndex } = state;
  return (
    <div>
      {loading ? (
        <LineWave
          height="100"
          width="100"
          color="#8B5CF6"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      ) : (
        <>
          <>
            <p className="flex items-center gap-3 rounded-md m-2 p-2 text-violet-500 border border-violet-500 ">
              SMS balance is {smsBalance}
            </p>
          </>
          <>
            {recorded ? (
              <p className="flex items-center gap-3 rounded-md m-2 p-2 text-violet-500 border border-violet-500">
                This months bill already recorded you can update or delete one of it.
              </p>
            ) : (
              <>
                <button
                  onClick={handleNewClick}
                  className="flex items-center gap-3 rounded-md m-2 p-2 text-violet-500 border border-violet-500"
                >
                  Add Meter record
                  <FaPlusSquare />
                </button>
              </>
            )}
          </>
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              {data && (
                <>
                  <table
                    className="min-w-full divide-y divide-gray-200"
                    {...getTableProps()}
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              className="px-6 py-3 text-xs font-mono text-left text-black"
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <IoCaretUp />
                                  ) : (
                                    <IoCaretDown />
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      className="divide-y divide-gray-200"
                      {...getTableBodyProps()}
                    >
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td
                                className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrapss"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
              <div className="m-5">
                <div className="inline-flex">
                  <span className="mr-2">
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>

                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {"<<"}
                  </button>
                  <button
                    onClick={() => previousPage()}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    disabled={!canPreviousPage}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => nextPage()}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    disabled={!canNextPage}
                  >
                    Next
                  </button>

                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {">>"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showModalNew ? (
        <Modal title={modalTitle} setshowModalNew={updateModal}>
          {modalContent}
        </Modal>
      ) : null}
    </div>
  );
}

export default UserDetails;
