import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  profilePic: { type: String },
  github: { type: String },
  linkedin: { type: String },
  skills: [{ type: String }],
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startYear: Number,
      endYear: Number,
    },
  ],
});

// Use `export default` for ES modules
const User = mongoose.model('User', userSchema);
export default User;
