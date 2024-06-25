import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function EventModel() {
  const { setShowEventModel, daySelected, selectedEvent, setSelectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : "blue"
  );
  const [starttime, setStarttime] = useState(
    selectedEvent ? selectedEvent.starttime : "empty"
  );
  const [endtime, setEndtime] = useState(
    selectedEvent ? selectedEvent.endtime : "empty"
  );
  const labelsClasses = ["indigo", "emerald", "blue", "red", "yellow"];
  const labelNames = ["Work", "Study", "Meeting", "Important", "Leisure"];

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      starttime,
      endtime,
    };
    if (selectedEvent) {
      try {
        const event_id = Number(selectedEvent.id);
        const res = await fetch(
          "http://localhost:5000/calendar/events/" + event_id,
          {
            method: "PUT",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        await res.json();
        setSelectedEvent(null);
        setShowEventModel(false);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        const res = await fetch("http://localhost:5000/calendar/events", {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        await res.json();
        setSelectedEvent(null);
        setShowEventModel(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleDelete() {
    try {
      const event_id = Number(selectedEvent.id);
      const res = await fetch(
        "http://localhost:5000/calendar/events/" + event_id,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );
      await res.json();
      setSelectedEvent(null);
      setShowEventModel(false); //ss
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="h-screen w-full z-40 fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-neutral-700 rounded-lg shadow-2xl w-1/4">
        <header className="bg-neutral-800 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-neutral-200">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  handleDelete();
                }}
                className="material-icons-outlined text-neutral-200 cursor-pointer"
              >
                delete
              </span>
            )}
            <button
              onClick={() => {
                setShowEventModel(false);
                setSelectedEvent(null);
              }}
            >
              <span className="material-icons-outlined text-neutral-200 cursor-pointer">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            {/* row 1 */}
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 bg-neutral-700 border-0 text-neutral-200 placeholder:text-neutral-400 text-xl font-semibold pb-2 w-full border-b-2 border-neutral-400 focus:outline-none focus:ring-0 focus:border-neutral-200"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* row 2 */}
            <span className="material-icons-outlined text-neutral-200">
              schedule
            </span>
            <p className="text-neutral-200 pl-1">
              {daySelected.format("dddd, MMMM DD")}
            </p>
            <span className="material-icons-outlined text-neutral-200"></span>
            <select
              id="underline_select"
              className="pt-3 bg-neutral-700 border-0 text-neutral-200 pb-2 w-full border-b-2 border-neutral-400 focus:outline-none focus:ring-0 focus:border-neutral-200 placeholder:text-neutral-400"
              required
              value={starttime}
              onChange={(e) => {
                setStarttime(e.target.value);
              }}
            >
              <option value="empty" selected>
                Select a start time
              </option>
              <option value="00:00">00:00</option>
              <option value="00:30">00:30</option>
              <option value="01:00">01:00</option>
              <option value="01:30">01:30</option>
              <option value="02:00">02:00</option>
              <option value="02:30">02:30</option>
              <option value="03:00">03:00</option>
              <option value="03:30">03:30</option>
              <option value="04:00">04:00</option>
              <option value="04:30">04:30</option>
              <option value="05:00">05:00</option>
              <option value="05:30">05:30</option>
              <option value="06:00">06:00</option>
              <option value="06:30">06:30</option>
              <option value="07:00">07:00</option>
              <option value="07:30">07:30</option>
              <option value="08:00">08:00</option>
              <option value="08:30">08:30</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
              <option value="23:30">23:30</option>
              <option value="24:00">24:00</option>
            </select>
            <span className="material-icons-outlined text-neutral-200"></span>
            <select
              id="underline_select"
              className="pt-3 bg-neutral-700 border-0 text-neutral-200 pb-2 w-full border-b-2 border-neutral-400 focus:outline-none focus:ring-0 focus:border-neutral-200 placeholder:text-neutral-400"
              required
              value={endtime}
              onChange={(e) => {
                setEndtime(e.target.value);
              }}
            >
              <option value="empty" selected>
                Select an end time
              </option>
              <option value="00:00">00:00</option>
              <option value="00:30">00:30</option>
              <option value="01:00">01:00</option>
              <option value="01:30">01:30</option>
              <option value="02:00">02:00</option>
              <option value="02:30">02:30</option>
              <option value="03:00">03:00</option>
              <option value="03:30">03:30</option>
              <option value="04:00">04:00</option>
              <option value="04:30">04:30</option>
              <option value="05:00">05:00</option>
              <option value="05:30">05:30</option>
              <option value="06:00">06:00</option>
              <option value="06:30">06:30</option>
              <option value="07:00">07:00</option>
              <option value="07:30">07:30</option>
              <option value="08:00">08:00</option>
              <option value="08:30">08:30</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
              <option value="23:30">23:30</option>
              <option value="24:00">24:00</option>
            </select>
            {/* row 3 */}
            <span className="material-icons-outlined text-neutral-200">
              segment
            </span>
            <input
              type="text"
              name="title"
              placeholder="Description"
              value={description}
              required
              className="pt-3 bg-neutral-700 border-0 text-neutral-200 placeholder:text-neutral-400 text-xl font-semibold pb-2 w-full border-b-2 border-neutral-400 focus:outline-none focus:ring-0 focus:border-neutral-200"
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* row 4 */}
            <span className="material-icons-outlined text-neutral-200">
              bookmark_border
            </span>
            <div>
              {labelsClasses.map((lblClass, i) => (
                <div className="relative grid">
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-200 w-6 h-6 my-1.5 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-neutral-800 text-sm font-bold">
                        check
                      </span>
                    )}
                  </span>
                  <div
                    className={`text-${lblClass}-200 absolute top-[5.5px] left-10 cursor-pointer`}
                    onClick={() => setSelectedLabel(lblClass)}
                  >
                    {labelNames[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end p-3">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !title
                ? true
                : starttime !== "empty" &&
                  endtime !== "empty" &&
                  endtime > starttime
                ? false
                : true
            }
            className={
              !title
                ? "px-6 py-2 rounded bg-neutral-500 text-neutral-200"
                : starttime !== "empty" &&
                  endtime !== "empty" &&
                  endtime > starttime
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-blue-600 px-6 py-2 rounded text-neutral-200"
                : "px-6 py-2 rounded bg-neutral-500 text-neutral-200"
            }
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
