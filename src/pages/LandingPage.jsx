import React from "react";
// import fetchWrap from "../functions/fetchWrap";
import axios from "axios";

const LandingPage = () => {
  return (
    <>
      <h1>Landing Page</h1>
      <button
        onClick={async () => {
          //   const res = await fetchWrap("/user/settings", {
          //     method: "POST",
          //     body: { userId: "94118ac3-fbef-4efd-b697-7cef97611738", language: "ZH" },
          //   });
          //   if (res.ok) {
          //     console.log(await res.json());
          //   }
          // }
          const res = await axios.post(
            "https://j635an2edqmaoyggrqy4sritge0qlsqf.lambda-url.us-east-2.on.aws/user/settings",
            {
              userId: "94118ac3-fbef-4efd-b697-7cef97611738",
              language: "ZH",
            }
          );
          console.log(res.data);
        }}
      >
        Click
      </button>
    </>
  );
};

export default LandingPage;
