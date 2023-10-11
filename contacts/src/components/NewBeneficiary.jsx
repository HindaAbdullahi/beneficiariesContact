import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  mobile: yup
    .string()
    .matches(/^(61|77|62|90)\d{7}$/, "Mobile number is not valid")
    .required("Mobile is required"),
  targetGroup: yup.string().required("Target Group is required"),
});

function NewBeneficiary({ addBeneficiary }) {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { state } = useLocation();

  let beneficiary = state?.beneficiary;

  const onSubmit = (data) => {
    if (beneficiary) {
      data.id = beneficiary.id;
    }
    addBeneficiary(data);
  };

  useEffect(() => {
    if (beneficiary) {
      setValue("fullName", beneficiary.fullName);
      setValue("mobile", beneficiary.mobile);
      setValue("targetGroup", beneficiary.targetGroup);
    }
  }, []);

  return (
    <>
     <div className="text-center mx-auto flex justify-between items-center py-2  px-4 mr-64 ">
    <button onClick={()=>{navigate(-1)}}
   className=" bg-blue-600 rounded-md  px-5 py-2 text-white "
    >
    back
    </button>
  </div>
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add New Beneficiary</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-600 mb-1">
            Full Name:
          </label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          />
          <p className="text-red-500">{errors.fullName?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-600 mb-1">
            Mobile:
          </label>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          />
          <p className="text-red-500">{errors.mobile?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="targetGroup" className="block text-gray-600 mb-1">
            Target Group:
          </label>
          <Controller
            name="targetGroup"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Target Group</option>
                <option value="Household">Household</option>
                <option value="Teacher">Teacher</option>
                <option value="Principle">Principle</option>
                <option value="FHW">FHW</option>
                <option value="FHS">FHS</option>
                {/* Add more target group options as needed */}
              </select>
            )}
          />
          <p className="text-red-500">{errors.targetGroup?.message}</p>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {beneficiary ? "Update Beneficiary" : "Add Beneficiary"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default NewBeneficiary;
