// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, appImage: {
    type: String,
    
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techSpecs: [{
    type: String,
    required: true
  }],
  videoUrl: {
    type: String,
    trim: true, default: "https://www.example.com/default-download"
  },
  downloadUrl: {
    type: String,
    trim: true, default: "https://www.example.com/default-download"
  },
  images: [{
    type: String,
    required: true
  }],
  demoUrl: { type: String,  trim: true, default: "https://www.example.com/default-download" }, 

  createdAt: {
    type: Date,
    default: Date.now
  },
 
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
