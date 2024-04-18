import mongoose from 'mongoose'

const todoSchema = mongoose.Schema(
  {
    task: { type: String, required: true },
    userId:{type:String},
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: false,
    // },
    // email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
