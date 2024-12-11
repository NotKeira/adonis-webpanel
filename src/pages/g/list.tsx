import React, {useEffect, useState} from 'react';
import styles from '@/styles/Games.List.module.css';
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
    let gameId = null;
    return (
        <Layout userProfile={userProfile}
                alert={authSuccess ? {type: 'info', message: 'Successfully authenticated!'} : null}
                pageName="Games - List">
            <div className={styles.dashboard}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Your Games using Adonis</h2>
                    <div className={styles.gridContainer}>
                        <div className={styles.grid}>
                            <Link className={styles.card} href={`/g/${gameId || '1'}`}>
                                <img src="/cdn/images/game1.jpg" alt="icon"/>
                                <h3>Game 1</h3>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
