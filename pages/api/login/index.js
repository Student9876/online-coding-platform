
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { email, password } = req.body;

        if (email === 'abc@gmail.com' && password === '123123') {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};