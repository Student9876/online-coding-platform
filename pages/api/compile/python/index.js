import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code, input } = req.body;

        const payload = {
            language: 'python',
            version: '*',
            files: [
                {
                    name: 'main.py',
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
