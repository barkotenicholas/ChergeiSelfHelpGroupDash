import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getAllUsers ,searchAllUsers } from "../../features/user/ClientsActions";
import ReactPaginate from 'react-paginate';
import { SearchBar } from "../../components/searchbar/searchBar";
import Modal from "../../components/modal/modal";
import EditUserForm from "../../components/modal/EditUser";



const Home = () => {

  const dispatch = useDispatch()

  const [users,setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [currentSelectedUser, setcurrentSelectedUser] = useState(null)
  useEffect(() => {
    if(search == ""){
      dispatch(getAllUsers(currentPage)).unwrap()
      .then((payload)=>{
  
        setUsers(payload.users)
        setTotalPages(payload.totalPages)
        setCurrentPage(payload.currentPage)
  
      });
    }
  }, [currentPage])

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const pageCount = totalPages
  console.log(pageCount);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected+1);
  };
  function formatDate (date){
    const a = new Date(date)
    return  `${a.getFullYear()}-${a.getUTCMonth() + 1}-${a.getDate()}`
  }

  useEffect(() => { 
    if(search == ""){

    }else{
      dispatch(searchAllUsers({search:search.search,page:currentPage})).unwrap()
      .then((payload)=>{
        console.log(payload.users);
        setUsers(payload.users)
        setTotalPages(payload.totalPages)
        setCurrentPage(payload.currentPage)
  
      });    
    }

  }, [search,currentPage])
  
  function updateSearch(value){
    setSearch(value)
  }

  function handleUserClick(user){
    setcurrentSelectedUser(user)
    setshowModal(true)
    }

  function updateModal(value){
    setshowModal(false)
  }

  
 

  return (
  <>
      <>
        <SearchBar className="p-16" updateSearch={updateSearch}  >

        </SearchBar>
      </>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Meter Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Date Connected
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Areas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <>
                  {users && users.map(function(user,i) {
                    return (
                      <tr key={i} onClick={()=> handleUserClick(user)}>  
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.phone_number}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {user.meter_number}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a className="text-green-500 hover:text-green-700" href="#">
                          {user.status ? "Active" : "Not active"}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {formatDate(user.date_connected)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {user.arears}
                        </td>
                    </tr>
                    )
                  })}
                  </>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>  
    
      <div className="" >
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageRangeDisplayed={1}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>

      {showModal && currentSelectedUser ? (
        <Modal
         setshowModal={updateModal} 
        >

          <EditUserForm currentSelectedUser={currentSelectedUser} />

        </Modal>
      ):null}
  </>
    );
};

export default Home;