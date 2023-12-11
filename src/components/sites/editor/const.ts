import { faker } from "@faker-js/faker";

export const LEFT_BAR_WIDTH = 100;
export const RIGHT_BAR_WIDTH = 300;
export const NAV_BAR_HEIGHT = 68;
export const DEV_START_JSON = `[
{
    "template_id": "THero1",
    "email": "abc@abc.abc",
    "title": "Gonzales V Google",
    "description": "Yep man"
},
{
    "template_id": "TContact3",
    "email": "def@def.def",
    "title": "DEF",
    "description": "Hell nah man"
}
]`;

export const DEV_JSON_TO_INJECT = `
[
    {
      "section_id": "d9d3422c-aa95-4af4-8d1d-7c8f684b253e",
      "template_id": "LHero1",
      "heading": "Welcome to Roomba & Associates",
      "subHeading": "Passionate about the game both inside and outside the courtroom, our sports law firm excels in navigating the complex legal landscape of the sports industry, ensuring our clients score victories on and off the field.",
      "logo": "Roomba & Associates",
      "buttonLabel": "REGISTER",
      "buttonLink": "#contact-us"
    },
    {
      "section_id": "c2553439-5bc8-4f02-98f6-e250fb2c7d2e",
      "template_id": "LPracticeAreas2",
      "title": "Practice Areas",
      "areasList": [
        {
          "practiceAreaName": "Contract Negotiation",
          "practiceDescription": "Our Team of experienced sports law attorneys specializes in contract negotiation. We understand the intricacies of sports contracts and can help you navigate the complex legal landscape to ensure your interests are protected. Whether you're an athlete, team, or sports organization, we have the expertise to secure favorable terms and maximize your opportunities."
        },
        {
          "practiceAreaName": "Intellectual Property Issues in Sports",
          "practiceDescription": "Intellectual property is a critical aspect of the sports industry. Our firm has extensive experience in handling intellectual property issues in sports, including trademark and copyright infringement, licensing agreements, and brand protection. We can help you safeguard your intellectual property rights and ensure that your brand is protected in the competitive sports market."
        },
        {
          "practiceAreaName": "Athlete Endorsement Agreements",
          "practiceDescription": "Securing endorsement deals is crucial for athletes looking to maximize their earning potential. Our sports law firm has a deep understanding of the endorsement landscape and can assist athletes in negotiating favorable endorsement agreements. We work tirelessly to protect our clients' interests and ensure they receive fair compensation for their endorsements."
        }
      ]
    },
    {
      "section_id": "c18d2b97-ac62-4f62-9145-1c451682bf88",
      "template_id": "LValues2",
      "superTitle": "Find out about...",
      "title": "Our Values",
      "description": "At Roomba & Associates, Our Values are the foundation of our firm. They guide our actions and shape our relationships with clients. We believe in:",
      "valuesList": [
        {
          "name": "Reliability",
          "motto": "Trust in our commitment",
          "description": "We are dedicated to providing reliable and consistent legal services to our clients. You can count on us to be there for you every step of the way, ensuring your legal needs are met with utmost professionalism and efficiency."
        },
        {
          "name": "Loyalty & Trust",
          "motto": "Building lasting partnerships",
          "description": "We value the trust our clients place in us and strive to build strong and lasting partnerships. Our loyalty to our clients is unwavering, and we work tirelessly to protect their interests and achieve their goals."
        },
        {
          "name": "Collaboration",
          "motto": "Working together for success",
          "description": "We believe in the power of collaboration. By working closely with our clients, we are able to understand their unique needs and develop tailored legal strategies. Together, we can achieve the best possible outcomes."
        }
      ]
    },
    {
      "section_id": "d775d1e1-fbc6-4f11-b6bc-a1b62c3223fa",
      "template_id": "LTeam1",
      "superTitle": "Learn more about...",
      "title": "Our Team",
      "lawyerDetails": [
        {
          "name": "Jessica Taylor",
          "description": "A former collegiate athlete turned sports law expert, Jessica combines her passion for the game with extensive legal knowledge, specializing in contract negotiations and athlete representation."
        },
        {
          "name": "Michael Rodriguez",
          "description": "With over two decades of experience in sports law, Michael is a seasoned advocate for athletes, excelling in dispute resolution and intellectual property matters."
        },
        {
          "name": "Sarah Chang",
          "description": "A rising star in the field, Sarah brings a fresh perspective to sports law, focusing on emerging legal issues, including esports and digital media rights."
        }
      ]
    },
    {
      "section_id": "d9decb2a-51e5-418f-9d8c-ee4d02c17517",
      "template_id": "LReviews2",
      "title": "Testimonials",
      "reviews": [
        {
          "clientName": "John Smith",
          "testimonial": "Jessica TSarah Chang's innovative approach to our esports contract negotiations exceeded our expectations. She truly understands the evolving landscape of digital sports and provided us with expert advice every step of the way."
        },
        {
          "clientName": "Team Manager at XYZ Sports Club",
          "testimonial": "Michael Rodriguez provided invaluable guidance in resolving a complex intellectual property issue for our sports organization. His experience and strategic approach were key to a successful outcome."
        },
        {
          "clientName": "Tabitha Toffoe",
          "testimonial": "ABC Gamingaylor and the team were instrumental in negotiating my contract with the professional league. Their attention to detail and understanding of the sports industry ensured I got the best deal possible!"
        }
      ]
    },
    {
      "section_id": "ba656dce-1753-4620-8bdd-737be12709ec",
      "template_id": "LAbout1",
      "title": "About Us",
      "paragraph": "At Roomba & Associates, we are a clarity-focused sports law firm. We are problem solvers at heart, dedicated to finding innovative solutions for our clients. With our domain expertise in sports law, we bring a fresh perspective to every case. Our accessible approach ensures that quality legal help reaches as many people as possible. We pride ourselves on our gritty representation, never afraid to get our hands dirty to achieve optimal outcomes for our clients. With a team of dedicated attorneys deeply entrenched in the world of sports law, we provide comprehensive and tailored solutions for athletes, teams, and sports organizations alike. Our firm is committed to helping our clients not only play the game but win it, both on and off the field."
    },
    {
      "title": "Contact Us",
      "section_id": "dab71b51-a6a0-48ff-a655-cf9dda361df0",
      "template_id": "LContact1",
      "email": "example@example.com",
      "phone": "1-234-567-890"
    }
  ]
`.trim();

