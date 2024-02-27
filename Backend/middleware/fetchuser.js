const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodboy';

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Authentication is got Failed"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        //console.log(data)
        req.user = data.id;
        //console.log(data.id)
        next()
    } catch (error) {
        res.status(401).send({error:"Authentication Failed"})
    }
}

module.exports = fetchuser;