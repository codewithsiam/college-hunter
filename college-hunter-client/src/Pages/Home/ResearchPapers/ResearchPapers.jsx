import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResearchPapers = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/researchPapers`;

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                setPapers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="py-8 px-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 mt-16 text-center">Research Papers</h2>
            <ul className="space-y-4">
                {papers?.map(paper => (
                    <li key={paper._id} className="border border-gray-200 rounded p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-xl font-semibold mb-2 sm:mb-0">{paper?.name}</h3>
                            <a
                                href={paper?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline"
                            >
                                Visit <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.293 6.293a1 1 0 011.414 0L10 10.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                        <p className="text-gray-600 mb-4">{truncateText(paper?.about, 100)}</p>
                        <a
                            href={paper?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline self-start sm:self-end"
                        >
                            Read more...
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResearchPapers;
