import Theme from "../models/Theme.js";

// @desc    Get active theme
// @route   GET /api/theme
// @access  Public
export const getTheme = async (req, res) => {
    try {
        let theme = await Theme.findOne();
        if (!theme) {
            theme = await Theme.create({});
        }
        res.status(200).json({ success: true, theme });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update theme
// @route   PUT /api/theme
// @access  Admin
export const updateTheme = async (req, res) => {
    try {
        let theme = await Theme.findOne();
        if (!theme) {
            theme = await Theme.create({});
        }

        const { activePreset, colors, design, typography } = req.body;

        if (activePreset) theme.activePreset = activePreset;
        if (colors) theme.colors = { ...theme.colors, ...colors };
        if (design) theme.design = { ...theme.design, ...design };
        if (typography) theme.typography = { ...theme.typography, ...typography };

        await theme.save();

        res.status(200).json({ success: true, theme });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
