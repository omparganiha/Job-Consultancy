import React, { useState } from "react";
import {
  Star,
  Plus,
  Trash2,
  ThumbsUp,
  X,
  CheckCircle2,
  Briefcase,
  Calendar,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    company: "TechCorp Solutions",
    role: "Frontend Developer",
    rating: 5,
    date: "12 Oct 2024",
    title: "Great work culture and learning environment",
    pros: "Flexible work hours, helpful seniors, regular tech talks.",
    cons: "Appraisal process can be a bit slow.",
    status: "Published",
    helpfulCount: 14,
  },
  {
    id: 2,
    company: "InnoSoft Systems",
    role: "React Native Developer",
    rating: 4,
    date: "28 Sep 2024",
    title: "Good projects but tight deadlines",
    pros: "High exposure to modern stack, remote work option.",
    cons: "Sometimes requires working on weekends.",
    status: "Published",
    helpfulCount: 8,
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    rating: 5,
    title: "",
    pros: "",
    cons: "",
  });

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.title) return;

    const newReview = {
      id: Date.now(),
      company: formData.company,
      role: formData.role || "Job Seeker",
      rating: formData.rating,
      date: "Just now",
      title: formData.title,
      pros: formData.pros,
      cons: formData.cons,
      status: "Published",
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setFormData({ company: "", role: "", rating: 5, title: "", pros: "", cons: "" });
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleHelpful = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      
      {/* Top Write a Review Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            My Workplace Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage and view your submitted company feedback.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-orange-500/25 hover:shadow-lg"
        >
          <Plus size={18} />
          Write a Review
        </button>
      </div>

      {/* Reviews Cards List - 2 Column Grid (Ek line me do cards) */}
      {reviews.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="text-slate-700 font-semibold text-lg">No reviews yet</h3>
          <p className="text-slate-400 text-sm mt-1">
            Click "+ Write a Review" to add your first company review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col justify-between space-y-3.5 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Main Body */}
              <div className="space-y-3">
                {/* Header Info */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                      {rev.company.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 text-sm truncate group-hover:text-orange-600 transition-colors">
                        {rev.company}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate">
                          <Briefcase size={11} className="text-slate-400 shrink-0" />
                          <span className="truncate">{rev.role}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-slate-400 shrink-0">
                          <Calendar size={11} />
                          {rev.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-lg text-amber-700 font-bold text-xs">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>

                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">
                  "{rev.title}"
                </h4>

                {/* Pros & Cons Vertical Stack */}
                <div className="space-y-2 pt-1">
                  {/* Pros */}
                  <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-xl space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      <Check size={13} className="text-emerald-600" />
                      Pros
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.pros || "No pros specified."}
                    </p>
                  </div>

                  {/* Cons */}
                  <div className="bg-rose-50/60 border border-rose-100 p-2.5 rounded-xl space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                      <AlertCircle size={13} className="text-rose-600" />
                      Cons
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.cons || "No cons specified."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs mt-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                  <CheckCircle2 size={12} /> {rev.status}
                </span>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-orange-500 font-semibold bg-slate-50 hover:bg-orange-50 px-2.5 py-1 rounded-lg transition-all border border-slate-200/60 hover:border-orange-200 text-[11px]"
                >
                  <ThumbsUp size={12} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form for Writing a Review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Write a Company Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, TechCorp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Your Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= formData.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Great learning experience and good team"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Pros
                </label>
                <textarea
                  rows={2}
                  placeholder="What did you like about working here?"
                  value={formData.pros}
                  onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Cons
                </label>
                <textarea
                  rows={2}
                  placeholder="What could be improved?"
                  value={formData.cons}
                  onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-500/20 transition-all"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;