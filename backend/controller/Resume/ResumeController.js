// const UserResume = require('../../model/ResumeModel/ResumeModel');
const User = require('../../model/users/UserModel');

const uploadResume = async (req, res) => {
  try {
    const { email } = req.body;
    const { filename, path } = req.file;
    // console.log(email,filename,path);

    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({ email }); // You can add more fields as needed

      // Save the new user document asynchronously
      await user.save();
    }

    // Append the new resume to the user's resumes array
    user.resume.push({
      filename: filename,
      path: path
    });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Resume uploaded successfully',user:user });
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
};

const getResumes=async(req,res)=>{
    const { email } = req.params;
    // console.log(email);

    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Get the resumes array from the user object
      const resumes = user.resume;
      // console.log(resumes);
  
      res.status(200).json({ resumes });
    } catch (error) {
      console.error('Error fetching resumes:', error);
      res.status(500).json({ error: 'Failed to fetch resumes' });
    }
}
const deleteResume = async (req, res) => {
  try {
    const { email, filename } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter out the resume with the matching filename
    user.resume = user.resume.filter((resume) => resume.filename !== filename);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Resume deleted successfully', user: user });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};
module.exports = { uploadResume,getResumes,deleteResume };