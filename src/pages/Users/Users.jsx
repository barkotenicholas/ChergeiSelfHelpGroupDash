import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getAllUsers ,searchAllUsers } from "../../features/user/ClientsActions";
import ReactPaginate from 'react-paginate';
import { SearchBar } from "../../components/searchbar/searchBar";
import Modal from "../../components/modal/modal";
import {useFormik} from 'formik'
import * as Yup from 'yup'



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

  
  const formik = useFormik({
    initialValues: {
      name: "",
      meter_number: "",
      phone_number: ""
    },
    validationSchema:Yup.object({
        email:Yup.string().email().required("Email is Required"),
        // password: Yup.string()
        // .required('Please Enter your password')
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // ), 
    }),
    onSubmit:(values)=>{

    }
  });


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

      {showModal ? (
        <Modal
         setshowModal={updateModal} 
         currentSelectedUser={currentSelectedUser}
        >
          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"/>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox"/>
                <span className="text-sm">
                  Send me your newsletter!
                </span>
              </label>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </Modal>
      ):null}
  </>
    );
};

export default Home;