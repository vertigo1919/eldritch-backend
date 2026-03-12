// these are all the SQL query function the backend needs for the game
// For now they return mock data
// Yeray is working on rewriting them to query the database

export async function saveUser({ user_id: _id, display_name: _display_name }) {
  // Function content: to be filled in
  // Inserts or updates a user record in the USERS table using their UUID and display name.
  // data format: { user_id: uuid, display_name: string }
}

export async function getMonsterForStage(stageNumber) {
  // Function content: to be replaced (currently returns mocks)
  // Retrieves a single monster object from the MONSTERS table corresponding to the current game stage.
  // N.B. stages for now are 1,2,3 and map to easy medium hard mosnter difficulty_level
const mockMonsters = [
  {
    monster_id: 1,
    name: 'Skeleton Knight',
    max_hp: 80,
    attack_damage: 10,
    image_name: 'sewer_rat',
    difficulty_level: 'easy',
  },
  {
    monster_id: 2,
    name: 'Crypt Warden',
    max_hp: 120,
    attack_damage: 15,
    image_name: 'pale_slug',
    difficulty_level: 'medium',
  },
  {
    monster_id: 3,
    name: 'Eldritch Horror',
    max_hp: 160,
    attack_damage: 20,
    image_name: 'eldritch_abomination',
    difficulty_level: 'hard',
  },
];
  return mockMonsters[stageNumber - 1];
}

