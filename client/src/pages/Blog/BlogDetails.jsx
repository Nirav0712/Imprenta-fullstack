import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiTag, FiShare2 } from 'react-icons/fi';

const blogPosts = [
    {
        id: "1",
        title: "Latest Trends in Custom Packaging for 2026",
        content: `
            <p>The packaging industry is rapidly evolving, driven by new technologies and a growing demand for sustainability. In 2026, we are seeing a massive shift towards biodegradable materials that don't compromise on durability or aesthetics.</p>
            <br/>
            <h3>Smart Unboxing Experiences</h3>
            <p>Interactive packaging featuring QR codes and augmented reality (AR) is becoming standard. Brands are using the unboxing moment to directly engage consumers, offering instructional videos and exclusive interactive content the moment the box is opened.</p>
            <br/>
            <h3>Minimalist and Bold Designs</h3>
            <p>While materials get eco-friendly, designs are getting bolder. High-contrast colors, minimalist typography, and the use of negative space help products stand out on both digital and physical shelves.</p>
        `,
        category: "Industry Trends",
        date: "Aug 20, 2026",
        image: "https://placehold.co/1200x600/0F1F38/38BDF8?text=Packaging+Trends"
    },
    {
        id: "2",
        title: "How to Choose the Right Paper Stock for Business Cards",
        content: `
            <p>A business card is often the first physical impression of your brand. The tactile feel of the card speaks volumes before the recipient even reads a single word.</p>
            <br/>
            <h3>Understanding Paper Weights</h3>
            <p>Paper weight is measured in GSM (Grams per Square Meter). Standard business cards are usually printed on 300gsm stock. For a premium feel, 350gsm or even duplexed 600gsm stock provides a rigid, luxurious experience.</p>
            <br/>
            <h3>Finishes and Textures</h3>
            <p>Matte lamination provides a smooth, elegant feel, while gloss makes colors pop. Uncoated textured papers offer a raw, organic aesthetic that is highly sought after by creative agencies and boutique brands.</p>
        `,
        category: "Guides",
        date: "Aug 15, 2026",
        image: "https://placehold.co/1200x600/0F1F38/38BDF8?text=Paper+Stock"
    },
    {
        id: "3",
        title: "The Importance of Color Consistency in Brand Identity",
        content: `
            <p>Color consistency across all marketing mediums is vital for building brand recognition and trust. When your logo looks different on a flyer compared to a product box, it creates subconscious doubt in the consumer's mind.</p>
            <br/>
            <h3>Pantone Matching System (PMS)</h3>
            <p>Using Pantone colors ensures that your specific brand hue is exactly the same, no matter what substrate it is printed on. PMS provides a universal language of color for designers and printers.</p>
        `,
        category: "Branding",
        date: "Aug 10, 2026",
        image: "https://placehold.co/1200x600/0F1F38/38BDF8?text=Color+Consistency"
    },
    {
        id: "4",
        title: "Sustainable Printing Processes: What You Need to Know",
        content: `
            <p>Sustainability is no longer a buzzword; it is an industry standard. Modern printing processes have adapted to lower their environmental impact significantly.</p>
            <br/>
            <h3>Soy and Vegetable-Based Inks</h3>
            <p>Traditional petroleum-based inks release volatile organic compounds (VOCs) into the air. Soy-based inks are highly renewable, release minimal VOCs, and often produce brighter, more vibrant colors.</p>
        `,
        category: "Sustainability",
        date: "Jul 28, 2026",
        image: "https://placehold.co/1200x600/0F1F38/38BDF8?text=Sustainable+Printing"
    }
];

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <button onClick={() => navigate('/blog')} className="text-slate-400 hover:text-sky-400 transition-colors font-semibold flex items-center gap-2 mb-8">
                    <FiArrowLeft /> Back to Articles
                </button>

                <div className="flex items-center gap-4 mb-6 text-sm">
                    <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-semibold flex items-center gap-1"><FiTag size={12} /> {post.category}</span>
                    <span className="text-slate-400 flex items-center gap-1"><FiClock size={12} /> {post.date}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 leading-tight">
                    {post.title}
                </h1>

                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
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
