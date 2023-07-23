import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative px-2 z-10 pt-8 mt-20 bg-sky-100">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 sm:w-2/3 lg:w-4/12">
                        <div className="mb-10 w-full">
                            <Link to="/" className="mb-6 inline-block">
                                <img
                                    src="/path/to/logo" // Replace with the path to your logo image
                                    alt="College Hunter Logo"
                                    className="h-9 w-full"
                                />
                            </Link>
                            <p className="text-body-color mb-7 text-base">
                                <span className="font-semibold">College Hunter:</span> Unleash the magic of play with our curated collection of quality toys. Ignite imagination, learning, and endless fun for children of all ages.
                            </p>
                        </div>
                    </div>

                    {/* Add other footer sections as needed (Quick Links, Contact Us, Follow Us On) */}
                    {/* Replace the URLs in the links with your actual URLs */}
                    {/* Replace the social media links with your actual social media profiles */}

                    <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                        <div className="mb-10 w-full">
                            <h4 className="text-dark mb-9 text-lg font-semibold">Quick Links</h4>
                            <ul>
                                <li>
                                    <Link
                                        to="/premium-support"
                                        className="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                                    >
                                        Premium Support
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/college"
                                        className="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                                    >
                                        All Colleges
                                    </Link>
                                </li>
                                {/* Add more quick links as needed */}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                        <div className="mb-10 w-full">
                            <h4 className="text-dark mb-9 text-lg font-semibold">Contact Us</h4>
                            <ul>
                                <li>
                                    <span className="text-body-color mb-2 inline-block text-base leading-loose">
                                        Email: contact@collegehunter.com
                                    </span>
                                </li>
                                <li>
                                    <span className="text-body-color mb-2 inline-block text-base leading-loose">
                                        Phone: +1 123-456-7890
                                    </span>
                                </li>
                                <li>
                                    <span className="text-body-color mb-2 inline-block text-base leading-loose">
                                        Address: 123 College Street, City, Country
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
                        <div className="mb-10 w-full">
                            <h4 className="text-dark mb-9 text-lg font-semibold">Follow Us On</h4>
                            <div className="mb-6 flex items-center">
                                <Link
                                    to="https://www.facebook.com/collegehunter"
                                    className="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                                >
                                    <svg
                                        width="8"
                                        height="16"
                                        viewBox="0 0 8 16"
                                        className="fill-current"
                                    >
                                        {/* Add Facebook icon */}
                                    </svg>
                                </Link>
                                <Link
                                    to="https://twitter.com/collegehunter"
                                    className="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                                >
                                    <svg
                                        width="16"
                                        height="12"
                                        viewBox="0 0 16 12"
                                        className="fill-current"
                                    >
                                        {/* Add Twitter icon */}
                                    </svg>
                                </Link>

                                {/* Add more social media icons as needed */}
                            </div>
                            <p className="text-body-color text-base">&copy; {new Date().getFullYear()} College Hunter</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
