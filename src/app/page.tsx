import { Navbar, Hero, About, Services, Portfolio, Contact } from '@/components';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
        </main>
    );
}
