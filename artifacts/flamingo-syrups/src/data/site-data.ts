import jamunImg from "@assets/jamun_syrup.jpg";
import coconutImg from "@assets/coconut_syrup.jpg";
import cinnamonImg from "@assets/cinnamon_syrup.jpg";
import peachImg from "@assets/peach_syrup.jpg";
import greenMelonImg from "@assets/green_melon_syrup.jpg";
import irishCreamImg from "@assets/irish_cream_syrup.jpg";
import grenadineImg from "@assets/grenadine_syrup.jpg";
import watermelonImg from "@assets/watermelon_syrup.jpg";
import litchiImg from "@assets/litchi_syrup.jpg";
import pandanImg from "@assets/pandan_syrup.jpg";
import cherryImg from "@assets/cherry_syrup.jpg";
import pineappleImg from "@assets/pineapple_syrup.jpg";
import strawberryImg from "@assets/strawberry_syrup.jpg";
import tripleSecImg from "@assets/triple_sec_syrup.jpg";
import blueCuracaoImg from "@assets/blue_curacao_syrup.jpg";
import limoncelloImg from "@assets/limoncello_syrup.jpg";
import guavaChilliImg from "@assets/guava_chilli_syrup.jpg";
import palomaImg from "@assets/paloma_syrup.jpg";
import cucumberImg from "@assets/cucumber_syrup.jpg";
import greenAppleImg from "@assets/green_apple_syrup.jpg";
import raspberryImg from "@assets/raspberry_syrup.jpg";
import passionFruitImg from "@assets/passion_fruit_syrup.jpg";
import vanillaImg from "@assets/vanilla_syrup.jpg";
import mojitoMintImg from "@assets/mojito_mint_syrup.jpg";
import figImg from "@assets/fig_syrup.jpg";
import roseImg from "@assets/rose_syrup.jpg";
import jackfruitImg from "@assets/jackfruit_syrup.jpg";
import elderflowerImg from "@assets/elderflower_syrup.jpg";
import lavenderImg from "@assets/lavender_syrup.jpg";

export type SyrupCategory =
  | "All"
  | "Fruit & Berry"
  | "Citrus"
  | "Herbal & Botanical"
  | "Melon"
  | "Tropical"
  | "Classic Cocktail"
  | "Creamy & Dessert"
  | "Spiced";

export type Recipe = {
  name: string;
  ingredients: string[];
  method: string;
  garnish: string;
};

export type SyrupItem = {
  id: string;
  name: string;
  category: Exclude<SyrupCategory, "All">;
  index: string;
  description: string;
  ingredientsList?: string;
  pairingNotes: string;
  volume: string;
  tag: string;
  tone:
    | "rose"
    | "petal"
    | "mint"
    | "amber"
    | "blue"
    | "purple"
    | "gold"
    | "emerald";
  badgeColor: string;
  recipe: Recipe;
  image?: string;
};

export const brand = {
  name: "Flamingo",
  creator: "Manoj Alphones",
  phone: "+91 8971825137",
  email: "mjsince1987@gmail.com",
  address: "No 6, RA Road, Ejipura, Bengaluru-560047",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("No 6, RA Road, Ejipura, Bengaluru-560047")}`,
};

export const WHATSAPP_NUMBER = "918971825137";
export const INSTAGRAM_URL = "https://www.instagram.com/flamingosyrups";

export const socialLinks = {
  instagram: INSTAGRAM_URL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappGeneralUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Flamingo, I would like to know more about your syrup range.")}`,
  getProductWhatsappUrl: (syrupName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Flamingo, I would like to enquire about Flamingo ${syrupName} Syrup, 750 ml Professional Pack.`)}`,
};

