export const checkAuth=(req,res)=>{
    if (!req.user) {
        return res.json({ isAuthenticated: false });
      }
      const user=req.user;
      
      res.status(200).json({ isAuthenticated: true, username:user });

}