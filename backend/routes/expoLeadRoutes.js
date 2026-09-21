import express from "express";
import {
  getExpoLeads,
  getExpoLeadById,
  updateExpoLead,
  deleteExpoLead,
  exportExpoLeadsCSV,
} from "../controllers/expoLeadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All lead management routes are protected for Admin
router.use(protect, adminOnly);

router.get("/export/csv", exportExpoLeadsCSV);
router.get("/", getExpoLeads);
router.get("/:id", getExpoLeadById);
router.put("/:id", updateExpoLead);
router.delete("/:id", deleteExpoLead);

export default router;
