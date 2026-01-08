interface HeroSectionProps {
  isLoading: boolean;
}

const HeroSection = ({ isLoading }: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background image container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero-image.png")',
        }}
      >
        {/* Subtle dark overlay for contrast (max 20%) */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
};

export default HeroSection;