import SideNavigator from "./components/side-navigator";
import HeroSection from "./sections/hero-section";

function App() {
    return (
        <div className="w-full overflow-auto h-dvh bg-zinc-950 scroll-smooth text-zinc-300 font-chillax">
            <SideNavigator />
            <HeroSection />
        </div>
    );
}

export default App;
