import jwt from 'jsonwebtoken';
import { UserEntity } from '../../domain/entities/user/UserEntity';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '2b6e0a29f123c410fef19c2cba59e5a6765f769b2619fd44c7b35719e2c8ab40';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '6f10d4a39b8c4a99b7e9df07a478dcab3b4b80b34f5da0518dbf7e1c67289352';

export const generateTokens = (user: UserEntity) => {
  
  const accessToken = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      role: user.role 
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  // Refresh token - long lived (7 days)
  const refreshToken = jwt.sign(
    { 
      userId: user._id 
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};