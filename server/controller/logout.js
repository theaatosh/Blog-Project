export const logout=async(req,res)=>{
    const token = req.cookies.jwt;
    console.log(token);
    
  if (!token) {
    return res.json({ message: 'No active session' });
  }

  res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
}
