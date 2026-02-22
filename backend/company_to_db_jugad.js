// const pool = require("./db");
// const data = require("./2026.json");
// require('dotenv').config();

// async function insertData() {
//   for (let item of data) {
//     await pool.query(
//       `INSERT INTO companies
//       (date, company_name, job_role, eligible_batches, cgpa, ctc_lpa,
//        role_type, internship_duration, internship_compensation,
//        total_offers, hiring_process, pyq_config)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
//       [
//         item.Date,
//         item.Company,
//         item["Job Role"],
//         item["Eligible Batches"],
//         item.CGPA || null,
//         item["CTC (in LPA)"] || null,
//         item["Type of Role"],
//         item["Duration of Internship"],
//         item["Compensation in Internship"] || null,
//         item["Total Offers"] || null,
//         item["Hiring Process"],
//         {}
//       ]
//     );
//   }

//   console.log("All companies inserted");
//   process.exit();
// }

// insertData();

require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const pool = require("./db");
const data = require("./2026.json");

function toNull(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed === "-") return null;
    return trimmed;
  }
  return value;
}

function toNumberOrNull(value) {
  const v = toNull(value);
  if (v === null) return null;
  const num = typeof v === "number" ? v : Number(v);
  return Number.isFinite(num) ? num : null;
}

function toFloatOrNull(value) {
  const v = toNull(value);
  if (v === null) return null;
  const num = typeof v === "number" ? v : Number.parseFloat(v);
  return Number.isFinite(num) ? num : null;
}

async function insertData() {
  for (let item of data) {
    const values = [
      toNull(item.Date),
      toNull(item.Company),
      toNull(item["Job Role"]),
      toNull(item["Eligible Batches"]),
      toFloatOrNull(item.CGPA),
      toNumberOrNull(item["CTC (in LPA)"]),
      toNull(item["Type of Role"]),
      toNull(item["Duration of Internship"]),
      toNumberOrNull(item["Compensation in Internship"]),
      toNumberOrNull(item["Total Offers"]),
      toNull(item["Hiring Process"]),
      {},
    ];

    try {
      await pool.query(
        `INSERT INTO companies
        (date, company_name, job_role, eligible_batches, cgpa, ctc_lpa,
         role_type, internship_duration, internship_compensation,
         total_offers, hiring_process, pyq_config)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        values
      );
    } catch (err) {
      console.error("Insert failed for:", item?.Company, item?.Date);
      console.error("Values:", values);
      throw err;
    }
  }

  console.log("All companies inserted");
  process.exit();
}


insertData();