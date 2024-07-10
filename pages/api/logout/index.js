import { serialize } from 'cookie';

export default function handler(req, res) {
  const serialized = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  });

  res.setHeader('Set-Cookie', serialized);
  res.status(200).json({ message: 'Logout successful' });
}
