import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = async (userId) => ({
  accessToken: jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN, { expiresIn: "15m" }),
  refreshToken: jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET || process.env.REFRESH_TOKEN, { expiresIn: "7d" }),
});

export const setCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";
  const options = { sameSite: isProduction ? "none" : "lax", httpOnly: true, secure: isProduction };
  res.cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { ...options, maxAge: 7 * 24 * 60 * 60 * 1000 });
};
