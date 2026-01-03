import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ReviewSection = ({ scholarshipId }) => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch Reviews
    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/reviews/${scholarshipId}`);
            setReviews(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (scholarshipId) fetchReviews();
    }, [scholarshipId]);

    // Submit Review
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return Swal.fire("Login Required", "Please login to leave a review", "warning");

        const reviewBody = {
            scholarshipId,
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
            rating,
            comment,
        };

        try {
            await api.post('/reviews', reviewBody);
            setComment("");
            setRating(5);
            fetchReviews(); // Refresh list
            Swal.fire("Success", "Review submitted!", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to submit review", "error");
        }
    };

    return (
        <div className="space-y-10">
            {/* Add Review Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`text-2xl cursor-pointer transition-colors ${star <= rating ? 'text-yellow-400' : 'text-slate-300'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <textarea
                        required
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                        placeholder="Share your experience with this scholarship..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" className="bg-[#137fec] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                        Submit Review
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900">Student Reviews ({reviews.length})</h3>
                {loading ? (
                    <p className="text-slate-400">Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev._id} className="flex gap-4 p-6 border-b border-slate-100 last:border-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100">
                                {rev.userPhoto ? <img src={rev.userPhoto} alt="" className="w-full h-full object-cover" /> : <FaUserCircle className="w-full h-full text-slate-300" />}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="font-bold text-slate-900">{rev.userName}</h4>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">{new Date(rev.date).toLocaleDateString()}</p>
                                <p className="text-slate-600 mt-2 leading-relaxed">{rev.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-400 border border-dashed rounded-2xl">
                        No reviews yet. Be the first to review!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;