export const syrupsList: SyrupItem[] = [
  {
    id: "jamun",
    name: "Jamun Syrup",
    category: "Fruit & Berry",
    index: "01",
    description:
      "A rich, vibrant syrup inspired by the bold taste of Indian jamun, with deep berry notes and a subtly tangy finish. Perfect for adding an exotic twist to cocktails and mocktails.",
    pairingNotes:
      "Gins, sparkling sodas, spiced tequila highballs, and regional fruit coolers.",
    volume: "750 ml",
    tag: "Rich & Tangy",
    tone: "purple",
    badgeColor: "#6b21a8",
    image: jamunImg,
    recipe: {
      name: "Jamun Old Fashioned",
      ingredients: [
        "Bourbon — 60 ml",
        "Jamun Syrup — 10 ml",
        "Angostura Bitters — 2 dashes",
      ],
      method: "Stir with ice and strain over a large ice cube.",
      garnish: "Orange peel.",
    },
  },
  {
    id: "limoncello",
    name: "Limoncello Syrup",
    category: "Citrus",
    index: "02",
    description:
      "Bright, zesty and refreshing, with the unmistakable character of ripe lemon. A lively citrus syrup that brings sunshine and freshness to every pour.",
    pairingNotes:
      "Spritzes, wheat beers, vodka collins, and iced citrus infusions.",
    volume: "750 ml",
    tag: "Bright Citrus",
    tone: "gold",
    badgeColor: "#ca8a04",
    image: limoncelloImg,
    recipe: {
      name: "Limoncello Collins",
      ingredients: [
        "Gin — 45 ml",
        "Limoncello Syrup — 20 ml",
        "Fresh Lemon Juice — 20 ml",
        "Soda — 60 ml",
      ],
      method:
        "Shake gin, syrup and lemon with ice. Strain into an ice-filled Collins glass and top with soda.",
      garnish: "Lemon wheel.",
    },
  },
  {
    id: "triple-sec",
    name: "Triple Sec Syrup",
    category: "Citrus",
    index: "03",
    description:
      "A smooth, aromatic orange syrup with vibrant citrus sweetness and a delicate bitter-orange finish. Ideal for creating refreshing margaritas and citrus-forward cocktails.",
    pairingNotes: "Tequila, white rum, orange spritzes, and citrus teas.",
    volume: "750 ml",
    tag: "Bittersweet Orange",
    tone: "amber",
    badgeColor: "#ea580c",
    image: tripleSecImg,
    recipe: {
      name: "Triple Sec Margarita",
      ingredients: [
        "Tequila — 50 ml",
        "Triple Sec Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method:
        "Shake with ice and strain into a salt-rimmed glass over fresh ice.",
      garnish: "Lime wheel.",
    },
  },
  {
    id: "guava-chilli",
    name: "Guava Chilli Syrup",
    category: "Fruit & Berry",
    index: "04",
    description:
      "Juicy tropical guava meets a playful chilli kick. Sweet, fruity and subtly spicy, this bold combination adds an exciting twist to every cocktail.",
    pairingNotes:
      "Tequila, mezcal, spiced rum, rimmed highballs, and fiery lemonades.",
    volume: "750 ml",
    tag: "Sweet & Fiery",
    tone: "rose",
    badgeColor: "#e11d48",
    image: guavaChilliImg,
    recipe: {
      name: "Guava Chilli Margarita",
      ingredients: [
        "Tequila — 50 ml",
        "Guava Chilli Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake with ice and strain over fresh ice.",
      garnish: "Guava slice and chilli.",
    },
  },
  {
    id: "paloma-grapefruit",
    name: "Paloma (Grapefruit) Syrup",
    category: "Citrus",
    index: "05",
    description:
      "Bright grapefruit character with a refreshing citrus tang and balanced sweetness. Crafted to bring a crisp, sophisticated edge to tequila-based drinks.",
    pairingNotes:
      "Blanco tequila, soda floats, mezcal palomas, and sparkling aperitifs.",
    volume: "750 ml",
    tag: "Tart & Zesty",
    tone: "rose",
    badgeColor: "#f43f5e",
    image: palomaImg,
    recipe: {
      name: "Paloma",
      ingredients: [
        "Tequila — 50 ml",
        "Paloma (Grapefruit) Syrup — 20 ml",
        "Fresh Lime Juice — 15 ml",
        "Soda — 60 ml",
      ],
      method: "Build over ice in a highball glass and stir gently.",
      garnish: "Grapefruit wedge.",
    },
  },
  {
    id: "cucumber",
    name: "Cucumber Syrup",
    category: "Herbal & Botanical",
    index: "06",
    description:
      "Cool, clean and wonderfully refreshing, with delicate cucumber notes and a fresh finish. Perfect for light, elegant cocktails and summer serves.",
    pairingNotes:
      "Dry gin, tonic, elderflower coolers, and green botanical mocktails.",
    volume: "750 ml",
    tag: "Cool Botanical",
    tone: "mint",
    badgeColor: "#059669",
    image: cucumberImg,
    recipe: {
      name: "Cucumber Gin Fizz",
      ingredients: [
        "Gin — 45 ml",
        "Cucumber Syrup — 20 ml",
        "Fresh Lemon Juice — 20 ml",
        "Soda — 60 ml",
      ],
      method:
        "Shake gin, syrup and lemon with ice. Strain over fresh ice and top with soda.",
      garnish: "Cucumber ribbon.",
    },
  },
  {
    id: "green-apple",
    name: "Green Apple Syrup",
    category: "Fruit & Berry",
    index: "07",
    description:
      "Crisp and juicy with the refreshing tartness of freshly picked green apples. A vibrant syrup that adds a bright, fruity character to cocktails.",
    pairingNotes:
      "Vodka martinis, green apple sodas, sangrias, and crushed ice coolers.",
    volume: "750 ml",
    tag: "Crisp & Sour",
    tone: "emerald",
    badgeColor: "#65a30d",
    image: greenAppleImg,
    recipe: {
      name: "Green Apple Martini",
      ingredients: [
        "Vodka — 50 ml",
        "Green Apple Syrup — 20 ml",
        "Fresh Lemon Juice — 10 ml",
      ],
      method:
        "Shake vigorously with ice and fine strain into a chilled martini glass.",
      garnish: "Green apple slice.",
    },
  },
  {
    id: "raspberry",
    name: "Raspberry Syrup",
    category: "Fruit & Berry",
    index: "08",
    description:
      "Lush and fruity with vibrant raspberry aromas, balanced sweetness and a delicate berry tang. A versatile choice for colourful, refreshing cocktails.",
    pairingNotes:
      "Clover clubs, bourbon sours, lemonade floats, and berry seltzers.",
    volume: "750 ml",
    tag: "Wild Berry",
    tone: "rose",
    badgeColor: "#be123c",
    image: raspberryImg,
    recipe: {
      name: "Raspberry Bramble",
      ingredients: [
        "Gin — 45 ml",
        "Raspberry Syrup — 20 ml",
        "Fresh Lemon Juice — 20 ml",
        "Soda — 30 ml",
      ],
      method:
        "Shake gin, syrup and lemon. Pour over crushed ice and top with soda.",
      garnish: "Fresh raspberries and lemon.",
    },
  },
  {
    id: "strawberry",
    name: "Strawberry Syrup",
    category: "Fruit & Berry",
    index: "09",
    description:
      "Sweet, juicy and irresistibly fruity, capturing the fresh character of ripe strawberries. A delicious addition to refreshing cocktails, desserts and mocktails.",
    pairingNotes: "Daiquiris, gin fizz, iced teas, and berry milkshakes.",
    volume: "750 ml",
    tag: "Summer Berry",
    tone: "rose",
    badgeColor: "#e11d48",
    image: strawberryImg,
    recipe: {
      name: "Strawberry Daiquiri",
      ingredients: [
        "White Rum — 50 ml",
        "Strawberry Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake hard with ice and strain into a chilled coupe.",
      garnish: "Fresh strawberry.",
    },
  },
  {
    id: "pineapple",
    name: "Pineapple Syrup",
    category: "Fruit & Berry",
    index: "10",
    description:
      "Tropical, juicy and naturally vibrant, with bright pineapple sweetness and a refreshing fruity finish. Made for creating irresistible island-inspired drinks.",
    pairingNotes:
      "Dark rum, coconut cream, spicy mezcal, and tropical punches.",
    volume: "750 ml",
    tag: "Tropical Sun",
    tone: "gold",
    badgeColor: "#ca8a04",
    image: pineappleImg,
    recipe: {
      name: "Pineapple Mai Tai",
      ingredients: [
        "Dark Rum — 30 ml",
        "White Rum — 30 ml",
        "Pineapple Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake with ice and pour over crushed ice.",
      garnish: "Pineapple leaf and lime.",
    },
  },
  {
    id: "cherry",
    name: "Cherry Syrup",
    category: "Fruit & Berry",
    index: "11",
    description:
      "Deep, luscious cherry flavour with rich fruitiness and a smooth sweet-tart finish. A sophisticated syrup that adds depth and colour to classic cocktails.",
    pairingNotes:
      "Bourbon, cola highballs, craft sodas, and dark spirit sours.",
    volume: "750 ml",
    tag: "Deep Stone Fruit",
    tone: "rose",
    badgeColor: "#9f1239",
    image: cherryImg,
    recipe: {
      name: "Cherry Manhattan",
      ingredients: [
        "Bourbon or Rye Whiskey — 50 ml",
        "Cherry Syrup — 10 ml",
        "Sweet Vermouth — 20 ml",
        "Angostura Bitters — 2 dashes",
      ],
      method: "Stir with ice and strain into a chilled coupe.",
      garnish: "Cherry.",
    },
  },
  {
    id: "blue-curacao",
    name: "Blue Curaçao Syrup",
    category: "Classic Cocktail",
    index: "12",
    description:
      "Bright citrus flavour with refreshing orange notes and an eye-catching blue hue. Designed to turn classic cocktails into vibrant, memorable serves.",
    pairingNotes:
      "Blue Hawaiians, tropical lemonades, gin tonics, and layered mocktails.",
    volume: "750 ml",
    tag: "Electric Citrus",
    tone: "blue",
    badgeColor: "#0284c7",
    image: blueCuracaoImg,
    recipe: {
      name: "Blue Curaçao Sour",
      ingredients: [
        "Vodka — 45 ml",
        "Blue Curaçao Syrup — 20 ml",
        "Fresh Lemon Juice — 20 ml",
      ],
      method: "Shake with ice and strain over fresh ice.",
      garnish: "Orange peel.",
    },
  },
  {
    id: "pandan",
    name: "Pandan Syrup",
    category: "Herbal & Botanical",
    index: "13",
    description:
      "Delicately aromatic with distinctive pandan notes and a soft, sweet finish. An exotic Asian-inspired syrup that brings elegance and uniqueness to every drink.",
    pairingNotes:
      "Aged rum, cold brew coffee, coconut water highballs, and milk teas.",
    volume: "750 ml",
    tag: "Aromatic Leaf",
    tone: "mint",
    badgeColor: "#047857",
    image: pandanImg,
    recipe: {
      name: "Pandan Mojito",
      ingredients: [
        "White Rum — 50 ml",
        "Pandan Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
        "Fresh Mint — 8–10 leaves",
        "Soda — 60 ml",
      ],
      method:
        "Gently muddle mint and lime. Add rum and syrup. Fill with crushed ice and top with soda.",
      garnish: "Mint sprig and lime.",
    },
  },
  {
    id: "grenadine",
    name: "Grenadine Syrup",
    category: "Classic Cocktail",
    index: "14",
    description:
      "Lush, fruity and beautifully vibrant, with a sweet-tart character that adds colour and balance. A timeless cocktail essential for creating stunning layered drinks.",
    pairingNotes:
      "Shirley Temples, Tequila Sunrises, Bacardi cocktails, and craft sodas.",
    volume: "750 ml",
    tag: "Pomegranate Ruby",
    tone: "rose",
    badgeColor: "#991b1b",
    image: grenadineImg,
    recipe: {
      name: "Jack Rose",
      ingredients: [
        "Apple Brandy — 50 ml",
        "Grenadine Syrup — 15 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake with ice and strain into a chilled coupe.",
      garnish: "Lime twist.",
    },
  },
  {
    id: "litchi",
    name: "Litchi Syrup",
    category: "Fruit & Berry",
    index: "15",
    description:
      "Delicate, floral and irresistibly juicy, inspired by the exotic sweetness of ripe litchi. Perfect for elegant, refreshing cocktails with a tropical touch.",
    pairingNotes:
      "Vodka martinis, prosecco sparklers, green tea coolers, and floral gin floats.",
    volume: "750 ml",
    tag: "Floral Exotic",
    tone: "petal",
    badgeColor: "#db2777",
    image: litchiImg,
    recipe: {
      name: "Litchi Martini",
      ingredients: [
        "Vodka — 50 ml",
        "Litchi Syrup — 20 ml",
        "Fresh Lemon Juice — 10 ml",
      ],
      method: "Shake with ice and fine strain into a chilled martini glass.",
      garnish: "Litchi.",
    },
  },
  {
    id: "irish-cream",
    name: "Irish Cream Syrup",
    category: "Creamy & Dessert",
    index: "16",
    description:
      "Smooth and indulgent with creamy vanilla, caramel and subtle coffee-inspired notes. A luxurious syrup that transforms coffee and cocktails into rich, comforting creations.",
    pairingNotes:
      "Espresso martinis, cold brews, dessert cocktails, and steamed lattes.",
    volume: "750 ml",
    tag: "Rich & Creamy",
    tone: "amber",
    badgeColor: "#b45309",
    image: irishCreamImg,
    recipe: {
      name: "Irish Cream White Russian",
      ingredients: [
        "Vodka — 40 ml",
        "Irish Cream Syrup — 20 ml",
        "Coffee Liqueur — 15 ml",
        "Fresh Cream — 30 ml",
      ],
      method: "Build over ice and stir gently. Float fresh cream on top.",
      garnish: "Coffee beans.",
    },
  },
  {
    id: "watermelon",
    name: "Watermelon Syrup",
    category: "Fruit & Berry",
    index: "17",
    description:
      "Fresh, juicy and delightfully sweet, capturing the refreshing character of ripe watermelon. Perfect for vibrant summer cocktails and refreshing serves.",
    pairingNotes: "Blanco tequila, mint coolers, vodka seltzers, and lemonade.",
    volume: "750 ml",
    tag: "Juicy Summer",
    tone: "rose",
    badgeColor: "#f43f5e",
    image: watermelonImg,
    recipe: {
      name: "Watermelon Daiquiri",
      ingredients: [
        "White Rum — 50 ml",
        "Watermelon Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake with ice and strain into a chilled coupe.",
      garnish: "Watermelon slice.",
    },
  },
  {
    id: "peach",
    name: "Peach Syrup",
    category: "Fruit & Berry",
    index: "18",
    description:
      "Soft, fragrant and beautifully fruity, with the luscious sweetness of ripe peaches. A refined syrup for elegant, refreshing cocktails and sparkling serves.",
    pairingNotes:
      "Bourbon, iced black tea, sparkling wine, and peach bellinis.",
    volume: "750 ml",
    tag: "Velvet Stone Fruit",
    tone: "amber",
    badgeColor: "#d97706",
    image: peachImg,
    recipe: {
      name: "Peach Bellini",
      ingredients: ["Peach Syrup — 20 ml", "Prosecco — 90 ml"],
      method:
        "Add peach syrup to a chilled flute and slowly top with Prosecco. Stir gently.",
      garnish: "Peach slice.",
    },
  },
  {
    id: "cinnamon",
    name: "Cinnamon Syrup",
    category: "Spiced",
    index: "19",
    description:
      "Warm, aromatic and gently spiced, with rich cinnamon character and a smooth sweet finish. Adds comforting depth and sophistication to cocktails and hot beverages.",
    pairingNotes: "Aged rum, Tiki punches, hot toddies, and craft lattes.",
    volume: "750 ml",
    tag: "Warm Bark Spice",
    tone: "amber",
    badgeColor: "#9a3412",
    image: cinnamonImg,
    recipe: {
      name: "Cinnamon Whiskey Sour",
      ingredients: [
        "Bourbon — 50 ml",
        "Cinnamon Syrup — 15 ml",
        "Fresh Lemon Juice — 25 ml",
        "Egg White — 15 ml (optional)",
      ],
      method:
        "Dry shake if using egg white. Add ice and shake again. Fine strain over fresh ice.",
      garnish: "Cinnamon stick and lemon peel.",
    },
  },
  {
    id: "green-melon",
    name: "Green Melon Syrup",
    category: "Melon",
    index: "20",
    description:
      "Sweet, juicy and refreshingly fruity, with delicate melon notes and a vibrant character. A playful syrup for colourful, tropical-inspired cocktails.",
    pairingNotes:
      "Japanese whiskey, melon sour, coconut water, and tropical highballs.",
    volume: "750 ml",
    tag: "Honeydew Glow",
    tone: "emerald",
    badgeColor: "#65a30d",
    image: greenMelonImg,
    recipe: {
      name: "Green Melon Sour",
      ingredients: [
        "Vodka — 45 ml",
        "Green Melon Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake with ice and strain over fresh ice.",
      garnish: "Melon slice.",
    },
  },
  {
    id: "coconut",
    name: "Coconut Syrup",
    category: "Tropical",
    index: "21",
    description:
      "Creamy, tropical and beautifully aromatic, with smooth coconut notes and a luscious finish. Perfect for bringing an instant island-inspired indulgence to every drink.",
    pairingNotes:
      "White rum, pineapple juice, iced matcha, and tropical coolers.",
    volume: "750 ml",
    tag: "Tropical Cream",
    tone: "petal",
    badgeColor: "#78350f",
    image: coconutImg,
    recipe: {
      name: "Coconut Colada",
      ingredients: [
        "White Rum — 50 ml",
        "Coconut Syrup — 20 ml",
        "Pineapple Juice — 80 ml",
        "Fresh Lime Juice — 10 ml",
      ],
      method:
        "Shake with ice and pour over crushed ice, or blend for a frozen serve.",
      garnish: "Pineapple leaf and coconut.",
    },
  },
  {
    id: "lavender",
    name: "Lavender Syrup",
    category: "Herbal & Botanical",
    index: "22",
    description:
      "Delicately floral with a soft, aromatic sweetness and an elegant finish. A sophisticated touch for refreshing cocktails, mocktails, teas, and crafted beverages.",
    ingredientsList:
      "Sugar, Water, Permitted Lavender Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Dry gin, sparkling wine, lemonade, Earl Grey iced teas, and botanical sours.",
    volume: "750 ml",
    tag: "Floral Botanical",
    tone: "purple",
    badgeColor: "#7c3aed",
    image: lavenderImg,
    recipe: {
      name: "Lavender Gin Fizz",
      ingredients: [
        "Gin — 45 ml",
        "Lavender Syrup — 20 ml",
        "Fresh Lemon Juice — 20 ml",
        "Soda — 60 ml",
      ],
      method:
        "Shake gin, syrup and lemon with ice. Strain into an ice-filled Collins glass and top with soda.",
      garnish: "Lavender sprig or lemon wheel.",
    },
  },
  {
    id: "elderflower",
    name: "Elderflower Syrup",
    category: "Herbal & Botanical",
    index: "23",
    description:
      "Light, floral and beautifully fragrant, with a subtle fruity sweetness. Adds a refined botanical character to sparkling drinks, cocktails, mocktails, and summer serves.",
    ingredientsList:
      "Sugar, Water, Permitted Elderflower Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Prosecco, gin tonics, cucumber spritzes, and sparkling mineral water.",
    volume: "750 ml",
    tag: "Alpine Blossom",
    tone: "petal",
    badgeColor: "#059669",
    image: elderflowerImg,
    recipe: {
      name: "Elderflower Hugo Spritz",
      ingredients: [
        "Prosecco — 90 ml",
        "Elderflower Syrup — 20 ml",
        "Soda — 30 ml",
        "Fresh Mint — 6 leaves",
      ],
      method:
        "Build syrup and muddled mint over ice in a wine glass. Top with Prosecco and soda, stir gently.",
      garnish: "Mint sprig and lime wheel.",
    },
  },
  {
    id: "rose",
    name: "Rose Syrup",
    category: "Herbal & Botanical",
    index: "24",
    description:
      "Romantically floral with a delicate rose aroma and luscious sweetness. Perfect for creating elegant beverages with a distinctive floral signature and luxurious appeal.",
    ingredientsList:
      "Sugar, Water, Permitted Rose Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Gin, white rum, iced milk teas, sparkling lemonades, and floral spritzes.",
    volume: "750 ml",
    tag: "Aromatic Petal",
    tone: "rose",
    badgeColor: "#e11d48",
    image: roseImg,
    recipe: {
      name: "Rose Petal Gimlet",
      ingredients: [
        "Gin — 50 ml",
        "Rose Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
      ],
      method: "Shake hard with ice and fine strain into a chilled coupe.",
      garnish: "Dried rose petals.",
    },
  },
  {
    id: "jackfruit",
    name: "Jackfruit Syrup",
    category: "Fruit & Berry",
    index: "25",
    description:
      "Rich, tropical and irresistibly fruity, capturing the distinctive sweetness of ripe jackfruit. A bold tropical addition to cocktails, mocktails, shakes, and desserts.",
    ingredientsList:
      "Sugar, Water, Permitted Jackfruit Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Aged rum, spiced tequila, tropical punches, and coconut water highballs.",
    volume: "750 ml",
    tag: "Exotic Nectar",
    tone: "gold",
    badgeColor: "#d97706",
    image: jackfruitImg,
    recipe: {
      name: "Jackfruit Rum Punch",
      ingredients: [
        "Dark Rum — 45 ml",
        "Jackfruit Syrup — 20 ml",
        "Fresh Lime Juice — 15 ml",
        "Pineapple Juice — 40 ml",
      ],
      method: "Shake with ice and strain over crushed ice in a Tiki glass.",
      garnish: "Pineapple leaf and lime wheel.",
    },
  },
  {
    id: "fig",
    name: "Fig Syrup",
    category: "Fruit & Berry",
    index: "26",
    description:
      "Lusciously sweet with deep fruity notes and a smooth, sophisticated finish. Brings a rich gourmet character to cocktails, coffee creations, desserts, and specialty drinks.",
    ingredientsList:
      "Sugar, Water, Permitted Fig Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Bourbon, rye whiskey, aged rum, dark spirit sours, and artisanal sodas.",
    volume: "750 ml",
    tag: "Rich Dark Fruit",
    tone: "amber",
    badgeColor: "#78350f",
    image: figImg,
    recipe: {
      name: "Fig & Walnut Old Fashioned",
      ingredients: [
        "Bourbon — 60 ml",
        "Fig Syrup — 15 ml",
        "Aromatic Bitters — 2 dashes",
      ],
      method: "Stir with ice and strain over a large ice cube.",
      garnish: "Fresh fig slice or orange twist.",
    },
  },
  {
    id: "mojito-mint",
    name: "Mojito Mint Syrup",
    category: "Herbal & Botanical",
    index: "27",
    description:
      "Cool, crisp and refreshingly minty, with a bright aromatic finish. Crafted to bring an instant burst of freshness to mojitos, coolers, mocktails, and summer beverages.",
    ingredientsList:
      "Sugar, Water, Permitted Mojito Mint Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "White rum, blanco tequila, sparkling sodas, iced teas, and green mocktails.",
    volume: "750 ml",
    tag: "Garden Mint",
    tone: "mint",
    badgeColor: "#10b981",
    image: mojitoMintImg,
    recipe: {
      name: "Craft Mint Mojito",
      ingredients: [
        "White Rum — 50 ml",
        "Mojito Mint Syrup — 20 ml",
        "Fresh Lime Juice — 20 ml",
        "Soda — 60 ml",
      ],
      method:
        "Build rum, syrup and lime juice over ice. Top with soda and stir gently.",
      garnish: "Fresh mint sprig and lime wedge.",
    },
  },
  {
    id: "vanilla",
    name: "Vanilla Syrup",
    category: "Creamy & Dessert",
    index: "28",
    description:
      "Smooth, creamy and beautifully aromatic, with the comforting sweetness of vanilla. A versatile classic that elevates coffee, milkshakes, cocktails, desserts, and specialty beverages.",
    ingredientsList:
      "Sugar, Water, Permitted Vanilla Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Espresso, cold brew, dark rum, bourbon sours, and steamed lattes.",
    volume: "750 ml",
    tag: "Vanilla Bean",
    tone: "amber",
    badgeColor: "#b45309",
    image: vanillaImg,
    recipe: {
      name: "Vanilla Espresso Martini",
      ingredients: [
        "Vodka — 40 ml",
        "Vanilla Syrup — 15 ml",
        "Fresh Espresso — 30 ml",
        "Coffee Liqueur — 15 ml",
      ],
      method:
        "Shake hard with ice and fine strain into a chilled martini glass.",
      garnish: "Three coffee beans.",
    },
  },
  {
    id: "passion-fruit",
    name: "Passion Fruit Syrup",
    category: "Fruit & Berry",
    index: "29",
    description:
      "Bold, tropical and irresistibly tangy, bursting with vibrant passion fruit character. Adds a lively sweet-tart twist to cocktails, mocktails, coolers, and tropical creations.",
    ingredientsList:
      "Sugar, Water, Permitted Passion Fruit Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.",
    pairingNotes:
      "Vodka, white rum, prosecco floats, Tiki cocktails, and tropical lemonades.",
    volume: "750 ml",
    tag: "Tart & Tropical",
    tone: "gold",
    badgeColor: "#ca8a04",
    image: passionFruitImg,
    recipe: {
      name: "Pornstar Passion Martini",
      ingredients: [
        "Vodka — 45 ml",
        "Passion Fruit Syrup — 20 ml",
        "Fresh Lime Juice — 15 ml",
        "Prosecco Shot — 30 ml (side)",
      ],
      method:
        "Shake vodka, syrup and lime juice with ice. Strain into a chilled coupe and serve with a Prosecco shot on the side.",
      garnish: "Half a passion fruit.",
    },
  },
];

export const timeline = [
  {
    year: "2023–24",
    role: "Beverage Head & Master Mixologist",
    context: "Phoenix · Bellona Hospitality",
  },
  { year: "2021–23", role: "Beverage Head", context: "Gatsby" },
  {
    year: "Earlier",
    role: "Beverage Manager & Head Mixologist",
    context: "Beverage-led roles across hospitality",
  },
];
