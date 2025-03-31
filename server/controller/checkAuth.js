export const checkAuth=(req,res)=>{
    if (!req.user) {
        return res.json({ isAuthenticated: false });
      }
      console.log(req.user);
      
      res.status(200).json({ isAuthenticated: true, username: req.user.fullName });

}