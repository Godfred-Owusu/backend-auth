import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 30 days
  });
  res.cookie("token", token, {
    //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Token expires in 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
