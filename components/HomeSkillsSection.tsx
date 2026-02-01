"use client";

const HomeSkillsSection = () => {
  const skills = [
    {
      title: "Game Design",
      description: "Skilled in gameplay systems, player psychology, narrative design, and core design fundamentals to deliver engaging game experiences.",
      image: "/images/game-design.png",
      alt: "Game Design logo",
    },
    {
      title: "Level Design",
      description: "Strong understanding of player flow, engagement, and spatial design to create intuitive, immersive, and readable gameplay spaces.",
      image: "/images/level-design.png",
      alt: "Level Design logo",
    },
    {
      title: "Art & Visual Design",
      description: "Strong foundation in 3D modeling, texturing, and visual composition, supporting clear readability and believable game environments.",
      image: "/images/art-design.png",
      alt: "Art & Visual Design logo",
    },
  ];

  return (
    <section className="relative py-16 px-6 bg-background">
      <style>{`
        .skill-logo-container {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .skill-logo {
          width: 44px;
          height: auto;
          max-height: 48px;
          display: block;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          .skill-logo {
            width: 52px;
            max-height: 48px;
          }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                style={{
                  padding: '0',
                  width: '100%',
                }}
              >
                {/* Fixed-height logo container */}
                <div className="skill-logo-container">
                  <img
                    src={skill.image}
                    alt={skill.alt}
                    className="skill-logo"
                    width="52"
                    height="52"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-2xl font-semibold text-foreground"
                  style={{
                    lineHeight: '1.2',
                    marginTop: '0',
                    marginBottom: '16px',
                    minHeight: 'auto',
                  }}
                >
                  {skill.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-muted-foreground"
                  style={{
                    maxWidth: '28rem',
                    margin: '0',
                    lineHeight: '1.6',
                    width: '100%',
                  }}
                >
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeSkillsSection;
