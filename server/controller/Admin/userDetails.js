import User from "../../model/user.js";

const userDetails = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ userDetails: users });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, status } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        status,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Failed to update user" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { userDetails, editUser, deleteUser };
