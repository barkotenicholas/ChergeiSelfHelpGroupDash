import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleUserBill } from "../../features/user/ClientsActions";
import { LineWave } from "react-loader-spinner";
import { useTable, usePagination, useSortBy } from 'react-table';
import { useLocation } from 'react-router-dom';
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

function UserBills({ user }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  // Access the passed props
  const myProp = location.state && location.state.user;
  const [users, setUsers] = useState(myProp);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    dispatch(getSingleUserBill(users.meter_number))
      .unwrap()
      .then((payload) => {
        setBills(payload.data.bills);
        setLoading(false);
      });
  }, [loading]);

  const data = React.useMemo(() => bills, [bills]);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleString(); // Format the timestamp as a user-readable string
        },
      },
      {
        Header: "Bill",
        accessor: "bill",
      },
      {
        Header: "Amount consumed",
        accessor: "diff",
      },
    ],
    []
  );

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
  const { pageIndex } = state

  return (
    <>
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
                                  className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap"
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
                    <span className="mr-2 font-mono">
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>
                    </span>

                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                    </button>
                    <button
                      onClick={() => previousPage()}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l font-mono"
                      disabled={!canPreviousPage}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => nextPage()}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r font-mono"
                      disabled={!canNextPage}
                    >
                      Next
                    </button>

                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserBills;
