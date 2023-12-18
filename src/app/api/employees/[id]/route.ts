import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb"
import Employee from "../../../../models/employee"
import { NextApiRequest } from "next";



interface Params {
    id: string;
    // Add other properties if needed
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
    const { id } = params;

    const { employeeName, employeeSalary, employeeAge } = await request.json();

    await connectMongoDB();

    try {
        await Employee.findByIdAndUpdate(id, { employeeName, employeeSalary, employeeAge });
        return NextResponse.json({ message: "Employee Updated" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }

}


export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { id } = params;

    await connectMongoDB();

    try {
        const emp = await Employee.findById({ _id: id }).select("-createdAt -updatedAt");

        return NextResponse.json({ emp }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }

}