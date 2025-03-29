export const logout=async(req,res)=>{
    const token = req.cookies.token;
  if (!token) {
    return res.json({ message: 'No active session' });
  }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}
