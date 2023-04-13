import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const Modal = ({ select, setSelect, data, isSave, setIsSave }) => {
  const [value, onChange] = useState("10:00");
  const dataEvent = JSON.parse(localStorage.getItem("dataEvent"));
  const [input, setInput] = useState({
    isUpdate: "",
    name: "",
    time: "10:00",
    inviteEmail: "",
    eventDescription: "",
  });
  const [eventTemp, setEventTemp] = useState([]);

  useEffect(() => {
    const dataEventTemp = [...dataEvent];
    let filterSelect = dataEventTemp.filter((val) => {
      return val.date === data.date;
    });

    // console.log(filterSelect);
    setEventTemp(filterSelect[0].eventDate);
  }, []);

  function handleSubmit() {
    // const dataEventTemp = [...dataEvent];

    // let filterNotSelect = dataEventTemp.filter((val) => {
    //   return val.date != data.date;
    // });

    // let filterSelect = dataEventTemp.filter((val) => {
    //   return val.date === data.date;
    // });

    // filterSelect[0].eventDate.push(input);

    if (eventTemp.length === 3) {
      alert("max event 3 item");
    } else {
      //   setEventTemp([...eventTemp, ...filterSelect[0].eventDate]);
      setEventTemp([
        ...eventTemp,
        {
          name: input.name,
          time: input.time,
          inviteEmail: input.inviteEmail,
          eventDescription: input.eventDescription,
        },
      ]);
    }

    // console.log(input);
  }

  function handleSave() {
    const dataEventTemp = [...dataEvent];
    let getIndex;

    let filterNotSelect = dataEventTemp.filter((val) => {
      return val.date != data.date;
    });

    let filterSelect = dataEventTemp.filter((val) => {
      return val.date === data.date;
    });
    dataEventTemp.forEach((val, index) => {
      if (val.date === data.date) {
        getIndex = index;
      }
    });
    // console.log(getIndex);
    filterSelect[0].eventDate = eventTemp;

    filterNotSelect.splice(getIndex, 0, filterSelect[0]);

    localStorage.setItem("dataEvent", JSON.stringify(filterNotSelect));

    setSelect({
      ...select,
      activate: !select.activate,
      id: null,
      date: null,
    });

    setIsSave(!isSave);
  }

  function HandleDelete(identity, id) {
    const deleteFilter = eventTemp.filter((val, index) => {
      return val.name != identity.name && id != index;
    });

    setEventTemp(deleteFilter);
  }

  function HandleUpdate() {
    // console.log(input);
    const updateFilter = eventTemp.filter((val, index) => {
      return val.name != input.name && input.isUpdate != index;
    });
    updateFilter.push({
      name: input.name,
      time: input.time,
      inviteEmail: input.inviteEmail,
      eventDescription: input.eventDescription,
    });
    // console.log(updateFilter);
    setEventTemp(updateFilter);
    setInput({
      isUpdate: "",
      name: "",
      time: "10:00",
      inviteEmail: "",
      eventDescription: "",
    });
  }

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="fixed flex justify-center items-center  w-full top-0  left-0 h-screen "
    >
      <div className="w-9/12 flex flex-col  h-screen overflow-auto bg-white text-sm p-5">
        <div className=" flex w-full justify-between">
          <p className="text-lg font-bold text-blue-400">
            {" "}
            Create Your Own Event In Date
            <br /> {data.date} {moment().format("MMMM  YYYY")}{" "}
          </p>
          <div onClick={handleSave}>
            <AiFillCloseCircle color="red" size={30} />
          </div>
        </div>
        <div className="w-1/2 text-sm">
          <div className="mt-2">
            <p className="font-bold text-blue-400">Name</p>
            <input
              onChange={(e) => {
                setInput({
                  ...input,
                  name: e.target.value,
                });
              }}
              className="outline outline-1 outline-gray-500 p-1 w-full rounded-sm"
              placeholder="nama"
              value={input.name}
            />
          </div>
          <div className="mt-2">
            <p className="font-bold text-blue-400">Time</p>
            <TimePicker
              onChange={(e) => {
                setInput({
                  ...input,
                  time: e,
                });
              }}
              value={input.time}
            />
          </div>
          <div className="mt-2">
            <p className="font-bold text-blue-400">invite Email</p>
            <input
              className="outline outline-1 outline-gray-500 p-1 w-full rounded-sm"
              placeholder="invite Email "
              onChange={(e) => {
                setInput({
                  ...input,
                  inviteEmail: e.target.value,
                });
              }}
              value={input.inviteEmail}
            />
          </div>
          <div className="mt-2">
            <p className="font-bold text-blue-400">Event Description</p>
            <textarea
              className="outline outline-1 outline-gray-500 p-1 w-full rounded-sm"
              placeholder="Event descrobe"
              value={input.eventDescription}
              onChange={(e) => {
                setInput({
                  ...input,
                  eventDescription: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex justify-around mt-5 font-bold text-white">
            {input.isUpdate === "" ? (
              <button
                onClick={handleSubmit}
                className="bg-blue-500 px-2 py-1 rounded-sm "
              >
                Push To List
              </button>
            ) : (
              <button
                className="bg-blue-500 px-2 py-1 rounded-sm "
                onClick={HandleUpdate}
              >
                Update List
              </button>
            )}
            <button className="bg-red-500 px-2 py-1 rounded-sm ">Cencel</button>
          </div>
        </div>
        <div className="w-full  ">
          {eventTemp.map((val, index) => {
            console.log(data.color);
            return (
              <div className="text-xs w-full  my-10  border-blue-300 ">
                <div
                  style={{
                    backgroundColor: data.color,
                  }}
                  className="flex w-full p-2 justify-between items-center bg-blue-600 rounded-t-md"
                >
                  <div className="font-bold text-white">
                    <p>{val.name}</p>
                    <p className="font-thin">{val.inviteEmail}</p>
                    <p className="font-thin text-white">pukul : {val.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-white">
                      <button
                        onClick={() => HandleDelete(val, index)}
                        className="bg-red-900 px-2 py-1 rounded-sm "
                      >
                        Delete
                      </button>

                      {input.isUpdate === index ? (
                        <button className="bg-blue-400 ml-5 px-2 py-1 rounded-sm ">
                          On Update
                        </button>
                      ) : (
                        <button
                          onClick={() => setInput({ isUpdate: index, ...val })}
                          className="bg-blue-900 ml-5 px-2 py-1 rounded-sm "
                        >
                          Go Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-gray-300">
                  <p className="font-bold text-blue-800">
                    {val.eventDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          className="bg-green-900 text-white px-2 py-1 rounded-sm mt-10"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
