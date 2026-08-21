import React from 'react';
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const blogPosts = [
    {
        id: "1",
        title: "Latest Trends in Custom Packaging for 2026",
        excerpt: "Discover the innovative materials and designs taking the packaging industry by storm this year, from eco-friendly alternatives to smart unboxing experiences.",
        category: "Industry Trends",
        date: "Aug 20, 2026",
        image: "https://placehold.co/800x500/0F1F38/38BDF8?text=Packaging+Trends"
    },
    {
        id: "2",
        title: "How to Choose the Right Paper Stock for Business Cards",
        excerpt: "A comprehensive guide to understanding paper weights, textures, and finishes to ensure your business card leaves a lasting premium impression.",
        category: "Guides",
        date: "Aug 15, 2026",
        image: "https://placehold.co/800x500/0F1F38/38BDF8?text=Paper+Stock"
    },
    {
        id: "3",
        title: "The Importance of Color Consistency in Brand Identity",
        excerpt: "Why Pantone matching and rigorous color calibration during the printing process are essential for maintaining your brand's visual authority.",
        category: "Branding",
        date: "Aug 10, 2026",
        image: "https://placehold.co/800x500/0F1F38/38BDF8?text=Color+Consistency"
    },
    {
        id: "4",
        title: "Sustainable Printing Processes: What You Need to Know",
        excerpt: "Learn how modern flexo and offset presses are reducing carbon footprints through soy-based inks and energy-efficient operations.",
        category: "Sustainability",
        date: "Jul 28, 2026",
        image: "https://placehold.co/800x500/0F1F38/38BDF8?text=Sustainable+Printing"
    }
];

const Blog = () => {
    const featuredPost = blogPosts[0];
    const regularPosts = blogPosts.slice(1);

    return (
        <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <div className="text-center mb-16">
                    <h4 className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3">Insights & News</h4>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Blog</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Expert advice, industry trends, and deep dives into the world of professional printing and packaging.</p>
                </div>

                {/* Featured Post */}
                <Link to={`/blog/${featuredPost.id}`} className="group block mb-16 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-sky-400/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-3/5 aspect-video md:aspect-auto md:h-[450px] overflow-hidden">
                            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6 text-sm">
                                <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-semibold flex items-center gap-1"><FiTag size={12} /> {featuredPost.category}</span>
                                <span className="text-slate-400 flex items-center gap-1"><FiClock size={12} /> {featuredPost.date}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-sky-400 transition-colors leading-tight">{featuredPost.title}</h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">{featuredPost.excerpt}</p>
                            <span className="inline-flex items-center text-sky-400 font-bold group-hover:gap-3 gap-2 transition-all">Read Article <FiArrowRight /></span>
                        </div>
                    </div>
                </Link>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map(post => (
                        <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-video overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4 text-xs font-semibold">
                                    <span className="text-sky-400">{post.category}</span>
                                    <span className="text-slate-500">{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                                <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-sky-400 transition-colors">Read More <FiArrowRight size={14} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
