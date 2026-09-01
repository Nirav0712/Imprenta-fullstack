import HeroSlide from "../models/HeroSlide.js";

// @desc    Get all hero slides
// @route   GET /api/hero-slides
// @access  Public (only active slides) / Admin (all slides)
export const getHeroSlides = async (req, res) => {
    try {
        const query = req.user && req.user.role === 'admin' ? {} : { isActive: true };
        const slides = await HeroSlide.find(query).sort({ displayOrder: 1, createdAt: 1 });

        // Seeding logic if completely empty
        if (slides.length === 0 && (!req.user || req.user.role !== 'admin')) {
            return res.status(200).json({ success: true, data: [] });
        }

        res.status(200).json({ success: true, data: slides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Seed default hero slides
// @route   POST /api/hero-slides/seed
// @access  Admin
export const seedHeroSlides = async (req, res) => {
    try {
        const count = await HeroSlide.countDocuments();
        if (count > 0) {
            return res.status(400).json({ success: false, message: "Slides already exist" });
        }

        const defaultSlides = [
            {
                badge: "Flexible & Premium Packaging",
                heading: "Premium Packaging Solutions\nThat Wrap\nYour Brand",
                description: "Create a powerful shelf presence with high-quality shrink sleeve packaging designed for standout branding."
            },
            {
                badge: "Premium Paper Packaging Scodix",
                heading: "Premium Packaging Solutions\nThat Elevate\nEvery Product",
                description: "Give your products a premium identity with custom-designed mono cartons built for protection and presentation."
            },
            {
                badge: "Seamless Tube Packaging",
                heading: "Premium Tube Solutions\nMade for\nModern Brands",
                description: "Deliver quality, convenience, and visual appeal with seamless plastic tubes customized for your product."
            },
            {
                badge: "Corporate Branding Solutions",
                heading: "Powerful Branding Solutions\nThat Make You\nStand Out",
                description: "Build a consistent and memorable brand identity with customized corporate branding solutions."
            },
            {
                badge: "Creative Design Services",
                heading: "Creative Design Solutions\nThat Bring Brands\nto Life",
                description: "From concept to final artwork, we create impactful designs that communicate your brand with clarity."
            },
            {
                badge: "Premium Label Solutions",
                heading: "Premium Labels\nThat Make Products\nUnforgettable",
                description: "Make every product stand out with high-quality custom labels designed for impact, clarity, and shelf appeal."
            }
        ];

        // assign display orders
        defaultSlides.forEach((slide, idx) => slide.displayOrder = idx + 1);

        const createdSlides = await HeroSlide.insertMany(defaultSlides);
        res.status(201).json({ success: true, data: createdSlides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a hero slide
// @route   POST /api/hero-slides
// @access  Admin
export const createHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.create(req.body);
        res.status(201).json({ success: true, data: slide, message: "Slide created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a hero slide
// @route   PUT /api/hero-slides/:id
// @access  Admin
export const updateHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!slide) {
            return res.status(404).json({ success: false, message: "Slide not found" });
        }
        res.status(200).json({ success: true, data: slide, message: "Slide updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero-slides/:id
// @access  Admin
export const deleteHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.findById(req.params.id);
        if (!slide) {
            return res.status(404).json({ success: false, message: "Slide not found" });
        }
        await slide.deleteOne();
        res.status(200).json({ success: true, message: "Slide deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
