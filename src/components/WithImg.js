import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  createwithImg,
  deletewithImg,
  editwithImg,
  showwithImg,
} from "../Redux/withImgSlice";
import axios from "axios";
import { base_url } from "../Redux/base_url";
import { Toaster, toast } from "sonner";

function WithImg() {
  const [show2, setShow2] = useState(false);
  const [fieldData, setFieldData] = useState({
    imgUrl: "",
    title: "",
  });

  const [show4, setShow4] = useState(false);
  const [singleField, setSingleField] = useState({
    imgUrl: "",
    title: "",
  });
  const [editFieldData, setEditFieldData] = useState({ imgUrl: "", title: "" });

  const dispatch = useDispatch();
  const { withImg, loading, error } = useSelector((state) => state?.Img);

  const handleClose2 = () => {
    setShow2(false);
    setFieldData({ imgUrl: "", title: "" });
  };
  const handleShow2 = () => setShow2(true);

  const handleClose4 = () => {
    setShow4(false);
    setFieldData({ imgUrl: "", title: "" });
  };
  const handleShow4 = () => setShow4(true);

  const setData = (e) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  const handleAdd = () => {
    let { imgUrl, title } = fieldData;
    if (!imgUrl || !title) {
      // toast.warn("Please Fil All Datas!", {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
      toast.warning("Please Fil All Datas!");
    } else {
      dispatch(createwithImg(fieldData));
      // toast.success("Successfully Addded", {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
      toast.success("Successfully Addded");
      handleClose2();
      setFieldData({ imgUrl: "", title: "" });
    }
  };

  const handledelete = (id) => {
    dispatch(deletewithImg(id));
    // toast.error("Deleted Successfully", {
    //   position: "bottom-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });
    toast.success("Deleted Successfully");
  };

  useEffect(() => {
    dispatch(showwithImg());
  }, []);

  const handleeditmodal = async (id) => {
    const response = await axios.get(`${base_url}/withImg/${id}`);
    setSingleField(response.data);
    setEditFieldData(response.data);
    handleShow4();
  };

  const setEditData = (e) => {
    const { name, value } = e.target;
    setEditFieldData({ ...editFieldData, [name]: value });
  };
  const handleupdate = () => {
    dispatch(editwithImg(editFieldData));
    // toast.success("Updated Successfully", {
    //   position: "bottom-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });
    toast.success("Updated Successfully");
    handleClose4();
  };

  return (
    <>
      {" "}
      <div
        className="button withimg-sec  d-flex align-items-center gap-2 mb-3"
        onClick={handleShow2}
      >
        <img
          src="https://i.postimg.cc/g2XnZZk5/premium-picture-icon-logo-line-260nw-749843887.png"
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
          <b>With Image</b>
        </div>
      </div>
      <div className="note-sec  rounded shadow p-3 pt-4 d-flex flex-column ">
        {/* <b className="ms-3 text-withImg">Notes</b> */}
        <div className="ms-3 text-withImg align-self-start fw-bold">Notes</div>
        <div className="card-with-img d-flex justify-content-center flex-wrap gap-3 ">
          {!loading ? (
            withImg.length > 0 ? (
              withImg.map((i) => (
                <div className="card-withImg" key={i.id}>
                  <img src={i.imgUrl} alt="" />
                  <div className="card__content d-flex flex-column justify-content-between">
                    <p className="card__title text-white">{i.title}</p>

                    <div className="icon-eddlt  d-flex justify-content-between">
                      <img
                        src="https://i.postimg.cc/L5rCwcx5/download-removebg-preview-7.png"
                        alt="Edit"
                        onClick={() => handleeditmodal(i.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        src="https://i.postimg.cc/tCzDhv6h/325437.png"
                        alt="Delete"
                        onClick={() => handledelete(i.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
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
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header>
          <Modal.Title>Add Note With Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="">Image-Url</label>
            <input
              type="text"
              className="form-control mt-1"
              name="imgUrl"
              onChange={setData}
            />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control mt-1"
              name="title"
              onChange={setData}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit */}
      <Modal show={show4} onHide={handleClose4} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Note With Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="">Image-Url</label>
            <input
              type="text"
              className="form-control mt-1"
              name="imgUrl"
              onChange={setEditData}
              defaultValue={singleField.imgUrl}
            />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control mt-1"
              name="title"
              onChange={setEditData}
              defaultValue={singleField.title}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <ToastContainer /> */}
      <Toaster richColors />
    </>
  );
}

export default WithImg;
