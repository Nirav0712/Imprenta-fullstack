import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../services/api';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                // Only fetch published blogs for the public site
                const res = await fetchBlogs({ status: "published" });
                setBlogs(res?.blogs || []);
            } catch (error) {
                console.error("Failed to load blogs", error);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    const featuredPost = blogs.length > 0 ? blogs[0] : null;
    const regularPosts = blogs.length > 1 ? blogs.slice(1) : [];

    const formatDate = (dateValue) => {
        if (!dateValue) return "N/A";
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <div className="text-center mb-16">
                    <h4 className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3">Insights & News</h4>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Blog</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Expert advice, industry trends, and deep dives into the world of professional printing and packaging.</p>
                </div>

                {loading ? (
                    <div className="text-center text-slate-400 py-12">Loading articles...</div>
                ) : blogs.length === 0 ? (
                    <div className="text-center text-slate-400 py-12">No published news or articles found at the moment. Please check back later!</div>
                ) : (
                    <>
                        {/* Featured Post */}
                        {featuredPost && (
                            <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-sky-400/50 transition-all duration-300">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-3/5 aspect-video md:aspect-auto md:h-[450px] overflow-hidden bg-[#0A1220]">
                                        <img src={featuredPost.image || "https://placehold.co/800x500/0F1F38/38BDF8?text=Image+Not+Found"} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-6 text-sm">
                                            <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                                <FiTag size={12} /> News
                                            </span>
                                            <span className="text-slate-400 flex items-center gap-1">
                                                <FiClock size={12} /> {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-sky-400 transition-colors leading-tight">{featuredPost.title}</h2>
                                        <p className="text-slate-300 text-lg leading-relaxed mb-8">{featuredPost.excerpt}</p>
                                        <span className="inline-flex items-center text-sky-400 font-bold group-hover:gap-3 gap-2 transition-all">Read Article <FiArrowRight /></span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Grid */}
                        {regularPosts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularPosts.map(post => (
                                    <Link to={`/blog/${post.slug}`} key={post._id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-300">
                                        <div className="aspect-video overflow-hidden bg-[#0A1220]">
                                            <img src={post.image || "https://placehold.co/800x500/0F1F38/38BDF8?text=Image+Not+Found"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-4 text-xs font-semibold">
                                                <span className="text-sky-400">News</span>
                                                <span className="text-slate-500">{formatDate(post.publishedAt || post.createdAt)}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors line-clamp-2">{post.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                                            <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-sky-400 transition-colors">Read More <FiArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
