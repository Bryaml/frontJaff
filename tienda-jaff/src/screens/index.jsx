import React, { useEffect, useState } from 'react';
import '../output.css';
import Navbar from '../components/navbar.jsx';

const Index = ({ cart }) => {
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSegment, setSelectedSegment] = useState('');

    useEffect(() => {
        const storedSection = localStorage.getItem('selectedSection');
        const storedSegment = localStorage.getItem('selectedSegment');
        if (storedSection) setSelectedSection(storedSection);
        if (storedSegment) setSelectedSegment(storedSegment);
    }, []);

    const handleSelectSection = (sectionName, segmentName) => {
        setSelectedSection(sectionName);
        setSelectedSegment(segmentName);
        localStorage.setItem('selectedSection', sectionName);
        localStorage.setItem('selectedSegment', segmentName);
    };

    return (
        <div className="bg-[url(./assets/img/INDEX/IMG-V-4-1.jpg)] bg-cover bg-top w-full h-screen overflow-hidden relative">
            <Navbar onSelectSection={handleSelectSection} cart={cart} />
            <div className="min-h-screen text-white flex flex-col justify-between">
                <div className="flex-grow"></div>
                <div className="md:flex ml-8">
                    <div>
                        <h1 className="md:ml-14 md:mb-16 md:text-5xl text-4xl">TEMPORADA 2024</h1>
                    </div>
                    <button className="duration-200 z-0 md:mb-16 md:ml-4 md:text-xs border-2 px-8 rounded-full text-sm mb-20 py-3 border-white hover:bg-white hover:text-orange-400 md:font-bold backdrop-blur">VER MÁS</button>
                </div>
            </div>
        </div>
    );
}

export default Index;
