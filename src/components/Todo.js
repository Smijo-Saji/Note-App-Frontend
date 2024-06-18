import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addTodo,
  deleteTodo,
  getTodo,
  sortTodo,
  sortTodoAsc,
  sortTodoDesc,
  updateTodo,
} from "../Redux/todoSlice";
import axios from "axios";
import { base_url } from "../Redux/base_url";

function Todo() {
  const [sortLabel, setSortLabel] = useState("Sort By");

  const dispatch = useDispatch();
  const { todo, loading, error } = useSelector((state) => state.app);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
    setDetails({
      title: "",
      description: "",
      deadline: "",
      category: "",
    });
  };
  const handleShow1 = () => {
    setSelectedCheckbox(false); // Clear checkboxes when opening the add modal
    setShow1(true);
  };

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
    setDetails({
      title: "",
      description: "",
      deadline: "",
      category: "",
    });
  };
  const handleShow3 = () => setShow3(true);

  const [selectedCheckbox, setSelectedCheckbox] = useState(false);

  const [details, setDetails] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  });
  console.log(details);
  const setDatas = (e) => {
    let { value, name } = e.target;
    if (name === "category") {
      setSelectedCheckbox(value);
      setDetails((prevDetails) => {
        const newDetails = { ...prevDetails, [name]: value };
        return newDetails;
      });
    } else {
      setDetails((prevDetails) => {
        const newDetails = { ...prevDetails, [name]: value };
        return newDetails;
      });
    }
  };

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleadd = () => {
    let { title, description, deadline, category } = details;
    if (!title || !description || !deadline || !category) {
      toast.warn("Please Fil All Datas!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      dispatch(addTodo(details));
      toast.success("Successfully Addded", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      handleClose1();
      setDetails({
        title: "",
        description: "",
        deadline: "",
        category: "",
      });
    }
  };

  const handledelete = (id) => {
    dispatch(deleteTodo(id));
    toast.error("Deleted Successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    alert("deleted");
  };

  const [singleData, setSingleData] = useState({});
  const setEditDatas = (e) => {
    let { value, name } = e.target;
    setSingleData((prevDetails) => {
      const newDetails = { ...prevDetails, [name]: value };
      return newDetails;
    });
    if (name === "category") {
      setSelectedCheckbox(value);
    }
  };

  const handleedit = async (id) => {
    const data = await axios.get(`${base_url}/todo/${id}`);
    setSingleData(data.data);
    setSelectedCheckbox(data.data.category); // Set the selected checkbox
    handleShow3();
  };
  const handleupdate = () => {
    dispatch(updateTodo(singleData));
    toast.success("Updated Successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    handleClose3();
  };

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];

    const dateInput = document.getElementsByName("deadline")[0];

    if (dateInput) {
      dateInput.setAttribute("min", today);
    }
  }, [show1, show3]);

  const sortCards = (value) => {
    if (value == "All") {
      dispatch(getTodo());
    } else {
      dispatch(sortTodo(value));
    }
  };

  const sbtn = document.querySelectorAll(".sort-btn");
  sbtn.forEach((ele) => {
    ele.addEventListener("click", () => {
      const activeBtn = document.querySelector(".sort-btn-active");
      if (activeBtn) {
        activeBtn.classList.remove("sort-btn-active");
      }
      ele.classList.add("sort-btn-active");
    });
  });

  const handleAscSort = () => {
    dispatch(sortTodoAsc());
    setSortLabel("Asc");
  };

  const handleDescSort = () => {
    dispatch(sortTodoDesc());
    setSortLabel("Des");
  };
  return (
    <>
      <div
        className="button takenote-sec d-flex align-items-center gap-2 mb-3"
        onClick={handleShow1}
      >
        <img
          src="https://i.postimg.cc/59ghwKXY/360-F-598235670-Dl981-Yv8-AQAf2rks-Nk-W2slst-Lx-ZWEFo-R.jpg"
          alt=""
        />
        <div className="button-details">
          <div className=" d-flex">
            <img src="https://i.postimg.cc/XJWFdqPf/image-19.png" alt="" />
            <p
              style={{ fontSize: "10px", fontWeight: "700" }}
              className="ms-2 m-0"
            >
              Take Note
            </p>
          </div>
          <b>Take a Note</b>
        </div>
      </div>

      <div className="todo-sec  rounded shadow p-3 pt-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <b className="text-todo">To-Do</b>
          <div className="d-flex gap-3 ms-5 sort-btn-div">
            <button
              className="sort-btn sort-btn-active"
              onClick={() => sortCards("All")}
            >
              All
            </button>
            <button className="sort-btn " onClick={() => sortCards("Home")}>
              Home
            </button>
            <button className="sort-btn" onClick={() => sortCards("Office")}>
              Office
            </button>
            <button className="sort-btn" onClick={() => sortCards("School")}>
              School
            </button>
            <button className="sort-btn" onClick={() => sortCards("Others")}>
              Others
            </button>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <img
                src="https://i.postimg.cc/d3tYm2sY/filter-icon-2048x1617-97le7v6v.png"
                alt=""
                className="filter-icon"
              />
              {sortLabel}
            </button>
            <div className="dropdown-content">
              <button className="sort-btn" onClick={handleAscSort}>
                Asc
              </button>
              <button className="sort-btn" onClick={handleDescSort}>
                Des
              </button>
            </div>
          </div>
        </div>
        <div className="cards-sec d-flex justify-content-center flex-wrap gap-3">
          {!loading ? (
            todo.length > 0 ? (
              todo?.map((i) => (
                <Card
                  className="border-0 card-sec-div  text-black shadow"
                  key={i.id}
                  style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <p
                        className="category-div m-0"
                        style={{
                          backgroundColor:
                            i.category === "Home"
                              ? "#bbf264"
                              : i.category === "Office"
                              ? "#7dd1fc"
                              : i.category === "School"
                              ? "#fcab4d"
                              : "#dbb4fe",
                        }}
                      >
                        {i.category}
                      </p>
                      <div className="icon-eddlt d-flex gap-3 ">
                        <img
                          src="https://i.postimg.cc/90W7C9Gs/edit-246.png"
                          alt="edit"
                          onClick={() => handleedit(i.id)}
                        />
                        <img
                          src="https://i.postimg.cc/cJtfdjH3/free-delete-736-470378.png"
                          alt="dlt"
                          onClick={() => handledelete(i.id)}
                        />
                      </div>
                    </div>
                    <p className="title-text">{i.title}</p>
                    <p className="category-text">{i.description}</p>
                    <div className="d-flex justify-content-end ">
                      <p className="deadline-text">{i.deadline}</p>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <img
                src="https://i.postimg.cc/FRV8f9z7/59727218100.png"
                alt="no-record"
                style={{ width: "300px" }}
              />
            )
          ) : (
            <div className="boxes mt-5">
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header>
          <Modal.Title>Add To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={(e) => {
                setDatas(e);
              }}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              rows={3}
              className="form-control"
              onChange={(e) => {
                setDatas(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="title">Dead-line</label>
            <input
              type="date"
              name="deadline"
              id=""
              placeholder="DeadLine"
              className="form-control"
              onChange={(e) => {
                setDatas(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex align-items-center">
                <label htmlFor="home">Home</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Home"
                  className="mt-1 ms-2"
                  checked={selectedCheckbox === "Home"}
                  onChange={(e) => {
                    setDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="office">Office</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Office"
                  className="mt-1 ms-2"
                  checked={selectedCheckbox === "Office"}
                  onChange={(e) => {
                    setDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="school">School</label>
                <input
                  type="checkbox"
                  name="category"
                  value="School"
                  className="mt-1 ms-2"
                  checked={selectedCheckbox === "School"}
                  onChange={(e) => {
                    setDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="others">Others</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Others"
                  className="mt-1 ms-2"
                  checked={selectedCheckbox === "Others"}
                  onChange={(e) => {
                    setDatas(e);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleadd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit modal */}

      <Modal show={show3} onHide={handleClose3} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              id=""
              className="form-control"
              onChange={(e) => {
                setEditDatas(e);
              }}
              defaultValue={singleData.title}
            />
          </div>

          <div>
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              name="description"
              id=""
              rows={3}
              className="form-control"
              onChange={(e) => {
                setEditDatas(e);
              }}
              defaultValue={singleData.description}
            />
          </div>
          <div>
            <label htmlFor="title">Dead-line</label>
            <input
              type="date"
              name="deadline"
              id=""
              placeholder="DeadLine"
              className="form-control"
              onChange={(e) => {
                setEditDatas(e);
              }}
              defaultValue={singleData.deadline}
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex align-items-center">
                <label htmlFor="home">Home</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Home"
                  className="mt-1 ms-2"
                  checked={singleData.category === "Home"}
                  onChange={(e) => {
                    setEditDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="office">Office</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Office"
                  className="mt-1 ms-2"
                  checked={singleData.category === "Office"}
                  onChange={(e) => {
                    setEditDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="school">School</label>
                <input
                  type="checkbox"
                  name="category"
                  value="School"
                  className="mt-1 ms-2"
                  checked={singleData.category === "School"}
                  onChange={(e) => {
                    setEditDatas(e);
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="others">Others</label>
                <input
                  type="checkbox"
                  name="category"
                  value="Others"
                  className="mt-1 ms-2"
                  checked={singleData.category === "Others"}
                  onChange={(e) => {
                    setEditDatas(e);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Todo;
