import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosConfig.jsx";

const History = () => {
  const token = localStorage.getItem("token");
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.get("/history/all", {
          headers: { "x-access-token": token },
        });
        console.log("history:", response.data);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch history if token is available
    if (token) {
      fetchHistory();
    } else {
      console.log("No token found in localStorage");
    }
  }, [token]); // Re-run when the token changes (if applicable)

  const spellTheBeans = (word) => {
    switch (word) {
      case "Create":
        return "create";
      case "Update":
        return "update";
      case "Delete":
        return "delete";
      case "Read":
        return "view";
      default:
        return word; // In case of an unexpected value
    }
  };

  return (
    <div className="flex flex-col gap-y-5 p-10 h-[86vh]">
      <ul className="flex flex-col self-start gap-y-4 overflow-y-scroll h-full w-3/4 custom-scroll shadow-lg rounded-lg py-5">
        {history.map((element) => (
          <div key={element._id}>
            <li className="font-semibold text-lg ml-10">
              You have
              <span className="font-bold text-lg ml-2">
                {spellTheBeans(element.actionType)}
              </span>{" "}
              a
              <span className="font-bold text-lg ml-2">
                {element.RessourceName}
              </span>{" "}
              on
              <span className="font-bold text-lg ml-2">
                {element.timestamp.split("T")[0]}
              </span>{" "}
              at
              <span className="font-bold text-lg ml-2">
                {element.timestamp.split("T")[1].split(".")[0]}
              </span>
            </li>
            <hr className="bg-gray-600 mb-2 mt-4 w-full" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default History;
