import jwt from 'jsonwebtoken';
import config from 'config'

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user: {
        id,
      },
    };
    let token = process.env.jwtSecret;
    jwt.sign(
      payload,
      "mysecrettoken",
      { expiresIn: 360000 },
      (err: any, token: any) => {
        if (err) {
          reject("Token could not be generated");
        }
        resolve(token);
      }
    );
  });
};
