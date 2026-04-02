
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

let IdInterests =  0;

const getIdInterests = (interestsName, suffix = "", ) => {
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
   PreferencesType= '',// default
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


  };
};



export const profiles_data = [
    createProfiles(
        "Aarav",
       require('../../image/profiles/boys/aarav.jpg'),
        "28",
        "Man",
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
        "Somthing casual"
    ),

    createProfiles(
        "Bharat",
         require('../../image/profiles/boys/bharat.jpg'),
        "30",
        "Man",
        "IT Software",
        "Kolkata",
        `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
        ["Travelling", "Photography", "Fitness"],
        110,
        [
            '../../image/profiles/boys/aarav1.jpg',
            '../../image/profiles/boys/aarav2.jpg',
            '../../image/profiles/boys/aarav3.jpg'
        ],
        "A relationship"
    ),

    createProfiles(
        "Chaitanya",
         require('../../image/profiles/boys/chaitanya.jpg'),
        "32",
        "Man",
        "IT Software",
        "Kolkata",
        `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
        ["Travelling", "Photography", "Fitness"],
        130,
        [
            '../../image/profiles/boys/aarav1.jpg',
            '../../image/profiles/boys/aarav2.jpg',
            '../../image/profiles/boys/aarav3.jpg'
        ],
        'I’m not sure yet'
    ),

    createProfiles(
        "Ananya",
          require('../../image/profiles/girls/ananya.jpg'),
        "26",
        "Woman",
        "Graphic Designer",
        "Mumbai",
        `
    Creative and passionate about art & colors.
    Love exploring cafes and capturing aesthetic moments.
  `,
        ["Drawing", "Travelling", "Music"],
        118,
        [
            '../../image/profiles/girls/ananya1.jpg',
            '../../image/profiles/girls/ananya2.jpg',
            '../../image/profiles/girls/ananya3.jpg'
        ],
        'Prefer not to say'
    ),

    createProfiles(
        "Riya",
         require('../../image/profiles/girls/riya.jpg'),
        "24",
        "Woman",
        "Digital Marketer",
        "Bangalore",
        `
    Ambitious, friendly and love meeting new people.
    Coffee lover and always up for a long conversation.
  `,
        ["Dancing", "Reading", "Yoga"],
        142,
        [
            '../../image/profiles/girls/riya1.jpg',
            '../../image/profiles/girls/riya2.jpg',
            '../../image/profiles/girls/riya3.jpg'
        ],
        "A relationship"
    ),

    createProfiles(
        "Suhana",
          require('../../image/profiles/girls/suhana.jpg'),
        "27",
        "Woman",
        "Fashion Stylist",
        "Delhi",
        `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
        ["Fashion", "Photography", "Cooking"],
        125,
        [
            '../../image/profiles/girls/suhana1.jpg',
            '../../image/profiles/girls/suhana2.jpg',
            '../../image/profiles/girls/suhana3.jpg'
        ],
        "A relationship"
    ),


];
