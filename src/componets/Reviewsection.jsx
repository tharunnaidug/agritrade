import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Reviewsection = ({ productId, userId }) => {
    const [existingReview, setExistingReview] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    const fetchReview = async () => {
        try {
            const res = await axios.get(`${url}/review/${productId}`);
            const userReview = res.data.find((r) => r.user._id === userId);
            if (userReview) {
                setExistingReview(userReview);
            }
        } catch (err) {
            console.error("Error fetching review:", err);
        }
    };

    useEffect(() => {
        fetchReview();
    }, [productId, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${url}/user/review/${productId}`, {
                rating,
                comment,
            });
            toast.success("Review added!", {
                position: "bottom-left",
                autoClose: 5000,
                theme: "dark",
                transition: Bounce,
            });
            setExistingReview(res.data.review);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Error submitting review!",
                { position: "bottom-left", autoClose: 5000, theme: "dark", transition: Bounce }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-2 ms-5">
            {existingReview ? (
                <div className="border p-2 rounded bg-light">
                    <p className="mb-1"><strong>Your Review:</strong></p>
                    <p className="mb-1">⭐ {existingReview.rating}</p>
                    <p className="mb-0">{existingReview.comment}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="border p-2 rounded">
                    <div className="mb-2">
                        <label className="form-label me-2">Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="form-select w-auto d-inline"
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {r} Star{r > 1 && "s"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <textarea
                            className="form-control"
                            placeholder="Write your review..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary btn-sm" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Reviewsection;
