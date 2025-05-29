// Sebelumnya:
// const routes = {
//   "/": new HomePage(),
//   "/about": new AboutPage(),
// };

// Sudah diperbaiki ↓
import LandingPage from "../view/pages/landing/landing-page";
import LoginPage from "../view/pages/login/login-page";
import RegisterPage from "../view/pages/register/register-page";
import HomePage from "../view/pages/home/home-page";
import AboutPage from "../view/pages/about/about-page";
import StoryPage from "../view/pages/story/story-page";
import StoryDetailPage from "../view/pages/story/story-detail-page";
import BagikanPage from "../view/pages/bagikan/bagikan-page";

const routes = {
  "/": LandingPage, // landing page sebelum login
  "/login": LoginPage,
  "/register": RegisterPage,
  "/home": HomePage, // setelah login
  "/about": AboutPage,
  "/story": StoryPage, // Tambahkan ini
  "/story/:id": StoryDetailPage, // ← ini penting
  "/bagikan": BagikanPage, // ✅ Tambahkan ini
};

export default routes;
