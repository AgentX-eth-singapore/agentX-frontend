import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

type TeamMemberProps = {
  name: string;
  role: string;
  imageSrc: string;
  socialLinks: {
    github: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageSrc, socialLinks }) => (
  <div data-aos="fade-up" className="flex flex-col items-center gap-4">
    <img src={imageSrc} className="lg:h-72 md:h-52 h-52 rounded-full shadow-lg" alt={name} />
    <p className="text-3xl font-medium hover:text-purple-500 transition-colors duration-300 pt-6">
      {name}
    </p>
    <p className="text-gray-500 font-medium">{role}</p>
    <div className="flex items-center gap-4 mt-2">
      <a href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <FaGithub size={22} className="hover:text-purple-500 transition-colors duration-300" />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <FaInstagram size={22} className="hover:text-purple-500 transition-colors duration-300" />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
        <FaTwitter size={22} className="hover:text-purple-500 transition-colors duration-300" />
      </a>
      <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <FaLinkedinIn size={22} className="hover:text-purple-500 transition-colors duration-300" />
      </a>
    </div>
  </div>
);

const Team = () => {
  const teamMembers = [
    {
      name: "Vibhav Sharma",
      role: "Hacker",
      imageSrc: "https://media.licdn.com/dms/image/v2/C4D03AQFrcndMJnjijw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660496287086?e=1732147200&v=beta&t=RndZOuLOPJz3hXVVyiq46CnoMdx5DTbSNbMiBuhDXyk",
      socialLinks: {
        github: "https://github.com/",
        instagram: "https://www.instagram.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
    {
      name: "Deepanshu Prajapati",
      role: "Hacker",
      imageSrc: "https://avatars.githubusercontent.com/u/27270664?v=4",
      socialLinks: {
        github: "https://github.com/",
        instagram: "https://www.instagram.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
    {
      name: "Krishna Sharma",
      role: "Hacker",
      imageSrc: "https://pbs.twimg.com/profile_images/1817919928760164352/xwdvbnEe_400x400.jpg",
      socialLinks: {
        github: "https://github.com/",
        instagram: "https://www.instagram.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
  ];

  return (
    <div id="team" className="bg-white relative py-28">
      <img
        style={{ filter: "invert(0.2)" }}
        src="./images/wave.webp"
        alt="wave"
        className="lg:h-26 md:h-20 h-16"
      />

      <div className="flex items-center justify-center text-center gap-3 flex-col mb-16">
        <img src="./images/wave-pattern.webp" alt="wave pattern" className="h-7" />
        <p className="text-4xl font-medium">
          Our <span className="text-purple-500">Team</span>
        </p>
      </div>

      <div className="flex flex-wrap px-10 justify-evenly gap-10 gap-y-20 items-center py-18">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            imageSrc={member.imageSrc}
            socialLinks={member.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