export async function getRandomQuestions(_quantity, _difficulty) {
  // Function content: to be replaced (currently returns mocks)
  // Selects a specific quantity of random rows from the QUESTIONS table that match the requested difficulty level.
const allQuestions = [
  {
    question_id: 1,
    prompt: 'Which is the second largest native language spoken in Spain by numbers of speakers?',
    option_a: 'Portuguese',
    option_b: 'Spanish',
    option_c: 'French',
    option_d: 'Catalan',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 2,
    prompt: 'Which of these fast-food chains is NOT mainly known to sell pizza?',
    option_a: 'Papa John&#039;s',
    option_b: 'Wendy&#039;s',
    option_c: 'Domino&#039;s',
    option_d: 'Little Caesars',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 3,
    prompt: 'What is Cuba&#039;s official, most widely spoken language?',
    option_a: 'Spanish',
    option_b: 'Portuguese',
    option_c: 'French',
    option_d: 'Italian',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 4,
    prompt: 'What does the &#039;S&#039; stand for in the abbreviation SIM, as in SIM card? ',
    option_a: 'Secure',
    option_b: 'Solid',
    option_c: 'Subscriber',
    option_d: 'Single',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 5,
    prompt: 'What nuts are used in the production of marzipan?',
    option_a: 'Peanuts',
    option_b: 'Walnuts',
    option_c: 'Pistachios',
    option_d: 'Almonds',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 6,
    prompt: 'Which company did Valve cooperate with in the creation of the Vive?',
    option_a: 'Razer',
    option_b: 'HTC',
    option_c: 'Oculus',
    option_d: 'Google',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 7,
    prompt: 'Which is the capital of Spain?',
    option_a: 'Barcelona',
    option_b: 'Lisboa',
    option_c: 'Madrid',
    option_d: 'Paris',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 8,
    prompt: 'When someone is inexperienced they are said to be what color?',
    option_a: 'Red',
    option_b: 'Blue',
    option_c: 'Yellow',
    option_d: 'Green',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 9,
    prompt: 'What is the perimeter of a circle more commonly known as?',
    option_a: 'Arc',
    option_b: 'Circumference',
    option_c: 'Diameter',
    option_d: 'Radius',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 10,
    prompt: 'If you are caught &quot;Goldbricking&quot;, what are you doing wrong?',
    option_a: 'Smoking',
    option_b: 'Stealing',
    option_c: 'Cheating',
    option_d: 'Slacking',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 11,
    prompt: 'What word represents the letter &#039;T&#039; in the NATO phonetic alphabet?',
    option_a: 'Target',
    option_b: 'Taxi',
    option_c: 'Turkey',
    option_d: 'Tango',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 12,
    prompt: 'What do the letters in the GMT time zone stand for?',
    option_a: 'Global Meridian Time',
    option_b: 'General Median Time',
    option_c: 'Glasgow Man Time',
    option_d: 'Greenwich Mean Time',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 13,
    prompt: 'Which candy is NOT made by Mars?',
    option_a: 'Almond Joy',
    option_b: 'M&amp;M&#039;s',
    option_c: 'Twix',
    option_d: 'Snickers',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 14,
    prompt: 'What is the shape of the toy invented by Hungarian professor Ernő Rubik?',
    option_a: 'Cylinder',
    option_b: 'Pyramid',
    option_c: 'Cube',
    option_d: 'Sphere',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 15,
    prompt: 'Who played General Aladeen in The Dictator?',
    option_a: 'Sacha Baron Cohen',
    option_b: 'Johnny Depp',
    option_c: 'James Franco',
    option_d: 'Leonardo Dicaprio',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 16,
    prompt: 'Red Vines is a brand of what type of candy?',
    option_a: 'Bubblegum',
    option_b: 'Licorice',
    option_c: 'Lollipop',
    option_d: 'Chocolate',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 17,
    prompt: 'Which of these is NOT considered to be a colour that makes up the rainbow?',
    option_a: 'Blue',
    option_b: 'Violet',
    option_c: 'Orange',
    option_d: 'Pink',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 18,
    prompt: 'In &quot;Katamari Damacy&quot;, you control a character known as:',
    option_a: 'Foomin',
    option_b: 'The Prince',
    option_c: 'Fujio',
    option_d: 'Ichigo ',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 19,
    prompt: 'Which country, not including Japan, has the most people of Japanese descent?',
    option_a: 'Brazil',
    option_b: 'China',
    option_c: 'South Korea',
    option_d: 'United States of America',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 20,
    prompt: 'Which American-owned brewery led the country in sales by volume in 2015?',
    option_a: 'Boston Beer Company',
    option_b: 'Miller Coors',
    option_c: 'D. G. Yuengling and Son, Inc',
    option_d: 'Anheuser Busch',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 21,
    prompt: 'When someone is cowardly, they are said to have what color belly?',
    option_a: 'Blue',
    option_b: 'Yellow',
    option_c: 'Green',
    option_d: 'Red',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 22,
    prompt: 'What planet is not named after a Greek or Roman god?',
    option_a: 'Jupiter',
    option_b: 'Mars',
    option_c: 'Mercury',
    option_d: 'Earth',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 23,
    prompt: 'What was the name of Sqiudward&#039;s bad painting in the Spongebob episode &quot;Artist Unknown?&quot;',
    option_a: 'Tilted Perspectives',
    option_b: 'Bold and Brash',
    option_c: 'Squidward en Repose',
    option_d: 'Rippy Bits',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 24,
    prompt: 'Which language is most widely spoken in Switzerland?',
    option_a: 'French',
    option_b: 'Italian',
    option_c: 'Swiss',
    option_d: 'German',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 25,
    prompt: 'In what year did Canada stop producing the penny?',
    option_a: '2013',
    option_b: '2011',
    option_c: '2010',
    option_d: '2012',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 26,
    prompt: 'What is the shortest month of the year?',
    option_a: 'December',
    option_b: 'April',
    option_c: 'September',
    option_d: 'February',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 27,
    prompt: 'According to the Book of Genesis in the Old Testament, how many days did it take God to create the world?',
    option_a: 'Six',
    option_b: 'Seven',
    option_c: 'One',
    option_d: 'Twelve',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 28,
    prompt: 'What style of beer will typically have a higher than average hop content?',
    option_a: 'India Pale Ale',
    option_b: 'Stout',
    option_c: 'Extra Special Bitter',
    option_d: 'Scotch Ale',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 29,
    prompt: 'The Flag of the European Union has how many stars on it?',
    option_a: '10',
    option_b: '14',
    option_c: '16',
    option_d: '12',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 30,
    prompt: 'In blood typing, the (+) and (-) marker after an A, B, AB, or O is called Rh factor. Which of the following is the source of its discovery?',
    option_a: 'Rhizomes',
    option_b: 'Rhesus Monkeys',
    option_c: 'Rheumatism Patients',
    option_d: 'Red-Haired People',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 31,
    prompt: 'How many fingers does a single human hand have?',
    option_a: 'Eight',
    option_b: 'Four',
    option_c: 'Five',
    option_d: 'Ten',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 32,
    prompt: 'Which sign of the zodiac comes between Virgo and Scorpio?',
    option_a: 'Libra',
    option_b: 'Gemini',
    option_c: 'Taurus',
    option_d: 'Capricorn',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 33,
    prompt: 'What fruit is a traditional ingredient of a Black Forest Gateau?',
    option_a: 'Cherries',
    option_b: 'Apricots',
    option_c: 'Raisins',
    option_d: 'Apples',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 34,
    prompt: 'What machine element is located in the center of fidget spinners?',
    option_a: 'Bearings',
    option_b: 'Axles',
    option_c: 'Gears',
    option_d: 'Belts',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 35,
    prompt: 'Antibiotics are generally taken to combat what?',
    option_a: 'Migraines',
    option_b: 'Muscular pains',
    option_c: 'Bacterial infections',
    option_d: 'Viruses',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 36,
    prompt: 'What do sailors call the back of a boat?',
    option_a: 'Port',
    option_b: 'Stern',
    option_c: 'Bow',
    option_d: 'Starboard',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 37,
    prompt: 'Which canal connects the Mediterranean Sea with the Red Sea?',
    option_a: 'Panama Canal',
    option_b: 'Sinai Canal',
    option_c: 'Qaraqum Canal',
    option_d: 'Suez Canal',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 38,
    prompt: 'What technology is named after a tenth-century ruler of Denmark and Norway?',
    option_a: 'GPS',
    option_b: 'Internet',
    option_c: 'Bluetooth',
    option_d: 'Wi-Fi',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 39,
    prompt: 'The New York Times slogan is, &ldquo;All the News That&rsquo;s Fit to&hellip;&rdquo;',
    option_a: 'Print',
    option_b: 'Digest',
    option_c: 'Look',
    option_d: 'Read',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 40,
    prompt: 'Which of the three astronauts of the Apollo 11 spaceflight did NOT walk on the moon?',
    option_a: 'None of them',
    option_b: 'Michael Collins',
    option_c: 'Buzz Aldrin',
    option_d: 'Neil Armstrong',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 41,
    prompt: 'What country does sushi &amp; karaoke come from?',
    option_a: 'Japan',
    option_b: 'China',
    option_c: 'South Korea',
    option_d: 'Vietnam',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 42,
    prompt: 'The &ldquo;fairy&rdquo; type made it&rsquo;s debut in which generation of the Pokemon core series games?',
    option_a: '6th',
    option_b: '2nd',
    option_c: '7th',
    option_d: '4th',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 43,
    prompt: 'What kind of aircraft was developed by Igor Sikorsky in the United States in 1942?',
    option_a: 'Helicopter',
    option_b: 'Stealth Blimp',
    option_c: 'Jet',
    option_d: 'Space Capsule',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 44,
    prompt: 'Who is the origin of the quote &quot;What doesn&#039;t kill you makes you stronger&quot;?',
    option_a: 'Kelly Clarkson',
    option_b: 'Christopher Hitchens',
    option_c: 'Friedrich Nietzsche',
    option_d: ' G. Gordon Liddy',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 45,
    prompt: 'In which year did Ghana gain independence?',
    option_a: '1957',
    option_b: '1947',
    option_c: '1960',
    option_d: '1958',
    correct_option: 'a',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 46,
    prompt: 'Which of these words refers to something made, distributed, or sold illegally?',
    option_a: 'Bootlace',
    option_b: 'Bootstrap',
    option_c: 'Bootleg',
    option_d: 'Bootblack',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 47,
    prompt: 'What do sailors call the right side of a boat?',
    option_a: 'Bow',
    option_b: 'Starboard',
    option_c: 'Port',
    option_d: 'Stern',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 48,
    prompt: 'What is on display in the Madame Tussaud&#039;s museum in London?',
    option_a: 'Vintage cars',
    option_b: 'Wax sculptures',
    option_c: 'Designer clothing',
    option_d: 'Unreleased film reels',
    correct_option: 'b',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 49,
    prompt: 'Earth is located in which galaxy?',
    option_a: 'The Mars Galaxy',
    option_b: 'The Galaxy Note',
    option_c: 'The Black Hole',
    option_d: 'The Milky Way Galaxy',
    correct_option: 'd',
    difficulty: 'easy',
    category: 'General Knowledge'
  },
  {
    question_id: 50,
    prompt: 'Who is depicted on the US hundred dollar bill?',
    option_a: 'Abraham Lincoln',
    option_b: 'Thomas Jefferson',
    option_c: 'Benjamin Franklin',
    option_d: 'George Washington',
    correct_option: 'c',
    difficulty: 'easy',
    category: 'General Knowledge'
  }, 
  {
    question_id: 51,
    prompt: 'Which mountain has the highest peak in South America?',
    option_a: 'Aconcagua, Argentina',
    option_b: 'Ojos del Salado, Argentina/Chile border',
    option_c: 'Monte Pissis, Argentina',
    option_d: 'Huascar&aacute;n, Peru',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 52,
    prompt: ' In which country was the Michelin tire company founded in 1889?',
    option_a: 'Italy',
    option_b: 'Germany',
    option_c: 'France',
    option_d: 'United Kingdom',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 53,
    prompt: 'The Mexican Beer &quot;Corona&quot; is what type of beer?',
    option_a: 'Baltic Porter',
    option_b: 'Pale Lager',
    option_c: 'India Pale Ale',
    option_d: 'Pilfsner',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 54,
    prompt: 'Computer manufacturer Compaq was acquired for $25 billion dollars in 2002 by which company?',
    option_a: 'Toshiba',
    option_b: 'Asus',
    option_c: 'Dell',
    option_d: 'Hewlett-Packard',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 55,
    prompt: 'Which Italian automobile manufacturer gained majority control of U.S. automobile manufacturer Chrysler in 2011?',
    option_a: 'Ferrari',
    option_b: 'Fiat',
    option_c: 'Maserati',
    option_d: 'Alfa Romeo',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 56,
    prompt: 'Who is a co-founder of music streaming service Spotify?',
    option_a: 'Felix Miller',
    option_b: 'Michael Breidenbruecker',
    option_c: 'Daniel Ek',
    option_d: 'Sean Parker',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 57,
    prompt: '&quot;Gum arabic&quot; is a natural gum consisting of the hardened sap of which tree species?',
    option_a: 'Palm',
    option_b: 'Ficus',
    option_c: 'Eucalyptus',
    option_d: 'Acacia',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 58,
    prompt: 'What is the Italian word for &quot;tomato&quot;?',
    option_a: 'Aglio',
    option_b: 'Cipolla',
    option_c: 'Peperoncino',
    option_d: 'Pomodoro',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 59,
    prompt: 'What is the romanized Japanese word for &quot;university&quot;?',
    option_a: 'Daigaku',
    option_b: 'Toshokan',
    option_c: 'Jimusho',
    option_d: 'Shokudou',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 60,
    prompt: 'Apple co-founder Steve Jobs died from complications of which form of cancer?',
    option_a: 'Stomach',
    option_b: 'Pancreatic',
    option_c: 'Bone',
    option_d: 'Liver',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 61,
    prompt: 'What year was the first Apple iPod introduced?',
    option_a: '1999',
    option_b: '1998',
    option_c: '2001',
    option_d: '2000',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 62,
    prompt: 'What does the &quot;G&quot; mean in &quot;G-Man&quot;?',
    option_a: 'Geronimo',
    option_b: 'Government',
    option_c: 'Going',
    option_d: 'Ghost',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 63,
    prompt: 'Which is the most popular spoken language in the Southern Hemisphere?',
    option_a: 'French',
    option_b: 'Portuguese',
    option_c: 'English ',
    option_d: 'Spanish',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 64,
    prompt: 'Which mountain has the highest peak in North America?',
    option_a: 'Mount Saint Elias, US/Canada border',
    option_b: 'Mount Logan, Canada',
    option_c: 'Pico de Orizaba, Mexico',
    option_d: 'Denali, USA',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 65,
    prompt: 'What is the full title of the Prime Minister of the UK?',
    option_a: 'Duke of Cambridge',
    option_b: 'Her Majesty&#039;s Loyal Opposition',
    option_c: 'Manager of the Crown Estate',
    option_d: 'First Lord of the Treasury',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 66,
    prompt: 'The website &quot;Shut Up &amp; Sit Down&quot; reviews which form of media?',
    option_a: 'Board Games',
    option_b: 'Television Shows',
    option_c: 'Video Games',
    option_d: 'Films',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 67,
    prompt: 'What was Mountain Dew&#039;s original slogan?',
    option_a: 'Give Me A Dew',
    option_b: 'Do The Dew',
    option_c: 'Get&#039; that barefoot feelin&#039; drinkin&#039; Mountain Dew',
    option_d: 'Yahoo! Mountain Dew... It&#039;ll tickle your innards!',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 68,
    prompt: 'What is the name of the very first video uploaded to YouTube?',
    option_a: 'carrie rides a truck',
    option_b: 'Her new puppy from great grandpa vern.',
    option_c: 'Me at the zoo',
    option_d: 'tribute',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 69,
    prompt: 'In a 1994 CBS interview, Microsoft co-founder Bill Gates performed what unusual trick on camera?',
    option_a: 'Jumping over an office chair',
    option_b: 'Jumping backwards over a desk',
    option_c: 'Standing on his head',
    option_d: 'Typing on a keyboard during a handstand',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 70,
    prompt: 'The early part of which decade, did the Goth Subculture begin?',
    option_a: '1990s',
    option_b: '2000s',
    option_c: '1970s',
    option_d: '1980s',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 71,
    prompt: 'What was the destination of the missing flight MH370?',
    option_a: 'Beijing',
    option_b: 'Kuala Lumpur',
    option_c: 'Singapore',
    option_d: 'Tokyo',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 72,
    prompt: 'Which mountain has the highest peak in Africa?',
    option_a: 'Mount Kilimanjaro, Tanzania',
    option_b: 'Mount Kenya, Kenya',
    option_c: 'Mount Stanley, DR Congo/Uganda',
    option_d: 'Mount Speke, Uganda',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 73,
    prompt: 'The phrase &quot;accident waiting to happen&quot; is an example of what type of figure of speech?',
    option_a: 'Metaphor',
    option_b: 'Analogy',
    option_c: 'Idiom',
    option_d: 'Simile',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 74,
    prompt: 'What year was Walt Disney born?',
    option_a: '1903',
    option_b: '1900',
    option_c: '1901',
    option_d: '1902',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 75,
    prompt: 'Earl Grey tea is black tea flavoured with what?',
    option_a: 'Lavender',
    option_b: 'Vanilla',
    option_c: 'Honey',
    option_d: 'Bergamot oil',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 76,
    prompt: 'When was WhatsApp founded?',
    option_a: '2010',
    option_b: '2009',
    option_c: '2007',
    option_d: '2012',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 77,
    prompt: 'Astraphobia is the irrational fear of what?',
    option_a: 'Snow',
    option_b: 'Thunder',
    option_c: 'Rain',
    option_d: 'Wind',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 78,
    prompt: 'What is the real name of viral internet meme Grumpy Cat?',
    option_a: 'Colonel Meow',
    option_b: 'Tardar Sauce',
    option_c: 'Lil Bub',
    option_d: 'Maru',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 79,
    prompt: 'The lesser-known continuation of the saying &quot;Curiosity killed the cat...&quot; is:',
    option_a: '&quot;...which taught it not to do that.&quot;',
    option_b: '&quot;...but death by the truth is better than ignorance.&quot;',
    option_c: '&quot;...but satisfaction brought it back.&quot;',
    option_d: '&quot;...and the silent mouse remained thereat.&quot;',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 80,
    prompt: 'The term &quot;scientist&quot; was coined in which year?',
    option_a: '1796',
    option_b: '1833',
    option_c: '1933',
    option_d: '1942',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 81,
    prompt: 'When was the Declaration of Independence approved by the Second Continental Congress?',
    option_a: 'June 4, 1776',
    option_b: 'July 2, 1776',
    option_c: 'July 4, 1776',
    option_d: 'May 4, 1776',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 82,
    prompt: 'Which country has the most Trappist breweries?',
    option_a: 'USA',
    option_b: 'Belgium',
    option_c: 'Netherlands',
    option_d: 'France',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 83,
    prompt: 'Which river flows through the Scottish city of Glasgow?',
    option_a: 'Clyde',
    option_b: 'Tay',
    option_c: 'Dee',
    option_d: 'Tweed',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 84,
    prompt: 'Out of these four buildings, which one is the tallest, with a height of 1,483 ft (451.9 m)?',
    option_a: 'Al Hamra Tower, Kuwait',
    option_b: 'Petronas Twin Towers, Malaysia',
    option_c: 'Zifeng Tower, China',
    option_d: 'Trump Intl. Hotel &amp; Tower, United States',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 85,
    prompt: 'What was the original name of the search engine &quot;Google&quot;?',
    option_a: 'Netscape Navigator',
    option_b: 'BackRub',
    option_c: 'CatMassage',
    option_d: 'SearchPro',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 86,
    prompt: 'In a standard set of playing cards, which is the only king without a moustache?',
    option_a: 'Clubs',
    option_b: 'Hearts',
    option_c: 'Spades',
    option_d: 'Diamonds',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 87,
    prompt: 'What alcoholic drink is mainly made from juniper berries?',
    option_a: 'Vodka',
    option_b: 'Rum',
    option_c: 'Tequila',
    option_d: 'Gin',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 88,
    prompt: 'What is the German word for &quot;spoon&quot;?',
    option_a: 'Essst&auml;bchen',
    option_b: 'L&ouml;ffel',
    option_c: 'Gabel',
    option_d: 'Messer',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 89,
    prompt: 'What is the most-visited website out of these options?',
    option_a: 'YouTube',
    option_b: 'Facebook',
    option_c: 'Wikipedia',
    option_d: 'Google',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 90,
    prompt: 'Death Valley&#039;s Badwater Basin is North America&#039;s point of lowest elevation at how many feet below sea level?',
    option_a: '282 feet',
    option_b: '79 feet',
    option_c: '1,640 feet',
    option_d: '12,092 feet',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 91,
    prompt: 'What are the tallest twin buildings in the world, with a height of 1,483 ft (451.9 m)?',
    option_a: 'Petronas Twin Towers, Malaysia',
    option_b: 'Emirates Towers, United Arab Emirates',
    option_c: 'Huaguoyuan Towers, China',
    option_d: 'Palm Towers, Qatar',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 92,
    prompt: 'If a person&#039;s hair is described as &#039;Titian&#039;, what colour is it?',
    option_a: 'Black',
    option_b: 'Red',
    option_c: 'Blonde',
    option_d: 'Brunette',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 93,
    prompt: 'After how many years would you celebrate your crystal anniversary?',
    option_a: '25',
    option_b: '15',
    option_c: '20',
    option_d: '10',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 94,
    prompt: 'When was Nintendo founded?',
    option_a: 'December 27th, 1894',
    option_b: 'September 23rd, 1889',
    option_c: 'October 19th, 1891',
    option_d: 'March 4th, 1887',
    correct_option: 'b',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 95,
    prompt: 'What name represents the letter &quot;M&quot; in the NATO phonetic alphabet?',
    option_a: 'Matthew',
    option_b: 'Mark',
    option_c: 'Max',
    option_d: 'Mike',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 96,
    prompt: 'A doctor with a PhD is a doctor of what?',
    option_a: 'Psychology',
    option_b: 'Phrenology',
    option_c: 'Physical Therapy',
    option_d: 'Philosophy',
    correct_option: 'd',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 97,
    prompt: 'Macintosh has named six of its operating systems after big cats. What big cat did Macintosh name their 2007 release after? ',
    option_a: 'Panther',
    option_b: 'Puma',
    option_c: 'Leopard',
    option_d: 'Tiger',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 98,
    prompt: 'Which of these Nicktoons were NOT originally a short on Oh Yeah! Cartoons before becoming their own series?',
    option_a: 'Danny Phantom',
    option_b: 'ChalkZone',
    option_c: 'My Life as a Teenage Robot',
    option_d: 'The Fairly OddParents',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 99,
    prompt: 'In 2013 how much money was lost by Nigerian scams?',
    option_a: '$12.7 Billion',
    option_b: '$95 Million',
    option_c: '$956 Million',
    option_d: '$2.7 Billion',
    correct_option: 'a',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 100,
    prompt: 'What is the highest number of Michelin stars a restaurant can receive?',
    option_a: 'Five',
    option_b: 'Six',
    option_c: 'Three',
    option_d: 'Four',
    correct_option: 'c',
    difficulty: 'medium',
    category: 'General Knowledge'
  },
  {
    question_id: 101,
    prompt: '&quot;Nephelococcygia&quot; is the practice of doing what? ',
    option_a: 'Breaking glass with your voice',
    option_b: 'Swimming in freezing water',
    option_c: 'Finding shapes in clouds',
    option_d: 'Sleeping with your eyes open',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 102,
    prompt: 'Where is Apple Inc. headquartered?',
    option_a: 'Santa Monica, CA',
    option_b: 'Cupertino, California',
    option_c: 'Redwood City, California',
    option_d: 'Redmond, Washington',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 103,
    prompt: 'Which of the following  British Monarchs never appeared on a circulated pound sterling coin?',
    option_a: 'Victoria',
    option_b: 'George VI',
    option_c: 'Charles II',
    option_d: 'Edward VIII',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 104,
    prompt: 'The word &quot;astasia&quot; means which of the following?',
    option_a: 'The inability to stand up',
    option_b: 'The inability to make decisions',
    option_c: 'The inability to concentrate on anything',
    option_d: 'A feverish desire to rip one&#039;s clothes off',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 105,
    prompt: 'How long did it take the motorized window washers of the original World Trade Center to clean the entire exterior of the building?',
    option_a: '1 Week',
    option_b: '2 Months',
    option_c: '1 Month',
    option_d: '3 Weeks',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 106,
    prompt: 'Sciophobia is the fear of what?',
    option_a: 'Eating',
    option_b: 'Bright lights',
    option_c: 'Transportation',
    option_d: 'Shadows',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 107,
    prompt: 'Which one of these Swedish companies was founded in 1943?',
    option_a: 'Lindex',
    option_b: 'Clas Ohlson',
    option_c: 'IKEA',
    option_d: 'H &amp; M',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 108,
    prompt: 'According to the 2014-2015 Australian Bureau of Statistics, what percentage of Australians were born overseas?',
    option_a: '20%',
    option_b: '7%',
    option_c: '28%',
    option_d: '13%',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 109,
    prompt: 'If someone said &quot;you are olid&quot;, what would they mean?',
    option_a: 'You smell extremely unpleasant.',
    option_b: 'You are out of shape/weak.',
    option_c: 'Your appearance is repulsive.',
    option_d: 'You are incomprehensible/an idiot.',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 110,
    prompt: 'Virtual reality company Oculus VR lost which of it&#039;s co-founders in a freak car accident in 2013?',
    option_a: 'Nate Mitchell',
    option_b: 'Jack McCauley',
    option_c: 'Palmer Luckey',
    option_d: 'Andrew Scott Reisse',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 111,
    prompt: 'If you planted the seeds of Quercus robur, what would grow?',
    option_a: 'Vegetables',
    option_b: 'Flowers',
    option_c: 'Trees',
    option_d: 'Grains',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 112,
    prompt: 'What is the airspeed velocity of an unladen swallow?',
    option_a: '24 MPH',
    option_b: '15 MPH',
    option_c: '20 MPH',
    option_d: '200 MPH',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 113,
    prompt: 'Where in La Coru&ntilde;a (Spain) is the headquarters of &quot;Inditex&quot;, the biggest fashion group in the world?',
    option_a: 'Mug&iacute;a',
    option_b: '&Oacute;rdenes',
    option_c: 'Arteijo',
    option_d: 'Sanjenjo',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 114,
    prompt: 'Electronic music producer Kygo&#039;s popularity skyrocketed after a certain remix. Which song did he remix?',
    option_a: 'Ed Sheeran - I See Fire',
    option_b: 'Marvin Gaye - Sexual Healing',
    option_c: 'Coldplay - Midnight',
    option_d: 'a-ha - Take On Me',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 115,
    prompt: 'Who founded the Khan Academy?',
    option_a: 'Kitt Khan',
    option_b: 'Adel Khan',
    option_c: 'Sal Khan',
    option_d: 'Ben Khan',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
{
    question_id: 116,
    prompt: 'The Quadrangularis Reversum is best described as which of the following?',
    option_a: 'A chess move',
    option_b: 'A geometric theorem',
    option_c: 'A percussion instrument',
    option_d: 'A building in Oxford University',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 117,
    prompt: 'Which of these Indian languages is not part of the Indo-European language family?',
    option_a: 'Tamil',
    option_b: 'Hindi',
    option_c: 'Punjabi',
    option_d: 'Urdu',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 118,
    prompt: 'How many notes are there on a standard grand piano?',
    option_a: '98',
    option_b: '108',
    option_c: '78',
    option_d: '88',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 119,
    prompt: 'What is the romanized Arabic word for &quot;moon&quot;?',
    option_a: 'Kawkab',
    option_b: 'Shams',
    option_c: 'Qamar',
    option_d: 'Najma',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 120,
    prompt: 'The Swedish word &quot;Grunka&quot; means what in English?',
    option_a: 'Place',
    option_b: 'Pineapple',
    option_c: 'Thing',
    option_d: 'People',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 121,
    prompt: 'The Panama Canal was officially opened by which US president?',
    option_a: 'Woodrow Wilson',
    option_b: 'Calvin Coolidge',
    option_c: 'Herbert Hoover',
    option_d: 'Theodore Roosevelt',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 122,
    prompt: 'In the MMO RPG &quot;Realm of the Mad God&quot;, what dungeon is widely considered to be the most difficult?',
    option_a: 'The Shatter&#039;s',
    option_b: 'Snake Pit',
    option_c: 'The Tomb of the Acient&#039;s',
    option_d: 'The Puppet Master&#039;s Theater',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 123,
    prompt: 'Located in Chile, El Teniente is the world&#039;s largest underground mine for what metal?',
    option_a: 'Nickel',
    option_b: 'Silver',
    option_c: 'Copper',
    option_d: 'Iron',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 124,
    prompt: 'Named after the mallow flower, mauve is a shade of what?',
    option_a: 'Pink',
    option_b: 'Purple',
    option_c: 'Red',
    option_d: 'Brown',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 125,
    prompt: 'In the fictional SCP universe what &ldquo;Object Class&rdquo; is given to SCP&rsquo;s that cannot be contained.',
    option_a: 'Apollyon',
    option_b: 'Thaumiel',
    option_c: 'Keter-Thaumiel',
    option_d: 'Esoteric/Narrative Classes',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 126,
    prompt: 'Which of the following chemicals are found in eggplant seeds?',
    option_a: 'Mescaline',
    option_b: 'Cyanide',
    option_c: 'Psilocybin',
    option_d: 'Nicotine',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 127,
    prompt: 'What year was Queen Elizabeth II born?',
    option_a: '1929',
    option_b: '1930',
    option_c: '1926',
    option_d: '1923',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 128,
    prompt: 'This Ghanaian entrepreneur is a pioneer of microlending.',
    option_a: 'Ama Ata Aido',
    option_b: 'Sionne Neely',
    option_c: 'Esther Afua Ocloo',
    option_d: 'Farida Bedwei',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 129,
    prompt: 'Chartreuse is a color between yellow and what?',
    option_a: 'Red',
    option_b: 'Black',
    option_c: 'Purple',
    option_d: 'Green',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 130,
    prompt: 'What is the most commonly used noun in the English language?',
    option_a: 'Water',
    option_b: 'Man',
    option_c: 'Time',
    option_d: 'Home',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 131,
    prompt: 'Nephelococcygia is the practice of doing what?',
    option_a: 'Breaking glass with your voice',
    option_b: 'Swimming in freezing water',
    option_c: 'Finding shapes in clouds',
    option_d: 'Sleeping with your eyes open',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 132,
    prompt: 'Which of the following is an existing family in &quot;The Sims&quot;?',
    option_a: 'The Simoleon Family',
    option_b: 'The Proud Family',
    option_c: 'The Goth Family',
    option_d: 'The Family',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 133,
    prompt: 'What is the romanized Chinese word for &quot;airplane&quot;?',
    option_a: 'Huojian',
    option_b: 'Feiji',
    option_c: 'Qiche',
    option_d: 'Zongxian',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 134,
    prompt: 'What was Bank of America originally established as?',
    option_a: 'Bank of Charlotte',
    option_b: 'Bank of Italy',
    option_c: 'Bank of Long Island',
    option_d: 'Bank of Pennsylvania',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 135,
    prompt: 'Roughly how many ingested apple seeds would it take to receive a fatal dose of cyanide?',
    option_a: '20',
    option_b: '2,000',
    option_c: '20,000',
    option_d: '200',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 136,
    prompt: 'Which church&#039;s interior in Vatican City was designed in 1503 by renaissance architects including Bramante, Michelangelo and Bernini?',
    option_a: 'St. Mark&rsquo;s Basilica',
    option_b: 'The Duomo of Florence',
    option_c: 'St. Peter&#039;s Basilica',
    option_d: 'Catania Cathedral',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 137,
    prompt: 'Before the 19th Century, the &quot;Living Room&quot; was originally called the...',
    option_a: 'Parlor',
    option_b: 'Open Room',
    option_c: 'Sitting Room',
    option_d: 'Loft',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 138,
    prompt: 'What does the Latin phrase &quot;Veni, vidi, vici&quot; translate into English?',
    option_a: 'See no evil, hear no evil, speak no evil',
    option_b: 'Life, liberty, and happiness',
    option_c: 'Past, present, and future',
    option_d: 'I came, I saw, I conquered',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 139,
    prompt: 'The words &quot;bungalow&quot; and &quot;shampoo&quot; originate from the languages of which country?',
    option_a: 'China',
    option_b: 'India',
    option_c: 'Papua New Guinea',
    option_d: 'Ethiopia',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 140,
    prompt: 'De Eemhof, Port Zelande and Het Heijderbos are holiday villas owned by what company?',
    option_a: 'Keycamp',
    option_b: 'Villa Plus',
    option_c: 'Center Parcs',
    option_d: 'Yelloh Village',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 141,
    prompt: 'Which film star has his statue in Leicester Square?',
    option_a: 'Alfred Hitchcock',
    option_b: 'Charlie Chaplin',
    option_c: 'Paul Newman',
    option_d: 'Rowan Atkinson ',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 142,
    prompt: 'How many calories are in a 355 ml can of Pepsi Cola?',
    option_a: '100',
    option_b: '155',
    option_c: '150',
    option_d: '200',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 143,
    prompt: 'What was the third country to have a McDonald&#039;s restaurant?',
    option_a: 'Australia',
    option_b: 'Costa Rica',
    option_c: 'Japan',
    option_d: 'France',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 144,
    prompt: 'Disney&#039;s Haunted Mansion is home to a trio of Hitchhiking Ghosts. Which of these is NOT one of them?',
    option_a: 'Gus',
    option_b: 'Phineas',
    option_c: 'Ezra',
    option_d: 'Harry',
    correct_option: 'd',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 145,
    prompt: 'In &quot;Resident Evil 3&quot;, how many inventory slots does Jill have at the start of the game?',
    option_a: '8',
    option_b: '6',
    option_c: '10',
    option_d: '12',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 146,
    prompt: 'Which of the following is not another name for the eggplant?',
    option_a: 'Potimarron',
    option_b: 'Brinjal',
    option_c: 'Guinea Squash',
    option_d: 'Melongene',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 147,
    prompt: 'Which musician has collaborated with American producer Porter Robinson and released the 2016 song &quot;Shelter&quot;?',
    option_a: 'deadmau5',
    option_b: 'Zedd',
    option_c: 'Madeon',
    option_d: 'Mat Zo',
    correct_option: 'c',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 148,
    prompt: 'To which language family does Kazakh belong?',
    option_a: 'Turkic',
    option_b: 'Mongolic',
    option_c: 'Indo-European',
    option_d: 'Uralic',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 149,
    prompt: 'Which of the following languages does NOT use gender as a part of its grammar?',
    option_a: 'Turkish',
    option_b: 'German',
    option_c: 'Danish',
    option_d: 'Polish',
    correct_option: 'a',
    difficulty: 'hard',
    category: 'General Knowledge'
  },
  {
    question_id: 150,
    prompt: 'Which of these anatomical terms refers to the tail end of the creature?',
    option_a: 'Coronal',
    option_b: 'Caudal',
    option_c: 'Ventral',
    option_d: 'Proximal',
    correct_option: 'b',
    difficulty: 'hard',
    category: 'General Knowledge'
  }
]

  const filtered = allQuestions.filter((q) => q.difficulty === _difficulty);
  return filtered.slice(0, _quantity);
}

export async function saveMatch({ _roomCode, _hostUserId, _startedAt, _result }) {
  // Function content: to be filled in
  // Inserts a completed game's high-level stats into the MATCHES table and returns the newly generated match_id, needed by saveMatchPlayers
  // data format { roomCode, hostUserId, startedAt, result }
  // N.B. Result witll be either "defeat", "victory", "abandoned".
  // N.B. endedAt is generated automatically on record entry in the DB as well as match_id
  // called at: gameEnded, once per match or if a player disconnects and game ends early
}

export async function saveMatchPlayers(_playersArray) {
  // Function content: to be filled in
  // Inserts individual player accuracy scores for a specific match into the MATCH_PLAYERS junction table.
  // playersArray format [{ match_id, user_id, accuracy }, ...]
  // called at: gameEnded, once per match, after saveMatch
}

export async function createRoomRecord(_roomCode) {
  // Function content: to be filled in
  // Inserts a new row into the ROOMS table to log the creation time of a specific room code.
  // insert new row into ROOMS table with code = roomCode and created_at = current timestamp
  // called at: joinRoom
}

export async function updateRoomEnded(_roomCode) {
  // to be filled in
  // Updates an existing row in the ROOMS table with the final timestamp when that game concludes. update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
}

export async function getAllCharacters() {
  // Function content: to be filled in
  // Retrieves the complete list of available characters from the CHARACTERS table for the frontend selection API GET /api/characters
}

export async function getCharacter(characterId) {
  // Function content: to be replaced (currently returns mocks)
  // Retrieves a specific character's stats from the CHARACTERS table using their character_id for backend game initialization.
  // we still need this (even if the charcter selection screen feteches via API) because backend needs to load character from BE not from FE

const mockCharacters = [
  {
    character_id: 1,
    name: 'Denis McCload',
    image_name: 'Denis',
    description: 'A seeker of forbidden knowledge.',
    bio: 'I lost everything. My family, my home, my hope. I will not lose my will to fight.',
    base_attack: 5,
    base_sanity: 150,
    difficulty_scaling: 1,
  },
  {
    character_id: 2,
    name: 'GreyStaff',
    image_name: 'GreyStaff',
    description: 'Used to dealing with the unknown.',
    bio: 'Feel my power. I am the great wizard. I am not delusional.',
    base_attack: 10,
    base_sanity: 120,
    difficulty_scaling: 1,
  },
  {
    character_id: 3,
    name: 'Patris Deathstare',
    image_name: 'Patris',
    description: 'Dabbles in the dark arts.',
    bio: 'I grew up in the cult that made this. Now I must end it all.',
    base_attack: 15,
    base_sanity: 90,
    difficulty_scaling: 2,
  },
  {
    character_id: 4,
    name: 'Unknown',
    image_name: 'Unknown',
    description: 'Hardened by past conflicts.',
    bio: 'Kill... Kill... KILL THEM ALL!',
    base_attack: 20,
    base_sanity: 70,
    difficulty_scaling: 2,
  },
];
  return mockCharacters.find((c) => c.character_id === Number(characterId));
}
