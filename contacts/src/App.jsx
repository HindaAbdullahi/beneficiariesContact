import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import NewBeneficiary from "./components/NewBeneficiary";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const navigate = useNavigate();

  const addBeneficiary = async (data) => {
    if (data.id) {
      //updeting
      const { data: res } = await axios.put(
        "http://localhost:5000/api/update_beneficiary",
        {
          avatar: "https://placekitten.com/50/50",
          ...data,
        },
      );

      toast.success(res?.message, { theme: "colored" });
      navigate(-1);

      return;
    }
    const { data: res } = await axios.post(
      "http://localhost:5000/api/add_beneficiary",
      {
        avatar: "https://placekitten.com/50/50",
        ...data,
      },
    );

    toast.success(res?.message, { theme: "colored" });
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                beneficiaries={beneficiaries}
                setBeneficiaries={setBeneficiaries}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            }
          />
          <Route
            path="/new-beneficiary"
            element={<NewBeneficiary addBeneficiary={addBeneficiary} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
