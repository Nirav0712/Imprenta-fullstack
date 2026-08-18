import HomePage from "../models/HomePage.js";

// Get homepage content
export const getHomePageData = async (req, res) => {
    try {
        let homepage = await HomePage.findOne();
        if (!homepage) {
            homepage = await HomePage.create({});
        }
        res.status(200).json({ success: true, data: homepage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update homepage content
export const updateHomePageData = async (req, res) => {
    try {
        let homepage = await HomePage.findOne();
        if (!homepage) {
            homepage = await HomePage.create(req.body);
        } else {
            Object.assign(homepage, req.body);
            await homepage.save();
        }
        res.status(200).json({ success: true, data: homepage, message: "Homepage updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
