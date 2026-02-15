import { useParams, useNavigate } from "react-router-dom";
import data2026 from "../data/2026.json";

export default function CompanyPYQ() {
  const { id } = useParams();
  const navigate = useNavigate();

  const company = data2026.find(
    (item) => String(item.id) === String(id)
  );

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Company Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white p-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
      >
        ← Back
      </button>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        PYQ - {company.Company}
      </h1>

      {/* Placeholder Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
        <p className="text-lg text-gray-300">
          Previous Year Questions for <span className="text-blue-400 font-semibold">{company.Company}</span> will be displayed here.
        </p>
      </div>

    </div>
  );
}

