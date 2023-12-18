import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Employee from "../../../models/employee";
import { NextApiRequest } from "next";

export async function POST(request: NextRequest) {


    const { employeeName, employeeSalary, employeeAge, uploadStatus } = await request.json();

    console.log("EMole " + employeeAge)
    console.log(request.body)
    await connectMongoDB();

    await Employee.create({ userName: employeeName, salary: employeeSalary, age: employeeAge, profileImage: uploadStatus });

    return NextResponse.json({ message: "Employee Created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();

    const employees = await Employee.find().select("-createdAt -updatedAt").sort({ userName: -1 });

    return NextResponse.json({ data: employees })
}


export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();

    await Employee.findByIdAndDelete(id);

    return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
}