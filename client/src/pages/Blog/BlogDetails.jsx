import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiTag, FiShare2 } from 'react-icons/fi';
import { fetchBlogBySlug } from '../../services/api';

const BlogDetails = () => {
    // We treat the matching parameter in URL /blog/:id as a slug or id
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const loadPost = async () => {
            try {
                setLoading(true);
                const res = await fetchBlogBySlug(id);
                setPost(res?.blog || null);
            } catch (error) {
                console.error("Failed to load blog details", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) loadPost();
    }, [id]);

    const formatDate = (dateValue) => {
        if (!dateValue) return "N/A";
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-center text-white flex flex-col items-center justify-center">
                <h2 className="text-slate-400 text-xl font-semibold mb-4 animate-pulse">Loading article...</h2>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-center text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <button onClick={() => navigate('/blog')} className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-2">
                    <FiArrowLeft /> Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 max-w-7xl mx-auto">
                <button onClick={() => navigate('/blog')} className="text-slate-400 hover:text-sky-400 transition-colors font-semibold flex items-center gap-2 mb-8">
                    <FiArrowLeft /> Back to Articles
                </button>

                <div className="flex items-center gap-4 mb-6 text-sm">
                    <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                        <FiTag size={12} /> News
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                        <FiClock size={12} /> {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 leading-tight">
                    {post.title}
                </h1>

                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 bg-[#0A1220]">
                    <img src={post.image || "https://placehold.co/1200x600/0F1F38/38BDF8?text=Image+Not+Found"} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-lg prose-invert prose-sky max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors">
                        <FiShare2 /> Share this article
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
