import User from "../models/user.js";
import { OAuth2Client } from "google-auth-library";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
export const generateAuthUrlControllerTrial = (req, res) => {
  const redirectURL = process.env.GOOGLE_REDIRECT_URI;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });

  res.json({ url: authUrl });
};

async function getUserData(access_token) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const data = await response.json();
    console.log("User data:", data);

    const { sub: googleId, name, picture, email } = data;

    if (!googleId || !email) {
      throw new Error(
        "Required fields (Google ID or email) are missing from user data."
      );
    }

    // Find or create the user
    let user = await User.findOne({ email });
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    if (!user) {
      user = new User({
        name: name || "Unknown User", // Default if name is missing
        email,
        googleId,
        profilePicture: picture || null,
        password: "", // Empty password for OAuth users
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      await user.save();

      await sendVerificationEmail(user.email, verificationToken);
      console.log("New user saved:", user);
    } else {
      // Update existing user if needed
      let updated = false;
      if (user.googleId !== googleId) {
        user.googleId = googleId;
        updated = true;
      }
      if (user.profilePicture !== picture) {
        user.profilePicture = picture;
        updated = true;
      }
      if (updated) {
        await user.save();
        console.log("User updated:", user);
      }
    }

    return user;

    // return data;
  } catch (error) {
    console.error("Error fetching or saving user data:", error.message);
    throw new Error("Error fetching user data");
  }
}

export const oauthCallbackControllerTrial = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided.");
  }

  try {
    const redirectURL = process.env.GOOGLE_REDIRECT_URI;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log(tokens);
    const userData = await getUserData(tokens.access_token);

    res.json({ message: "Authentication successful!", userData });
  } catch (error) {
    console.error("Error during OAuth process:", error.message);
    res.status(500).send("Error during Google OAuth process.");
  }
};
