import jwt from 'jsonwebtoken'

export const verifyToken = (req, res,next) => {
    const token = req.cookies.accessToken;

    //remember the youtuber use next(createError()) to written error status and send msg
    if (!token) return res.status(401).send("You are not authenticated");

    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {

        if (err) return res.status(403).send("Token is not valid");
        req.userId = payload.id; // Attach user info to request object
        req.isSeller = payload.isSeller; // Attach seller info if needed
        // Optionally, you can fetch the user from the database if needed
        next(); // Proceed to the next middleware or route handler
    });
};