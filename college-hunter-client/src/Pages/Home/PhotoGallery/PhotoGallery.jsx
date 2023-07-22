import React, { useEffect, useState } from 'react';

const getRandomAspectRatio = () => {
  const aspectRatios = ['16/9', '4/3', '1/1', '3/2', '2/3'];
  return aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
};

const PhotoGallery = () => {
  const [allColleges, setAllColleges] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges?limit=0`);
        const data = await response.json();
        setAllColleges(data);
        setLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchColleges();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto">
      {allColleges.map((college, index) => (
        <div key={index} className={`relative overflow-hidden rounded-md aspect-w-${getRandomAspectRatio()} aspect-h-1`}>
          <img
            src={college?.groupPhoto}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
            <p className="text-sm font-semibold">{college?.collegeName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