export const TEMPLATES_HEROS = [
  {
    value: "LHero1",
    label: "Hero 1",
    image: faker.image.url(),
  },
  {
    value: "LHero2",
    label: "Hero 2",
    image: faker.image.url(),
  },
  {
    value: "LHero3",
    label: "Hero 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_PRACTICE = [
  {
    value: "LPracticeAreas1",
    label: "Practice Areas 1",
    image: faker.image.url(),
  },
  {
    value: "LPracticeAreas2",
    label: "Practice Areas 2",
    image: faker.image.url(),
  },
  {
    value: "LPracticeAreas3",
    label: "Practice Areas 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_VALUES = [
  {
    value: "LValues1",
    label: "Values 1",
    image: faker.image.url(),
  },
  {
    value: "LValues2",
    label: "Values 2",
    image: faker.image.url(),
  },
  {
    value: "LValues3",
    label: "Values 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_TEAM = [
  {
    value: "LTeam1",
    label: "Team 1",
    image: faker.image.url(),
  },
  {
    value: "LTeam2",
    label: "Team 2",
    image: faker.image.url(),
  },
  {
    value: "LTeam3",
    label: "Team 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_REVIEWS = [
  {
    value: "LReviews1",
    label: "Reviews 1",
    image: faker.image.url(),
  },
  {
    value: "LReviews2",
    label: "Reviews 2",
    image: faker.image.url(),
  },
  {
    value: "LReviews3",
    label: "Reviews 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_ABOUT = [
  {
    value: "LAbout1",
    label: "About Us 1",
    image: faker.image.url(),
  },
  {
    value: "LAbout2",
    label: "About Us 2",
    image: faker.image.url(),
  },
  {
    value: "LAbout3",
    label: "About Us 3",
    image: faker.image.url(),
  },
];

export const TEMPLATES_CONTACT = [
  {
    value: "LContact1",
    label: "Contact 1",
    image: faker.image.url(),
  },
  {
    value: "LContact2",
    label: "Contact 2",
    image: faker.image.url(),
  },
  {
    value: "LContact3",
    label: "Contact 3",
    image: faker.image.url(),
  },
];

export const templatesMap: any = {
  hero: TEMPLATES_HEROS,
  practice: TEMPLATES_PRACTICE,
  values: TEMPLATES_VALUES,
  team: TEMPLATES_TEAM,
  reviews: TEMPLATES_REVIEWS,
  about: TEMPLATES_ABOUT,
  contact: TEMPLATES_CONTACT,
};
