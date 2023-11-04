import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllUsers,
  searchAllUsers,
  updateUsers,
} from "../../features/user/ClientsActions";
import ReactPaginate from "react-paginate";
import { SearchBar } from "../../components/searchbar/searchBar";
import Modal from "../../components/modal/modal";
import EditUserForm from "../../components/modal/EditUser";
import { LineWave } from "react-loader-spinner";
import { FaUserPlus } from "react-icons/fa";
import AddUser from "../../components/modal/AddUser";
import Swal from "sweetalert2";
import DifferentCollection from "../../components/modal/DifferentCollection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalNew, setshowModalNew] = useState(false);
  const [currentSelectedUser, setcurrentSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalContent, setmodalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  
  useEffect(() => {
    if (search == "") {
      dispatch(getAllUsers(currentPage))
        .unwrap()
        .then((payload) => {
          setUsers(payload.users);
          setTotalPages(payload.totalPages);
          setCurrentPage(payload.currentPage);
          setLoading(false)
        });
    }
  }, [loading, currentPage]);

  const pageCount = totalPages;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  function formatDate(date) {
    const today = new Date(date);
    return `${today.getFullYear()}-${today.getUTCMonth() + 1}-${today.getDate()}`;
  }

  useEffect(() => {
    if (search == "") {
      setLoading(true)

      dispatch(getAllUsers(1))
        .unwrap()
        .then((payload) => {
          setUsers(payload.users);
          setTotalPages(payload.totalPages);
          setCurrentPage(payload.currentPage);
          setLoading(false)
        });
    } else {

      dispatch(searchAllUsers({ search: search, page: currentPage }))
        .unwrap()
        .then((payload) => {
          console.log(payload.users);
          setUsers(payload.users);
          setTotalPages(payload.totalPages);
          setCurrentPage(payload.currentPage);

        });
    }
  }, [search]);

  function updateSearch(value) {
    setSearch(value);
  }
  function selectedChoice(choice, user) {
    // setshowModalNew(false)
    if (choice == "Edit") {
      setModalTitle((prev) => {
        return "Edit";
      });
      setmodalContent(
        <EditUserForm currentSelectedUser={user} updateUsers={updateUser} />
      );
    }

    if (choice == "ViewReading") {
      navigate("/UsersDetails", { state: { user: user } });
    }

    if (choice == "Payments") {
      navigate("/UserPayments", { state: { user: user } });
    }

    if (choice == "Bills") {
      navigate("/Bills", { state: { user: user } });
    }
  }
  const handleUserClick = (curruser) => {
    setcurrentSelectedUser(() => {
      return curruser;
    });
    setModalTitle(() => {
      return "Choose Input";
    });
    console.log(currentSelectedUser);
    setshowModalNew(true);
    setmodalContent(
      <DifferentCollection user={curruser} selectedChoice={selectedChoice} />
    );
  };

  function updateModal(value) {
    setshowModalNew(false);
  }

  function AddNewUser(params) {
    console.log(params);
  }

  function handleNewClick(params) {
    setshowModalNew(true);

    setmodalContent(<AddUser AddNewUser={AddNewUser} />);
  }

  function updateUser(params) {
    setshowModalEdit(false);
    setLoading(true);
    dispatch(updateUsers(params))
      .unwrap()
      .then((payload) => {
        setLoading(false);
        Swal.fire("Record Updated", `${payload.success}`, "success");
      })
      .catch((error) => {
        Swal.fire(
          "Update Failed",
          `An error occurred: ${error.message}`,
          "error"
        );
        setLoading(false);
      });
  }

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
          <div className="flex ">

            <SearchBar className="p-16" updateSearch={updateSearch}></SearchBar>

            <button
              onClick={handleNewClick}
              className="flex items-center gap-3 rounded-md m-2 p-2 bg-violet-500"
            >
              Add New Client
              <FaUserPlus />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-sm font-mono text-left text-black"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-sm font-mono text-left text-black"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-sm font-mono text-left text-black"
                        >
                          Meter Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-sm font-mono text-right text-black"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-mono text-right text-black"
                        >
                          Date Connected
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-mono text-right text-black"
                        >
                          Areas
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td>
                            <LineWave color="blue" />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {users &&
                            users.map(function (user, i) {
                              return (
                                <tr
                                  key={i}
                                  onClick={() => handleUserClick(user)}
                                >
                                  <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
                                    {user.name}
                                  </td>
                                  <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
                                    {user.phone_number}
                                  </td>
                                  <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
                                    {user.meter_number}
                                  </td>
                                  <td className="px-6 py-4 text-sm font-mono font-medium text-right whitespace-nowrap">
                                    <a
                                      className="text-green-500 hover:text-green-700"
                                      href="#"
                                    >
                                      {user.status ? "Active" : "Not active"}
                                    </a>
                                  </td>
                                  <td className="px-6 py-4 text-sm font-mono text-right whitespace-nowrap">
                                    {formatDate(user.date_connected)}
                                  </td>
                                  <td className="px-6 py-4 text-sm font-mono text-right whitespace-nowrap">
                                    {user.arears}
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="">
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

          {showModalNew && currentSelectedUser ? (
            <Modal title={modalTitle} setshowModalNew={updateModal}>
              {modalContent}
            </Modal>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Home;
