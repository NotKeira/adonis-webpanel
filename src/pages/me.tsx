import React, {useEffect, useState} from 'react';
import styles from '@/styles/About.module.css';
import {Layout} from '@/components/index';
import {useCookies} from "react-cookie";


const About = () => {
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
        <Layout pageName="Your Profile - Info" userProfile={userProfile}>
            <div className={styles.about}>
                <h1>About Us</h1>
                <p>Adonis </p>
            </div>
        </Layout>
    );
};

export default About;
