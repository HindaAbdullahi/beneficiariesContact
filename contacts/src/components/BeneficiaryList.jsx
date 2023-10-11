import React from "react";
import { useNavigate } from "react-router-dom";

function BeneficiaryList({
  beneficiaries,
  handleDeleteBeneficiary,
  handleUpdateBeneficiary,
}) {
  const navigate = useNavigate();
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-4 lg:grid-cols-3 gap-4">
      {beneficiaries?.map((beneficiary) => (
        <li
          key={beneficiary.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <img
            src={beneficiary.avatar}
            alt="Avatar"
            className="w-16 h-16 mx-auto rounded-full"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{beneficiary.fullName}</h2>
            <p className="text-gray-700">Mobile: {beneficiary.mobile}</p>
            <p className="text-gray-700">
              Target Group: {beneficiary.targetGroup}
            </p>
            <button
              onClick={() => handleDeleteBeneficiary(beneficiary.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>

            <button
              onClick={() =>
                navigate("/new-beneficiary", {
                  state: { beneficiary },
                })
              }
              className="text-blue-500 hover:text-blue-700"
            >
              update
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BeneficiaryList;
