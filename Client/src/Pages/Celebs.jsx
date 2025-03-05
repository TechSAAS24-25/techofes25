import React from 'react';

const celebs = [
    {
        // name: 'AKHILAN ',
        // event: 'Event 1',
        photo: '../../public/media/Celebs/akhil.png'
    },
    {
        // name: 'DHILEEP',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/dhileep.jpg'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/diwa.png'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/kadhaipoma.jpg'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/pavish.jpg'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/pavithra.jpg'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/pooja.jpg'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/roshini.jpg'
    },

    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/sakshi.png'
    },
    {
        // name: 'Celebrity Name 2',
        // event: 'Event 2',
        photo: '../../public/media/Celebs/srini.jpg'
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