
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Workflow from '../components/Workflow';
import TrustSnippet from '../components/TrustSnippet';
import Compliance from '../components/Compliance';
import Features from '../components/Features';
import Mission from '../components/Mission';
import FAQ from '../components/FAQ';

const LandingPage: React.FC = () => {
    const location = useLocation();

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

    return (
        <>
            <Hero />
            <Workflow />
            <Compliance />
            <TrustSnippet />
            <Features />
            <FAQ />
            <Mission />
        </>
    );
};

export default LandingPage;
