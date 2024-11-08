import User from '../Model/User.Model.js';

export const requireAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id;  // Assuming you're storing the user in req.user
        const user = await User.findById(userId);
        
        // Check if the user exists and is an admin
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
