import jwt from "jsonwebtoken";

export const createAccessToken = (paylot) => {
    return new Promise((resolve, reject) => {
        jwt.sign(paylot, "xyz123", { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });

}