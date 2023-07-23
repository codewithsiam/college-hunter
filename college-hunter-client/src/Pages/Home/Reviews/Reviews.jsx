import React from 'react';
import useReviews from '../../../Hooks/useReviews';
import Marquee from 'react-fast-marquee';
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Reviews = () => {

    const [reviews, loading] = useReviews();
    console.log('Loading reviews', reviews);

    return (
        <section className="bg-gray-200 py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Reviews and Feedback</h2>

                </div>
                <div className="mt-10">
                    <Marquee direction="left"
                        speed={30}
                        pauseOnClick={true}
                    >
                        {reviews?.map((review) => (
                            <div key={review?._id} className="bg-white rounded-md shadow-md p-6 mx-4">

                                <p className="text-gray-700 w-80 h-32">{review?.review}</p>
                                <div className="flex items-center justify-start mt-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-12 h-12 rounded-full" src={review?.collegeImage} alt={review?.collegeName} />
                                    </div>
                                    <div className="ml-3 flex justify-between items-end ">
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-900">{review?.candidateName}</h3>
                                            <h2 className='text-md'>{review?.collegeName}</h2>
                                        </div>
                                        <div className="flex gap-1"><Rating
                                            style={{ maxWidth: 90 }}
                                            value={review?.rating}
                                            readOnly
                                        ></Rating>
                                            {review?.rating}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default Reviews;