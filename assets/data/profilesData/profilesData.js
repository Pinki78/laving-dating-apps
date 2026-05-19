
export const interestIcons = {
  //    Travelling: "airplane-outline",
  //   Photography: "camera-outline",
  //   Fitness: "barbell-outline",
  //   Drawing: "color-palette-outline",
  //   Music: "musical-notes-outline",
  //   Dancing: "walk-outline",
  //   Reading: "book-outline",
  //   Yoga: "heart-outline",
  //   Fashion: "shirt-outline",
  //   Cooking: "restaurant-outline",

  Travelling: "airplane",
  Photography: "camera",
  Fitness: "barbell",
  Drawing: "color-palette",
  Music: "musical-notes",
  Dancing: "walk",
  Reading: "book",
  Yoga: "heart",
  Fashion: "shirt",
  Cooking: "restaurant",
};


let IdProfile = 0;

const getIdProfile = (title, suffix = "") => {
  const profilesTitels = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

  IdProfile++;
  return `${profilesTitels}-${IdProfile}${suffix}`;
};

let IdInterests = 0;

const getIdInterests = (interestsName, suffix = "",) => {
  const setinterestsTittleId = interestsName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  IdInterests++;
  return `${setinterestsTittleId}${suffix}`;
};


export const createProfiles = (
  title,
  image,
  age,
  gender,
  profesional,
  location,
  description = "",
  interestsName = [],
  totalConins,
  gallery = [],
  PreferencesType = '',// default
  marialStatus = '', // default
) => {

  // const imagePath = `/image/profiles/${categories[0]
  //   .toLowerCase()
  //   .replace(/\s+/g, "")}/${image.toLowerCase().replace(/\s+/g, "")}.jpg`;


  return {
    id: getIdProfile(title),
    title,
    image,
    age,
    gender,
    profesional,
    location,
    description,

    ProInterests: interestsName.map((item) => ({
      id: getIdInterests(item, "-interest"), // ✅ pass item
      name: item,
      icon: interestIcons[item] || "star",
    })),

    totalConins,

    ProGallery: gallery.map((gallery) => ({
      id: getIdProfile(gallery, "-gallery"),
      name: gallery,
    })),

    // ProPreferences:  PreferencesType.map((item) => ({
    //       id: getIdProfile(item, "-pre"),
    //       name: item,

    //     })),
    PreferencesType,
    marialStatus,

  };
};



