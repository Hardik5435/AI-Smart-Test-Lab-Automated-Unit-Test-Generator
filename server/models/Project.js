import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  code: String,
  tests: String,
  framework: String,
  result: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", ProjectSchema);
