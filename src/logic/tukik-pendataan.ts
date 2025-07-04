const axios = require("axios");
import "dotenv/config";
// import { headers } from "next/headers";
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjUyOTcyNTE0MjgsImtvbnNlcnZhc2lfaWQiOjEsInVzZXJfaWQiOjF9.d5sObWWC7uLAoya8ToVlBlEQpAmxwh3m9JBT75fgrD8'

// const Headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
//   Accept: "*/*",
//   " Access-Control-Allow-Headers": "*",
//   Authorization: `Bearer ${token}`,
// };

// export const getTukik = () => {
//   return axios.get(
//     process.env.API_BACKEND ||
//       "https://tukikapp-627fhhjd3q-et.a.run.app" + "/penyu/get",
//     {
//       Headers:Headers,
//       mode: "no-cors",
//       key: "value",
//     }
//   );
// };

// export const getAllDataListMenetas = () => {
//   return axios.get(
//     process.env.API_BACKEND ||
//       "https://tukikapp-627fhhjd3q-et.a.run.app" + "/pendataan/get?status=101",
//     {
//       Headers:Headers,
//       mode: "no-cors",
//       key: "value",

//     }
//   );
// };

// export const penyuMendarat = ({
//   gagal,
//   berhasil,
//   penyuId,
//   pendataan_id = 2,
//   key= token,
// }:any) => {
//   return axios.post(
//     process.env.API_BACKEND ||
//     "https://tukikapp-627fhhjd3q-et.a.run.app" + "/pendataan/create",
//     {
//       gagal: gagal,
//       berhasil: berhasil,
//       pendataan_id: pendataan_id,
//       penyu_id: penyuId,

//     },
//    {
//     headers:{
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//       Accept: "*/*",
//       " Access-Control-Allow-Headers": "*",
//       Authorization: `Bearer ${key}`,
//     },
//     mode:"no-cors"
//    }
//   );
// };

export const JumlahMenetas = () => {
  return  fetch("/api/data-tukik", {
    method: "GET",
    mode: "cors",
  })
};
