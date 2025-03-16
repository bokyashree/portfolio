import Project from "../models/Project.js";  // ✅ ES6 Import Fix

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, appImage,description, techSpecs, videoUrl, downloadUrl, images,demoUrl } = req.body;

    console.log("Received data:", req.body);  // ✅ Debugging line

    if (!name || !description || !Array.isArray(techSpecs) || !images.length) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const newProject = new Project({ name,appImage, description, techSpecs, videoUrl, downloadUrl, images,demoUrl  });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
