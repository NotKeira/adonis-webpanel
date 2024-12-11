import React, {useEffect, useState} from 'react';
import styles from '@/styles/Error.module.css';
import {Layout} from '@/components/index';
import {useRouter} from 'next/router';
import {useCookies} from "react-cookie";

const About = () => {
    const router = useRouter();

    const handleReturn = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (router.asPath) {
            router.back();
        } else {
            router.push('/home');
        }
    };

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
        <Layout pageName={"Uhoh something went wrong!"} userProfile={userProfile}>
            <div className={styles.error}>
                <h1>404 - Not Found</h1>
                <p>Well.. this isn't good.<br/>It seems like you've wandered on a bad page!</p>
                {/*@ts-ignore*/}
                <button className={styles.returnLink} onClick={handleReturn}>Here's a link back to the page you were
                    just on :)
                </button>
            </div>
        </Layout>
    );
};

export default About;