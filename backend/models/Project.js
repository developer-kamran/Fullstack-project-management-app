const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['In Progress', 'Not Started', 'Completed'],
    },
    deadline: {
      type: Date,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
