import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';

const Dashboard = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return <p>Redirecting...</p>;
    }

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
};

export default Dashboard;
