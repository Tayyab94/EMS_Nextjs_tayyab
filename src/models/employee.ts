
import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        userName: String,
        salary: Number,
        age: String,
        profileImage: String
    }, {
    timestamps: true
}
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema)

export default Employee;