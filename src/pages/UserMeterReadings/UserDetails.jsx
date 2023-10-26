import React, { useEffect, useState, useMemo } from "react";
import {
  getUsersDetails,
  addNewReading,
  updateMeterreading,
  billThisMonth,
} from "../../features/user/ClientsActions";
import { useDispatch } from "react-redux";
import { useTable, usePagination, useSortBy } from "react-table";
import { useLocation } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { FaUserPlus, FaPlusSquare } from "react-icons/fa";
import AddNewMeterReading from "../../components/modal/AddNewMeterReading";
import Modal from "../../components/modal/modal";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditMeterReading from "../../components/modal/EditMeterReading";

function UserDetails() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [recordData, setrecordData] = useState([]);
  const location = useLocation();
  const [showModalNew, setshowModalNew] = useState(false);
  const [currentSelectedUser, setcurrentSelectedUser] = useState({});
  const [recorded, setrecorded] = useState(false);
  const [latest_date, setLatest_date] = useState("");
  function updateModal(value) {
    setshowModalNew(false);
  }
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setmodalContent] = useState(null);

  // Access the passed props
  const myProp = location.state && location.state.user;
  const [users, setUsers] = useState(myProp);
  var latestdates;
  useEffect(() => {
    dispatch(getUsersDetails(users.meter_number))
      .unwrap()
      .then((payload) => {
        setrecordData((prev) => {
          return payload.readings;
        });
        console.log("data");

        console.log(recordData);
        if (payload.readings) {
          let latest_date = new Date(
            Math.max(...payload.readings.map((e) => new Date(e.date)))
          );
          console.log(latest_date);
          if (latest_date) {
            latestdates = latest_date;
            setLatest_date((latest_date) => latest_date);
          }
          const latest = payload.readings.find((data) => {
            const thedate = new Date(data.date);
            const todaydate = new Date();

            return (
              thedate.getFullYear() === todaydate.getFullYear() &&
              thedate.getMonth() === todaydate.getMonth()
            );
          });
          console.log(latest);
          if (latest) {
            console.log(latest);
            setrecorded((prev) => true);
          }
        }
      });
    setLoading(false);
  }, [users, loading]);

  const data = React.useMemo(() => recordData, [recordData]);

  function handleDelete(row) {
    console.log(row.original);
  }

  function handleMeterReadingEdit(newValue, oldValue) {
    setshowModalNew(false);
    console.log(newValue);
    console.log(oldValue);

    if (newValue.new_meter === oldValue) {
      console.log("same value");
    } else {
      const updateInfo = {
        meter_number: users.meter_number,
        meter_reading: newValue.new_meter,
      };
      console.log(updateInfo);
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
          console.log(error);
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

    setLoading(true)
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

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row, value }) => {
          const date = new Date(value);
          const isLatest = date.getTime() === new Date(latestdates).getTime();

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
      ,
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => {},
      },
    ],
    []
  );

  function handleMeterReadingAdd(data) {
    const todayDate = new Date();

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
      })
      .catch((error) => {
        Swal.fire(
          "Update Failed",
          `An error occurred: ${error.message}`,
          "error"
        );
        setLoading((prev) => false);
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
          color="#4fa94d"
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
            {recorded ? (
              <p className="flex items-center gap-3 rounded-md m-2 p-2 bg-violet-500">
                This months bill already recorded you can update or delete one
                of it
              </p>
            ) : (
              <>
                <button
                  onClick={handleNewClick}
                  className="flex items-center gap-3 rounded-md m-2 p-2 bg-violet-500"
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
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
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
                                className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
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
