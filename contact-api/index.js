// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const beneficiaries = require("./beneficiaries.json");
let total_beneficiaries = [...beneficiaries];
let nextBeneficiaryId = beneficiaries.length + 1;

app.get("/api/beneficiaries", (req, res) => {
  res.json(total_beneficiaries);
});

app.post("/api/add_beneficiary", (req, res) => {
  const { avatar, fullName, mobile, targetGroup } = req.body;

  const newBeneficiary = {
    id: nextBeneficiaryId++,
    avatar,
    fullName,
    mobile,
    targetGroup,
  };
  total_beneficiaries.push(newBeneficiary);

  return res.json({
    message: "Beneficiary Saved ⚡",
  });
});

app.put("/api/update_beneficiary", (req, res) => {
  const { avatar, fullName, mobile, targetGroup, id } = req.body;

  const beneficiaryIndex = total_beneficiaries.findIndex(
    (beneficiary) => beneficiary.id == id,
  );

  if (beneficiaryIndex !== -1) {
    total_beneficiaries[beneficiaryIndex] = {
      id,
      avatar,
      fullName,
      mobile,
      targetGroup,
    };

    return res.json({
      message: "Beneficiary updated ⚡",
    });
  } else {
    return res.status(404).json({
      message: "Beneficiary not found",
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
