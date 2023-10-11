import React, { useEffect } from "react";
import axios from "axios";
import SearchFilter from "../SearchFilter";
import BeneficiaryList from "../BeneficiaryList";

function Home({
  beneficiaries,
  setBeneficiaries,
  searchTerm,
  setSearchTerm,
  selectedFilters,
  setSelectedFilters,
}) {
  const fetchBeneficiaries = async () => {
    const { data } = await axios.get("http://localhost:5000/api/beneficiaries");
    setBeneficiaries(data);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // Filter beneficiaries based on search term and selected filters
  const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
    const nameMatches = beneficiary.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const filterMatches =
      selectedFilters.length === 0 ||
      selectedFilters.includes(beneficiary.targetGroup);
    return nameMatches && filterMatches;
  });

  const handleDeleteBeneficiary = async (id) => {
    let current_data = beneficiaries.filter((ben) => ben.id !== id);
    setBeneficiaries(current_data);
    toast.success(res?.message, { theme: "colored" });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Beneficiary List</h1>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <BeneficiaryList
        beneficiaries={filteredBeneficiaries}
        handleDeleteBeneficiary={handleDeleteBeneficiary}
      />
    </>
  );
}

export default Home;
