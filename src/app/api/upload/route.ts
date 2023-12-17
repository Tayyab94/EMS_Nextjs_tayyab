
import multer from 'multer';
import fs from 'fs/promises';
import path, { join } from 'path'
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, writeFileSync, writeSync } from 'fs';


const uploadFolder = path.resolve(process.cwd(), 'public', 'uploads');

// Create the 'uploads' folder if it doesn't exist
fs.mkdir(uploadFolder, { recursive: true });


const storage = multer.diskStorage({
    // destination: path.resolve(process.cwd(), 'public', 'uploads'),
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname);
    // },

    destination: function (req, res, cb) {
        cb(null, path.resolve(process.cwd(), 'public', 'uploads'))
    },
    filename: function (req, file, cb) {

        // we can customize the file name as well.

        cb(null, file.originalname)
    }
});

// Configure multer to store files in the 'uploads' directory
const upload = multer({ dest: path.resolve(process.cwd(), 'public', 'uploads') });

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {

    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;


    console.log(file)

    if (!file) {
        return NextResponse.json({ success: false });

    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the form data in the buffer, you can do whatever you want with it.
    // For this we will just write it to the filestream in a new location

    const pth = join(path.resolve(process.cwd(), 'public', 'uploads'), file.name);

    await writeFileSync(pth, buffer);


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const filePath = path.join('/uploads', file.name);
    const fileUrl = `${baseUrl}${filePath}`;
    console.log(`Open ${fileUrl} to see the Upload file`);

    return NextResponse.json({ success: true, filePath: fileUrl });

}
