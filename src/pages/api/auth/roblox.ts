import {NextApiRequest, NextApiResponse} from "next";

const clientId = process.env.ROBLOX_CLIENT_ID || '';
const clientSecret = process.env.ROBLOX_CLIENT_SECRET || '';
const redirectUri = process.env.ROBLOX_REDIRECT_URI || 'http://localhost:3000/api/auth/roblox/callback';
const robloxAuthUrl = 'https://apis.roblox.com/oauth/v1/authorize';
const robloxTokenUrl = 'https://apis.roblox.com/oauth/v1/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const authUrl = `${robloxAuthUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile`;
        res.redirect(authUrl);
    } else {
        res.status(405).json({ error: 'Method Not Allowed'})
    }
};