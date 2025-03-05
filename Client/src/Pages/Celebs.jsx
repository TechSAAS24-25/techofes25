import React from 'react';

const celebs = [
    {
        name: 'AKHILAN ',
        event: 'T-Awards',
        photo: '/media/Celebs/akhil.png'
    },
    {
        name: 'DHILIP SUBBARAYAN',
        event: 'T-Awards',
        photo: '/media/Celebs/dhileep.jpg'
    },
    {
        name: 'DIWAKAR',
        event: 'T-Awards',
        photo: '/media/Celebs/diwa.png'
    },
    {
        name: 'KADHAIPOMA TEAM',
        event: 'T-Awards',
        photo: '/media/Celebs/kadhaipoma.jpg'
    },
    {
        name: 'PAVISH',
        event: 'T-Awards',
        photo: '/media/Celebs/pavish.jpg'
    },
    {
        name: 'PAVITHRA LAKSHMI',
        event: 'T-Awards',
        photo: '/media/Celebs/pavithra.jpg'
    },
    {
        name: 'POOJA VENKAT',
        // event: 'Event 2',
        event: 'T-Awards',
        photo: '/media/Celebs/pooja.jpg'
    },
    {
        name: 'ROSHNI HARIPRIYAN',
        // event: 'Event 2',
        event: 'T-Awards',
        photo: '/media/Celebs/roshini.jpg'
    },

    {
        name: 'SAKSHI AGARWAL',
        // event: 'Event 2',
        event: 'T-Awards',
        photo: '/media/Celebs/akhil.png'
    },
    {
        name: 'SRINISHA',
        event: 'T-Awards',
        photo: '/media/Celebs/srini.jpg'
    },
    // Add more celebrities as needed
];

const Celebs = () => {
    return (
        <div className="relative min-h-screen p-8">
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="../assets/videos/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-center mb-8">Celebrities Coming to Techofes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {celebs.map((celeb, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img className="h-48 w-full object-cover md:w-48" src={celeb.photo} alt={celeb.name} />
                                </div>
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900">{celeb.name}</h2>
                                    <p className="mt-2 text-gray-600">{celeb.event}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Celebs;