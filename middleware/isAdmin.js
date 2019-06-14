module.exports = function(req,res, next){
    if(req.user.admin==0) return res.status(403).send("Forbidden");
    next();
}