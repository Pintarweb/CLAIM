
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Workflow from '../components/Workflow';
import TrustSnippet from '../components/TrustSnippet';
import Compliance from '../components/Compliance';
import Features from '../components/Features';
import Mission from '../components/Mission';
import SuccessState from '../components/SuccessState';

const LandingPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSuccess = new URLSearchParams(location.search).get('success') === 'true';

    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const elementId = (location.state as any).scrollTo;
            const timer = setTimeout(() => {
                document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
                // Clean up state so it doesn't scroll again on refresh (optional, but good practice)
                window.history.replaceState({}, document.title);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleFormSubmit = (email: string) => {
        navigate('?success=true', { state: { email } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {!isSuccess ? (
                <>
                    <Hero />
                    <Workflow />
                    <Compliance />
                    <TrustSnippet />
                    <Features />
                    <Mission onSubmit={handleFormSubmit} />
                </>
            ) : (
                <SuccessState onBack={() => navigate('/')} />
            )}
        </>
    );
};

export default LandingPage;