export const profiles_data = [
  createProfiles(
    "Aarav",
    require('../../image/profiles/boys/aarav.jpg'),
    "28",
    "Male",
    "IT Software",
    "Mumbai",
    `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
    ["Travelling", "Photography", "Fitness"],
    120,
    [
      '../../image/profiles/boys/aarav1.jpg',
      '../../image/profiles/boys/aarav2.jpg',
      '../../image/profiles/boys/aarav3.jpg'
    ],
    "Dating",
    "Single"
  ),

  createProfiles(
    "Bharat",
    require('../../image/profiles/boys/bharat.jpg'),
    "30",
    "Male",
    "IT Software",
    "Kolkata",
    `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
    ["Travelling", "Photography", "Fitness"],
    110,
    [
      '../../image/profiles/boys/bharat.jpg',
      '../../image/profiles/boys/bharat.jpg',
      '../../image/profiles/boys/bharat.jpg'
    ],
    "A relationship",
    "In a relationship"
  ),

  createProfiles(
    "Chaitanya",
    require('../../image/profiles/boys/chaitanya.jpg'),
    "32",
    "Male",
    "IT Software",
    "Kolkata",
    `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
    ["Travelling", "Photography", "Fitness"],
    130,
    [
      '../../image/profiles/boys/chaitanya.jpg',
      '../../image/profiles/boys/chaitanya.jpg',
      '../../image/profiles/boys/chaitanya.jpg'
    ],
    'I’m not sure yet',
    "Single Dad"
  ),

  createProfiles(
    "Ananya",
    require('../../image/profiles/girls/ananya.jpg'),
    "26",
    "FleFemale",
    "Graphic Designer",
    "Mumbai",
    `
    Creative and passionate about art & colors.
    Love exploring cafes and capturing aesthetic moments.
  `,
    ["Drawing", "Travelling", "Music"],
    118,
    [
      '../../image/profiles/girls/ananya.jpg',
      '../../image/profiles/girls/ananya.jpg',
      '../../image/profiles/girls/ananya.jpg'
    ],
    'Friendship',
    "Married"
  ),

  createProfiles(
    "Riya",
    require('../../image/profiles/girls/riya.jpg'),
    "24",
    "FleFemale",
    "Digital Marketer",
    "Bangalore",
    `
    Ambitious, friendly and love meeting new people.
    Coffee lover and always up for a long conversation.
  `,
    ["Dancing", "Reading", "Yoga"],
    142,
    [
      '../../image/profiles/girls/riya.jpg',
      '../../image/profiles/girls/riya.jpg',
      '../../image/profiles/girls/riya.jpg'
    ],
    "A relationship",
    "Divorced",
  ),

  createProfiles(
    "Suhana",
    require('../../image/profiles/girls/suhana.jpg'),
    "27",
    "FleFemale",
    "Fashion Stylist",
    "Delhi",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking"],
    125,
    [
      '../../image/profiles/girls/suhana.jpg',
      '../../image/profiles/girls/suhana.jpg',
      '../../image/profiles/girls/suhana.jpg'
    ],
    "Chat Buddy",
    "Single"
  ),

  createProfiles(
    "Gargee",
    require('../../image/profiles/girls/gargee.jpg'),
    "27",
    "FleFemale",
    "Fashion Stylist",
    "Hyderabad",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking"],
    125,
    [
      '../../image/profiles/girls/gargee.jpg',
      '../../image/profiles/girls/gargee.jpg',
      '../../image/profiles/girls/gargee.jpg'
    ],
    "Somthing casual",
    "Widowed",
  ),

  createProfiles(
    "Hridaan",
    require('../../image/profiles/boys/hridaan.jpg'),
    "35",
    "Male",
    "Fashion Stylist",
    "Chennai",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking"],
    125,
    [
      '../../image/profiles/boys/hridaan.jpg',
      '../../image/profiles/boys/hridaan.jpg',
      '../../image/profiles/boys/hridaan.jpg'
    ],
    "Somthing casual",
    "Widowed",
  ),

  createProfiles(
    "Reyansh",
    require('../../image/profiles/boys/reyansh.jpg'),
    "32",
    "Male",
    "Fashion Stylist",
    "Surat",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/boys/reyansh.jpg',
      '../../image/profiles/boys/reyansh.jpg',
      '../../image/profiles/boys/reyansh.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Aaradhya",
    require('../../image/profiles/girls/aaradhya.jpg'),
    "32",
    "Female",
    "Fashion Stylist",
    "Surat",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/aaradhya.jpg',
      '../../image/profiles/girls/aaradhya.jpg',
      '../../image/profiles/girls/aaradhya.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Bhakti",
    require('../../image/profiles/girls/bhakti.jpg'),
    "32",
    "Female",
    "Fashion Stylist",
    "Kanpur",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/bhakti.jpg',
      '../../image/profiles/girls/bhakti.jpg',
      '../../image/profiles/girls/bhakti.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Charita",
    require('../../image/profiles/girls/charita.jpg'),
    "35",
    "Female",
    "Fashion Stylist",
    "Nagpur",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/charita.jpg',
      '../../image/profiles/girls/charita.jpg',
      '../../image/profiles/girls/charita.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Chakrika",
    require('../../image/profiles/girls/chakrika.jpg'),
    "28",
    "Female",
    "Fashion Stylist",
    "Nagpur",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/chakrika.jpg',
      '../../image/profiles/girls/chakrika.jpg',
      '../../image/profiles/girls/chakrika.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Shaurya",
    require('../../image/profiles/boys/shaurya.jpg'),
    "28",
    "Male",
    "Fashion Stylist",
    "Nagpur",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/boys/shaurya.jpg',
      '../../image/profiles/boys/shaurya.jpg',
      '../../image/profiles/boys/shaurya.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Vivaan",
    require('../../image/profiles/boys/vivaan.jpg'),
    "28",
    "Male",
    "Fashion Stylist",
    "Nagpur",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/boys/vivaan.jpg',
      '../../image/profiles/boys/vivaan.jpg',
      '../../image/profiles/boys/vivaan.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

  createProfiles(
    "Darika",
    require('../../image/profiles/girls/darika.jpg'),
    "28",
    "Female",
    "Fashion Stylist",
    "Indore",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/darika.jpg',
      '../../image/profiles/girls/darika.jpg',
      '../../image/profiles/girls/darika.jpg'
    ],
    "Somthing casual",
    "Single",
  ),


  createProfiles(
    "Falak",
    require('../../image/profiles/girls/falak.jpg'),
    "28",
    "Female",
    "Fashion Stylist",
    "Indore",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/falak.jpg',
      '../../image/profiles/girls/falak.jpg',
      '../../image/profiles/girls/falak.jpg'
    ],
    "Somthing casual",
    "Single",
  ),


  createProfiles(
    "Gargee",
    require('../../image/profiles/girls/gargee.jpg'),
    "26",
    "Female",
    "Fashion Stylist",
    "Indore",
    `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
    ["Fashion", "Photography", "Cooking", "Drawing"],
    195,
    [
      '../../image/profiles/girls/gargee.jpg',
      '../../image/profiles/girls/gargee.jpg',
      '../../image/profiles/girls/gargee.jpg'
    ],
    "Somthing casual",
    "Single",
  ),

];


