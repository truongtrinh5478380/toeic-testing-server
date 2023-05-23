import jwt from "jsonwebtoken"

interface TokenPayload {
    _id: string
    username: string
}


export function generateTokens({ _id, username }: TokenPayload) {
    const jwtSecret = process.env.JWT_SECRET as string

    const accessToken = jwt.sign(
        { _id, username },
        jwtSecret,
        {
            expiresIn: '1h'
        }
    )

    const refreshToken = jwt.sign(
        { _id, username },
        jwtSecret,
        {
            expiresIn: '7d'
        }
    )

    return {
        accessToken,
        refreshToken
    }
}