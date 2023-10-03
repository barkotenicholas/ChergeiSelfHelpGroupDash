import React, { useEffect, useState, useMemo } from 'react'
import { getUsersPayments } from "../../features/user/ClientsActions";
import { useDispatch } from 'react-redux';
import { useTable , usePagination  , useSortBy} from 'react-table';
import { useLocation } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import { IoCaretDown,  IoCaretUp } from "react-icons/io5";
function UsersPayments() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordData, setrecordData] = useState([]);
  const location = useLocation();

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
    }
  ], []);

  console.log(data);
  console.log(columns);


  const { getTableBodyProps, 
    getTableProps,
     headerGroups,
     page, 
     nextPage,
     previousPage ,
     pageOptions ,
     state,
     canNextPage, 
     canPreviousPage , 
     gotoPage, 

     pageCount ,
     prepareRow  } = useTable({ columns, data: data },useSortBy,usePagination);

  const {pageIndex} = state
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
        <p>

        </p>
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
                                  {column.isSorted ? (column.isSortedDesc ? <IoCaretUp/>:<IoCaretDown/>):""}
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

                    <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>
                      {'<<'}
                    </button>
                    <button onClick={()=> previousPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" disabled={!canPreviousPage}>
                      Prev
                    </button>
                    <button onClick={()=> nextPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" disabled={!canNextPage}>
                      Next
                    </button>

                    <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>
                      {'>>'}
                    </button>
                  </div>
                </div>
          </div>
        </div>
      </>
    }

  </div>  )
}

export default UsersPayments