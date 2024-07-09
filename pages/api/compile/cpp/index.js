import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code, input } = req.body;

        const payload = {
            language: 'cpp',
            version: '*',
            files: [
                {
                    name: 'main.cpp',
                    content: code,
                },
            ],
            stdin: input,
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1,
        };

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);
            res.status(200).json({ output: response.data.run.output });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}





// Code to execute the codes in local

// import fs from 'fs';
// import { exec } from 'child_process';
// import path from 'path';


// const ensureTmpDir = async () => {
//     const tmpDir = '/tmp';
//     try {
//         await fs.access(tmpDir);
//     } catch {
//         await fs.mkdir(tmpDir);
//     }
// };

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { code, input } = req.body;
//         // Define file paths
//         const codeFilePath = path.join(process.cwd(), 'code.cpp');
//         const inputFilePath = path.join(process.cwd(), 'input.txt');
//         const executablePath = path.join(process.cwd(), 'a.exe'); // For Windows systems


//         // For unix systems 
//         // const codeFile = path.join('/tmp', 'code.cpp');
//         // const inputFile = path.join('/tmp', 'input.txt');
//         // const outputFile = path.join('/tmp', 'output.txt');

//         console.log('Code:', code);
//         try {
//             // // Write code to file
//             fs.writeFileSync(codeFilePath, code);

//             // Write input to file
//             fs.writeFileSync(inputFilePath, input);

//             // Compile the C++ code
//             exec(`g++ ${codeFilePath} -o ${executablePath}`, (compileErr, compileStdout, compileStderr) => {
//                 if (compileErr) {
//                     console.error('Compilation error:', compileStderr);
//                     res.status(500).json({ error: 'Compilation error', details: compileStderr });
//                     return;
//                 }

//                 // Run the compiled executable with input
//                 exec(`${executablePath} < ${inputFilePath}`, (runErr, stdout, stderr) => {
//                     if (runErr) {
//                         console.error('Runtime error:', stderr);
//                         res.status(500).json({ error: 'Runtime error', details: stderr });
//                         return;
//                     }
//                     res.status(200).json({ output: stdout });
//                 });
//             });
//             // Write the code and input to files

//             // // For vercel server we need to write to /tmp directory

//             // await ensureTmpDir();

//             // await fs.writeFile(codeFile, code);
//             // await fs.writeFile(inputFile, input);

//             // // Compile and run the code
//             // exec(`g++ ${codeFile} -o /tmp/a.out && /tmp/a.out < ${inputFile} > ${outputFile}`, async (error) => {
//             //     if (error) {
//             //         res.status(500).json({ error: error.message });
//             //         return;
//             //     }

//             //     const output = await fs.readFile(outputFile, 'utf8');
//             //     res.status(200).json({ output });
//             // });
//         } catch (err) {
//             console.error('Unexpected error:', err);
//             res.status(500).json({ error: 'Unexpected error', details: err.toString() });
//         }
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// }



// // const { exec } = require('child_process');
// // const fs = require('fs').promises;
// // const path = require('path');



// // const ensureTmpDir = async () => {
// //     const tmpDir = '/tmp';
// //     try {
// //         await fs.access(tmpDir);
// //     } catch {
// //         await fs.mkdir(tmpDir);
// //     }
// // };

// // export default async function handler(req, res) {
// //     if (req.method === 'POST') {
// //         const { code, input } = req.body;

// //         const codeFile = path.join('/tmp', 'code.cpp');
// //         const inputFile = path.join('/tmp', 'input.txt');
// //         const outputFile = path.join('/tmp', 'output.txt');

// //         try {
// //             // Ensure /tmp directory exists
// //             await ensureTmpDir();

// //             // Write the code and input to files
// //             await fs.writeFile(codeFile, code);
// //             await fs.writeFile(inputFile, input);

// //             // Compile and run the code
// //             exec(`g++ ${codeFile} -o /tmp/a.out && /tmp/a.out < ${inputFile} > ${outputFile}`, async (error) => {
// //                 if (error) {
// //                     res.status(500).json({ error: error.message });
// //                     return;
// //                 }

// //                 const output = await fs.readFile(outputFile, 'utf8');
// //                 res.status(200).json({ output });
// //             });
// //         } catch (error) {
// //             res.status(500).json({ error: error.message });
// //         }
// //     } else {
// //         res.status(405).json({ error: 'Method not allowed' });
// //     }
// // }