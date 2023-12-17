
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


    // Use the multer middleware to handle the file upload
    // upload.single('image')(req, res, async function (err) {
    //     if (err) {

    //         return NextResponse.json({ message: "Error" }, { status: 500 })
    //     }

    //     // Access the uploaded file information from req.file
    //     const file = req.file;

    //     if (!file || file == undefined) {
    //         console.log("nai na")
    //         return NextResponse.json({ message: "file nai mili" }, { status: 404 });
    //     }
    //     // Process the file as needed
    //     console.log(file);

    // });

    return NextResponse.json({ message: "File Uploaded" }, { status: 200 })
}

// export async function POST(req, res) {

//     try {
//         upload.single('image')(req, res);

//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//         } else if (err) {
//             // An unknown error occurred when uploading.
//         }

//         if (!req.file) {
//             return NextResponse.json({ message: "No file Uploaded" }, { status: 400 })

//         }

//         // Handle the uploaded file data
//         const { originalname, filename } = req.file;
//         return NextResponse.json({ message: "File Uploaded Success", originalname, filename }, { status: 200 })

//     } catch (err) {
//         if (err instanceof multer.MulterError) {
//             return NextResponse.json({ message: err.message }, { status: 400 })

//         } else {
//             return NextResponse.json({ message: err.message }, { status: 500 })
//         }
//     }
// }
// const upload = multer({ storage });

// export async function POST(req, res) {

//     upload.single('image')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {

//             return NextResponse.json({ message: err.message }, { status: 400 })

//         } else if (err) {
//             return NextResponse.json({ message: err.message }, { status: 500 })
//         }

//         return NextResponse.json({ message: "File Uploaded" }, { status: 200 })

//     });
// }



// const apiHandler = (req, res) => {

//     console.log("Method  " + res)
//     if (req.method === 'POST') {
//         try {
//             upload.single('image')(req, res, (err) => {
//                 if (err instanceof multer.MulterError) {
//                     res.status(400).json({ message: err.message });
//                 } else if (err) {
//                     res.status(500).json({ message: err.message });
//                 } else {
//                     // If no error occurred during file upload, you can handle the file data
//                     const { originalname, filename } = req.file;
//                     res.status(200).json({ message: 'File uploaded successfully!', originalname, filename });
//                 }
//             });
//         } catch (error) {
//             console.error('Error during file upload:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// };

// export default apiHandler;

// return NextResponse.json({ message: "Employee Created" }, { status: 201 })