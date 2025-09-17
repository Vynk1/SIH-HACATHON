const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createAchievement,
  getAllAchievements,
  getMyAchievements,
  getAchievementsByUserId,
  updateAchievement,
  deleteAchievement,
  toggleAchievementVisibility
} = require("../controller/achievement.controller");

// Public routes
router.get("/", getAllAchievements); // GET /achievements - Get all visible achievements (Hall of Fame)
router.get("/user/:userId", getAchievementsByUserId); // GET /achievements/user/:userId - Get achievements by specific user

// Alumni only routes
router.post("/", auth(["alumni"]), createAchievement); // POST /achievements - Create new achievement (Alumni only)
router.get("/my/achievements", auth(["alumni"]), getMyAchievements); // GET /achievements/my/achievements - Get current user's achievements (Alumni only)
router.put("/:achievementId", auth(["alumni"]), updateAchievement); // PUT /achievements/:achievementId - Update achievement (Owner only)
router.delete("/:achievementId", auth(["alumni"]), deleteAchievement); // DELETE /achievements/:achievementId - Delete achievement (Owner only)
router.patch("/:achievementId/visibility", auth(["alumni"]), toggleAchievementVisibility); // PATCH /achievements/:achievementId/visibility - Toggle visibility (Owner only)

module.exports = router;
