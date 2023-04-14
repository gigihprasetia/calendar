import Modal from "@/components/Modal";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [dayCalender, setDayCalender] = useState({ status: false, cal: [] });
  const [select, setSelect] = useState({
    activate: false,
    id: null,
    date: null,
    color: "white",
  });
  const [isSave, setIsSave] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const color = [
    "55, 48, 107",
    "102, 52, 127",
    "158, 71, 132",
    "210, 118, 133",
    "11, 36, 71",
    "25, 55, 109",
    "87, 108, 188",
    "165, 215, 232",
    "210, 19, 18",
    "237, 43, 42",
    "241, 90, 89",
  ];
  useEffect(() => {
    // Mendapatkan jumlah hari dalam bulan ini
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Mendapatkan tanggal pertama dalam bulan ini
    const firstDay = new Date(year, month, 1).getDay();

    // Membuat array untuk menampung tanggal dalam bulan ini
    const calendar = [];
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push({
            date: 0,
            isToday: "empty",
            eventDate: [],
            colorPrimary: color[Math.floor(Math.random() * 10)],
          });
        } else if (date > daysInMonth) {
          break;
        } else {
          const isToday = date === today.getDate();
          week.push({
            date: date,
            isToday: isToday,
            eventDate: [],
            colorPrimary: color[Math.floor(Math.random() * 10)],
          });
          date++;
        }
      }
      calendar.push(week);
      if (date > daysInMonth) {
        break;
      }
    }

    if (window) {
      setDayCalender({
        status: true,
        cal: JSON.parse(localStorage.getItem("dataEvent")),
      });
      if (localStorage.getItem("dataEvent") === null) {
        localStorage.setItem("dataEvent", JSON.stringify(calendar.flat()));
      }
    } else {
      setDayCalender({
        status: true,
        cal: JSON.parse(window.localStorage.getItem("dataEvent")),
      });
      if (window.localStorage.getItem("dataEvent") === null) {
        window.localStorage.setItem(
          "dataEvent",
          JSON.stringify(calendar.flat())
        );
      }
    }
  }, [isSave]);

  const day = ["Senin", "Selasa", "Rabu", "kamis", "Jum'at", "Sabtu", "Minggu"];

  return (
    <div className="w-10/12 mx-auto  pb-10">
      <p className="text-xl font-bold text-blue-400 border-b-2 border-blue-400 my-10">
        {moment().format("MMMM")}
      </p>
      <div className="grid  grid-cols-7 gap-2  mb-2">
        {day.map((val, index) => {
          return (
            <div className="border-b-2 border-black" key={index}>
              <p>{val}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-4 grid-cols-7 gap-2">
        {dayCalender.cal.map((val, index) => {
          // console.log(val);
          return (
            <div
              style={
                val.date === 0
                  ? { backgroundColor: "rgba(178, 178, 178,1)" }
                  : val.eventDate.length != 0
                  ? { backgroundColor: `rgba(${val.colorPrimary},0.9)` }
                  : val.date >= today.getDate()
                  ? {
                      backgroundColor: "rgba(178, 178, 178,0.1)",
                    }
                  : {
                      backgroundColor: "rgba(178, 178, 178,0.5)",
                    }
              }
              className={`
            
               h-28 p-1 border-2 ${
                 val.isToday === true ? "border-black" : "border-gray-600"
               } hover:scale-105 duration-150 cursor-pointer`}
              key={index}
              onClick={() => {
                const today = new Date();

                if (parseInt(val.date) >= parseInt(today.getDate())) {
                  setSelect({
                    ...select,
                    activate: true,
                    id: index,
                    date: val.date,
                    color: `rgba(${val.colorPrimary},0.7)`,
                  });
                } else {
                  alert("can`t write events out of date");
                }
              }}
            >
              <div
                className={`flex w-full justify-between items-center text-black border-b-2 ${
                  val.isToday === true ? "border-black" : "border-gray-700"
                } `}
              >
                <p className={`text-xs font-bold animate-pulse`}>
                  {val.isToday === true ? "Today" : ""}
                </p>
                <p
                  className={`text-xs font-bold ${
                    val.isToday === true ? "text-black" : "text-gray-700"
                  } `}
                >
                  {val.date === 0 ? "" : val.date}
                </p>
              </div>

              <div className="text-xs overflow-auto  h-20 p-1">
                {val.eventDate.map((event, index) => {
                  return (
                    <p className="mb-3 w-9/12 font-bold  p-1">
                      Title: {event.name} <br /> pukul {event.time}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {select.activate ? (
        <Modal
          isSave={isSave}
          setIsSave={setIsSave}
          // onClose={() => {
          //   setSelect({
          //     ...select,
          //     activate: !select.activate,
          //     id: null,
          //     date: null,
          //   });
          // }}

          select={select}
          setSelect={setSelect}
          data={select}
        />
      ) : null}
    </div>
  );
};

export default Home;
