import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = async (userId, res) => {
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN,{
        expiresIn: "7d",
    })

    const refreshToken = jwt.sign({userId},process.env.ACCESS_TOKEN,{
        expiresIn: "15m",
    })

    return { accessToken, refreshToken }
}

export const setCookies = async (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken,
        {
            sameSite: process.env.NODE_ENV !== "development" ? "none":"lax",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )

     res.cookie("refreshToken", refreshToken,
        {
            sameSite: process.env.NODE_ENV !== "development" ? "none":"lax",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 15 * 60 * 60 * 1000
        }
    )
}