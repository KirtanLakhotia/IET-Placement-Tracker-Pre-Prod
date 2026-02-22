import { useNavigate } from "react-router-dom";

export default function SubscribeConsultation() {
  const navigate = useNavigate();

  const handleUnlock = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/makeSubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: storedUser.sub,
            company_id: 100,  // default id
            subscription_type: "consultation",
            transaction_id: "FREE_CONSULTATION"
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      navigate("/subscriptions");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Unlock 1:1 Consultation
      </h1>

      <button
        onClick={handleUnlock}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        Unlock Consultation
      </button>

    </div>
  );
}