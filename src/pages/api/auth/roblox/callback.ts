import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import * as cookie from 'cookie';

const CLIENT_ID = process.env.ROBLOX_CLIENT_ID || '';
const CLIENT_SECRET = process.env.ROBLOX_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.ROBLOX_REDIRECT_URI || 'http://localhost:3000/api/auth/roblox/callback';
const ROBLOX_TOKEN_URL = 'https://apis.roblox.com/oauth/v1/token';

export default async function callbackHandler(req: NextApiRequest, res: NextApiResponse) {
    const {code} = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({error: 'Missing or invalid authorization code'});
    }

    try {
        const tokenResponse = await axios.post(
            ROBLOX_TOKEN_URL,
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const {access_token, refresh_token, expires_in} = tokenResponse.data;

        const profileResponse = await axios.get('https://apis.roblox.com/oauth/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const profile = profileResponse.data;

        res.setHeader('Set-Cookie', [
            cookie.serialize('access_token', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: expires_in,
                path: '/',
            }),
            cookie.serialize('refresh_token', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            }),
            cookie.serialize('user_profile', JSON.stringify(profile), {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            }),
        ]);

        res.status(200).redirect('/home?auth=success&check=true');
    } catch (error) {
        console.error('Error during callback:', error);
        res.status(500).json({error: 'Failed to complete authentication'});
    }
}
