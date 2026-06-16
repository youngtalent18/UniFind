import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = async (userId, res) => {
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN,{
        expiresIn: "15d",
    })

    const refreshToken = jwt.sign({userId},process.env.ACCESS_TOKEN,{
        expiresIn: "15d",
    })

    return { accessToken, refreshToken }
}

export const setCookies = async (res, accessToken, refreshToken) => {
    
}