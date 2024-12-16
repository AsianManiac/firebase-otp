import Axios from "axios";

// const api = axios.create();

// api.interceptors.request.use(function (config) {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzUwOTVkNjZmMGYyZDY0OTlmMzQ2YyIsInJvbGUiOiJhZG1pbiIsInVpZCI6InRHQ09Sb0k0QldnTHZLc2lhSk1vem53NzRsajIiLCJpYXQiOjE3MjA4NDgzNTAsImV4cCI6MTcyMDg1NTU1MH0.LIJiDWxmwEGSIngseZZ5wIgkUDq7qDICRRfT7iR5YuA";
//   if (!token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

const axios = Axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Set the Bearer auth token.
const setBearerToken = (token?: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
// const secret =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzUwOTVkNjZmMGYyZDY0OTlmMzQ2YyIsInJvbGUiOiJhZG1pbiIsInVpZCI6InRHQ09Sb0k0QldnTHZLc2lhSk1vem53NzRsajIiLCJpYXQiOjE3MjA4NzY3NTcsImV4cCI6MTcyMDg4Mzk1N30.v4vKs2VAZow2_V8UcFeCqRlgOj7s1Box0LyIFzaQ660";
// const secret =
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxNTQwYWM3MWJiOTJhYTA2OTNjODI3MTkwYWNhYmU1YjA1NWNiZWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aC1vcHRpb24iLCJhdWQiOiJhdXRoLW9wdGlvbiIsImF1dGhfdGltZSI6MTcyMTA2NjU4NSwidXNlcl9pZCI6InAwZGRjZXdwY3ZhUVQzQ3Q2Z1hPYUREUVlKNTMiLCJzdWIiOiJwMGRkY2V3cGN2YVFUM0N0NmdYT2FERFFZSjUzIiwiaWF0IjoxNzIxMDY2NTg1LCJleHAiOjE3MjEwNzAxODUsInBob25lX251bWJlciI6IisyMzc2NTQ1NjgzNDYiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIisyMzc2NTQ1NjgzNDYiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.kLQUQF19Ip-ap8OnqIFOkpFYZKHjz6OxBM6xvPZgXScqag2cjQZCQwIV0DiKaCkP3oRSyXExNoXJge1JEg0_dJ2trT-8XjsakO4Y2lEK07-_7LtyH3Mm9aMDLFMliFfhQ5de2slOHHqE-RHBidO1FmkiLV7Ox9mxpnhYvVl7puPQYdoRE2vtxXJYX50xCW8XWfCvyWep0Db4UHRKTPXM_56VMq68nH2nc86kvrLaN-YQzXokeQWduDA0dIGdofKrktIikr4qKq1fvAs7nfV2pIdXpQ_mzh1h0-FDlXMrAPt1BoEsbl-9mE1pqVM0qeT_orimvkn4927SipnaCCty7A";
// setBearerToken(secret);
export { axios, setBearerToken };
