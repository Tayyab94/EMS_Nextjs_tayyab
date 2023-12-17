import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Employee from "../../../models/employee";

export async function POST(request) {

    const { employeeName, employeeSalary, employeeAge, uploadStatus } = await request.json();

    await connectMongoDB();

    await Employee.create({ userName: employeeName, salary: employeeSalary, age: employeeAge, profileImage: uploadStatus });

    return NextResponse.json({ message: "Employee Created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();

    const employees = await Employee.find().select("-createdAt -updatedAt").sort({ userName: -1 });

    return NextResponse.json({ data: employees })
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();

    await Employee.findByIdAndDelete(id);

    return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
}