import React from 'react';
import styles from '../styles/Landing.module.css';
import {HeadX} from '@/components/index';
import {useRouter} from "next/router";
import {useEffect} from "react";
import Link from "next/link";

const Landing = () => {
    const router = useRouter();
    const {query} = router;

    useEffect(() => {
        if (query.error) {
            console.error('OAuth Error:', query.error);
        }

        if (query.code) {
            fetch('/api/auth/roblox/callback?code='+query.code).then((res) => res.json()).then((data) => {
                console.log('OAuth Success:', data);
            }).catch((err) => {
                console.error('OAuth Error:', err);
            });
        }
    }, [query]);

    return (
        <div className={styles.container}>
            <HeadX/>
            <div className={styles['logo-container']}>
                <img className={styles.logo} src="/logo.png" alt="Adonis Logo"/>
            </div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Please Authorise Roblox to use the Adonis Web Panel
                </h1>
                    <Link className={styles.loginButton} href='/api/auth/roblox'>Authorise Roblox</Link>
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2024 Epix Incorporated. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;