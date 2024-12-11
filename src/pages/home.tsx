import React, {useEffect, useState} from 'react';
import styles from '@/styles/Dashboard.module.css';
import {Layout} from '@/components/index';
import {useCookies} from 'react-cookie';
import Link from "next/link";

export default function Home() {
    const [cookies] = useCookies(['user_profile']);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const auth = query.get('auth');
        const check = query.get('check');

        if (auth === 'success' && check === 'true') {
            setAuthSuccess(true);
        }
        const profileCookie = cookies.user_profile;
        if (profileCookie) {
            try {
                setUserProfile(profileCookie);
            } catch (error) {
                console.error('Error parsing user profile cookie:', error);
            }
        }

    }, [cookies]);

    return (
        <Layout userProfile={userProfile}
                alert={authSuccess ? {type: 'info', message: 'Successfully authenticated!'} : null}
                pageName="Dashboard - Main Menu">
            <div className={styles.dashboard}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Hello, {userProfile ? userProfile.name : 'User'}!</h2>
                    <p className={styles.sectionText}>
                        Welcome to the dashboard. I hope you're having a great day. If you have any questions or need
                        help, please don't hesitate to reach out on our <Link className={styles.link}
                                                                              href="https://discord.gg/epix">Discord</Link>!
                    </p>
                    <div className={styles.sectionButtons}>
                        <Link className={styles.button} href="/dashboard/commands">
                            Commands
                        </Link>
                        <Link className={styles.button} href="/dashboard/leaderboard">
                            Leaderboard
                        </Link>
                        <Link className={styles.button} href="/dashboard/settings">
                            Settings
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
