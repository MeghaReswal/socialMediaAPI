const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    try {

        const isTokenExist = req.headers.authorization;

        if (!isTokenExist) {
            res.status(401).send({
                message: "No token provided!",
            });
        }

        const token = req.headers.authorization.split(" ")[1];

        // console.log("token12", token)
        if (!token) {
            res.status(403).send({
                message: "No token provided!",
            });
        }

        jwt.verify(token, "megha", (err, decoded) => {

            console.log("decoded", decoded)
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            next();
        });


    } catch (err) {
        res.status(401).send({
            success: false,
            message: "auth not found"
        })

    }

}


module.exports = { isAuthenticated }