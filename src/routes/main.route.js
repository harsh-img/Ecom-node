import express from 'express';
import adminRoutes from './admin.routes.js';
import customerRoutes from './customer.routes.js';
// import subAdminRoutes from './subAdmin.routes.js';

const router = express.Router();

router.use('/admin',adminRoutes);
// router.use('/subadmin',subAdminRoutes);
router.use('/customer',customerRoutes);

router.get("/", (req, res) => {
  res.send("home-page", { title: "Ecommerce Home" });
});


export default router;