import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

const ReviewsPage = () => {
  const [allAgencies, setallAgencies] = useState([]);
  const agencyCollectionRef = collection(db, "agency");

  useEffect(() => {
    const getAgencies = async () => {
      const data = await getDocs(agencyCollectionRef);
      setallAgencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAgencies();
  }, []);

  console.log(allAgencies);

  return (
    <div className="bg-[#f4f4f4]  h-screen">
      <div className="text-center pt-4">
        <h1 className="text-4xl font-bold">Agency Ratings</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-7 mt-6">
        {allAgencies.map((agency, index) => {
          return (
            <div
              key={index}
              className=" w-[250px] bg-white flex justify-between items-center py-5 px-4 border rounded-lg"
              style={{
                boxShadow: "0px 20px 25px rgba(76, 103, 100, 0.1)",
              }}
            >
              <div>
                <p>{agency.agencyname}</p>
              </div>
              <div>
                <p>
                  {agency.peopleReviewed !== 0
                    ? agency.totalStars / agency.peopleReviewed
                    : "0"}
                  /5 ⭐
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsPage;
