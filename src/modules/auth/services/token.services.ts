import jwt from 'jsonwebtoken';

export class TokenServices{
    private tokenSecret: string = process.env.TOKEN_SECRET!;

    generateToken(payload: any) {
        return jwt.sign(payload, this.tokenSecret, { expiresIn: '1d' });
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.tokenSecret);
    }
}