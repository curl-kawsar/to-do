import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the todo'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: false,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Add index for sorting by due date
TodoSchema.index({ dueDate: 1 });

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema); 