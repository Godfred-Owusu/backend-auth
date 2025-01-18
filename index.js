import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { OAuth2Client } from "google-auth-library";
import connections from "./Database/connections.js";
import userRoute from "./routes/userRoute.js";
import oauthRoute from "./routes/oauthRoute.js";

dotenv.config();

const app = express();
//const port = 3000;
const port = 5000

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRoute);
app.use("/oauth", oauthRoute);

// Endpoint to generate Google OAuth URL
// app.post("/request", (req, res) => {
//   const redirectURL = "http://127.0.0.1:3000/oauth";

//   const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     redirectURL
//   );

//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/userinfo.profile", "openid"],
//     prompt: "consent",
//   });

//   res.json({ url: authUrl });
// });

// // Fetch user data from Google API
// async function getUserData(access_token) {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
//   );
//   const data = await response.json();
//   console.log("User data:", data);
//   return data;
// }

// // OAuth callback endpoint
// app.get("/oauth", async (req, res) => {
//   const code = req.query.code;

//   if (!code) {
//     return res.status(400).send("No code provided.");
//   }

//   try {
//     const redirectURL = "http://127.0.0.1:3000/oauth";
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectURL
//     );

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     console.log(tokens);
//     const userData = await getUserData(tokens.access_token);

//     res.json({ message: "Authentication successful!", userData });
//   } catch (error) {
//     console.error("Error during OAuth process:", error.message);
//     res.status(500).send("Error during Google OAuth process.");
//   }
// });

app.listen(port, async () => {
  try {
    await connections(); // Ensure the database connects before starting the server.
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails.
  }
});
