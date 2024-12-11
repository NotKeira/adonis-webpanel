import React, {ReactNode} from 'react';
import styles from '@/styles/Layout.module.css';
import {HeadX} from '@/components/index';
import Link from "next/link";

interface LayoutProps {
    children: ReactNode;
    pageName?: string;
    alert?: { message: string; type: 'error' | 'success' | 'info' | 'warning'; } | null;
    userProfile?: { picture: string; name: string; preferred_username: string; sub: string | number; };
}

const Layout: React.FC<LayoutProps> = ({children, userProfile, pageName, alert}) => {
    return (
        <div className={styles.container}>
            <HeadX/>
            <aside className={styles.sidebar}>
                <img className={styles.logo} src="/logo.png" alt="Adonis Logo"/>
                <nav className={styles.nav}>
                    <a href="/home">Home</a>
                    <a href="/g/list">Your Games</a>
                    <a href="/about-us/developers">Credits</a>
                </nav>
                {alert && (
                    <div className={`${styles.flagPanel} ${styles[alert.type]}`}>
                        {alert.message}
                    </div>
                )}
                {userProfile && (
                    <Link className={styles.profileButton} href="/me">
                        <img
                            src={userProfile.picture || '/default-avatar.png'}
                            alt="Profile"
                            className={styles.profileImage}
                        />
                        <span>{userProfile.name} (@{userProfile.preferred_username})<br/>{userProfile.sub}</span>
                    </Link>
                )}
            </aside>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>{pageName}</h1>
                </header>
                <div className={styles.content}>{children}</div>
                <footer className={styles.footer}>
                    Copyright &copy;  Epix Incorporated - <a href="/status">[Status]</a>
                </footer>
            </div>
        </div>
    );
};

export default Layout;