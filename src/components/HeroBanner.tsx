import Banner from "../assets/bg.avif";

function HeroBanner() {
  return (
    <div className="hero-banner">
      <img src={Banner} alt="Background" className="hero-image" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
        <div className="mx-8">
          <h1 className="text-white text-4xl sm:text-5xl font-bold text-center">
            Bienvenue sur mon portfolio
          </h1>
          <p className="text-white text-2xl sm:text-3xl mt-4 text-center">
            Je suis Andréa DUHAMEL, développeur web passionné par la création de
            sites et d'applications web.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
