import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define brand data & syrups
const brand = {
  name: 'Flamingo',
  tagline: '29 Exceptional Flavours. Endless Possibilities.',
  creator: 'Manoj Alphones (Master Mixologist)',
  phone: '+91 8971825137',
  email: 'mjsince1987@gmail.com',
  address: 'No 6, RA Road, Ejipura, Bengaluru-560047',
  whatsappUrl: 'https://wa.me/918971825137?text=Hello%20Flamingo%2C%20I%20would%20like%20to%20enquire%20about%20your%20syrup%20range.',
  website: 'https://gagangowdap.github.io/Flamingo/',
};

const assetsDir = path.resolve(__dirname, '../attached_assets');

const syrups = [
  { id: 'jamun', name: 'Jamun Syrup', category: 'Fruit & Berry', index: '01', image: 'jamun_syrup.jpg', desc: 'A rich, vibrant syrup inspired by the bold taste of Indian jamun, with deep berry notes and a subtly tangy finish. Perfect for adding an exotic twist to cocktails and mocktails.', ingredients: 'Sugar, Water, Permitted Jamun Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Gins, sparkling sodas, spiced tequila highballs, and regional fruit coolers.', recipe: { name: 'Jamun Old Fashioned', ingredients: ['Bourbon — 60 ml', 'Jamun Syrup — 10 ml', 'Angostura Bitters — 2 dashes'], method: 'Stir with ice and strain over a large ice cube.', garnish: 'Orange peel.' } },
  { id: 'limoncello', name: 'Limoncello Syrup', category: 'Citrus', index: '02', image: 'limoncello_syrup.jpg', desc: 'Bright, zesty and refreshing, with the unmistakable character of ripe lemon. A lively citrus syrup that brings sunshine and freshness to every pour.', ingredients: 'Sugar, Water, Permitted Limoncello Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Spritzes, wheat beers, vodka collins, and iced citrus infusions.', recipe: { name: 'Limoncello Collins', ingredients: ['Gin — 45 ml', 'Limoncello Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 60 ml'], method: 'Shake gin, syrup and lemon with ice. Strain into an ice-filled Collins glass and top with soda.', garnish: 'Lemon wheel.' } },
  { id: 'triple-sec', name: 'Triple Sec Syrup', category: 'Citrus', index: '03', image: 'triple_sec_syrup.jpg', desc: 'A smooth, aromatic orange syrup with vibrant citrus sweetness and a delicate bitter-orange finish. Ideal for creating refreshing margaritas and citrus-forward cocktails.', ingredients: 'Sugar, Water, Permitted Triple Sec Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Tequila, white rum, orange spritzes, and citrus teas.', recipe: { name: 'Triple Sec Margarita', ingredients: ['Tequila — 50 ml', 'Triple Sec Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and strain into a salt-rimmed glass over fresh ice.', garnish: 'Lime wheel.' } },
  { id: 'guava-chilli', name: 'Guava Chilli Syrup', category: 'Fruit & Berry', index: '04', image: 'guava_chilli_syrup.jpg', desc: 'Juicy tropical guava meets a playful chilli kick. Sweet, fruity and subtly spicy, this bold combination adds an exciting twist to every cocktail.', ingredients: 'Sugar, Water, Permitted Guava & Chilli Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Tequila, mezcal, spiced rum, rimmed highballs, and fiery lemonades.', recipe: { name: 'Guava Chilli Margarita', ingredients: ['Tequila — 50 ml', 'Guava Chilli Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and strain over fresh ice.', garnish: 'Guava slice and chilli.' } },
  { id: 'paloma-grapefruit', name: 'Paloma (Grapefruit) Syrup', category: 'Citrus', index: '05', image: 'paloma_syrup.jpg', desc: 'Bright grapefruit character with a refreshing citrus tang and balanced sweetness. Crafted to bring a crisp, sophisticated edge to tequila-based drinks.', ingredients: 'Sugar, Water, Permitted Grapefruit Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Blanco tequila, soda floats, mezcal palomas, and sparkling aperitifs.', recipe: { name: 'Paloma', ingredients: ['Tequila — 50 ml', 'Paloma (Grapefruit) Syrup — 20 ml', 'Fresh Lime Juice — 15 ml', 'Soda — 60 ml'], method: 'Build over ice in a highball glass and stir gently.', garnish: 'Grapefruit wedge.' } },
  { id: 'cucumber', name: 'Cucumber Syrup', category: 'Herbal & Botanical', index: '06', image: 'cucumber_syrup.jpg', desc: 'Cool, clean and wonderfully refreshing, with delicate cucumber notes and a fresh finish. Perfect for light, elegant cocktails and summer serves.', ingredients: 'Sugar, Water, Permitted Cucumber Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Dry gin, tonic, elderflower coolers, and green botanical mocktails.', recipe: { name: 'Cucumber Gin Fizz', ingredients: ['Gin — 45 ml', 'Cucumber Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 60 ml'], method: 'Shake gin, syrup and lemon with ice. Strain over fresh ice and top with soda.', garnish: 'Cucumber ribbon.' } },
  { id: 'green-apple', name: 'Green Apple Syrup', category: 'Fruit & Berry', index: '07', image: 'green_apple_syrup.jpg', desc: 'Crisp and juicy with the refreshing tartness of freshly picked green apples. A vibrant syrup that adds a bright, fruity character to cocktails.', ingredients: 'Sugar, Water, Permitted Green Apple Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Vodka martinis, green apple sodas, sangrias, and crushed ice coolers.', recipe: { name: 'Green Apple Martini', ingredients: ['Vodka — 50 ml', 'Green Apple Syrup — 20 ml', 'Fresh Lemon Juice — 10 ml'], method: 'Shake vigorously with ice and fine strain into a chilled martini glass.', garnish: 'Green apple slice.' } },
  { id: 'raspberry', name: 'Raspberry Syrup', category: 'Fruit & Berry', index: '08', image: 'raspberry_syrup.jpg', desc: 'Lush and fruity with vibrant raspberry aromas, balanced sweetness and a delicate berry tang. A versatile choice for colourful, refreshing cocktails.', ingredients: 'Sugar, Water, Permitted Raspberry Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Clover clubs, bourbon sours, lemonade floats, and berry seltzers.', recipe: { name: 'Raspberry Bramble', ingredients: ['Gin — 45 ml', 'Raspberry Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 30 ml'], method: 'Shake gin, syrup and lemon. Pour over crushed ice and top with soda.', garnish: 'Fresh raspberries and lemon.' } },
  { id: 'strawberry', name: 'Strawberry Syrup', category: 'Fruit & Berry', index: '09', image: 'strawberry_syrup.jpg', desc: 'Sweet, juicy and irresistibly fruity, capturing the fresh character of ripe strawberries. A delicious addition to refreshing cocktails, desserts and mocktails.', ingredients: 'Sugar, Water, Permitted Strawberry Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Daiquiris, gin fizz, iced teas, and berry milkshakes.', recipe: { name: 'Strawberry Daiquiri', ingredients: ['White Rum — 50 ml', 'Strawberry Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake hard with ice and strain into a chilled coupe.', garnish: 'Fresh strawberry.' } },
  { id: 'pineapple', name: 'Pineapple Syrup', category: 'Fruit & Berry', index: '10', image: 'pineapple_syrup.jpg', desc: 'Tropical, juicy and naturally vibrant, with bright pineapple sweetness and a refreshing fruity finish. Made for creating irresistible island-inspired drinks.', ingredients: 'Sugar, Water, Permitted Pineapple Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Dark rum, coconut cream, spicy mezcal, and tropical punches.', recipe: { name: 'Pineapple Mai Tai', ingredients: ['Dark Rum — 30 ml', 'White Rum — 30 ml', 'Pineapple Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and pour over crushed ice.', garnish: 'Pineapple leaf and lime.' } },
  { id: 'cherry', name: 'Cherry Syrup', category: 'Fruit & Berry', index: '11', image: 'cherry_syrup.jpg', desc: 'Deep, luscious cherry flavour with rich fruitiness and a smooth sweet-tart finish. A sophisticated syrup that adds depth and colour to classic cocktails.', ingredients: 'Sugar, Water, Permitted Cherry Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Bourbon, cola highballs, craft sodas, and dark spirit sours.', recipe: { name: 'Cherry Manhattan', ingredients: ['Bourbon or Rye Whiskey — 50 ml', 'Cherry Syrup — 10 ml', 'Sweet Vermouth — 20 ml', 'Angostura Bitters — 2 dashes'], method: 'Stir with ice and strain into a chilled coupe.', garnish: 'Cherry.' } },
  { id: 'blue-curacao', name: 'Blue Curaçao Syrup', category: 'Classic Cocktail', index: '12', image: 'blue_curacao_syrup.jpg', desc: 'Bright citrus flavour with refreshing orange notes and an eye-catching blue hue. Designed to turn classic cocktails into vibrant, memorable serves.', ingredients: 'Sugar, Water, Permitted Blue Curaçao Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Blue Hawaiians, tropical lemonades, gin tonics, and layered mocktails.', recipe: { name: 'Blue Curaçao Sour', ingredients: ['Vodka — 45 ml', 'Blue Curaçao Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml'], method: 'Shake with ice and strain over fresh ice.', garnish: 'Orange peel.' } },
  { id: 'pandan', name: 'Pandan Syrup', category: 'Herbal & Botanical', index: '13', image: 'pandan_syrup.jpg', desc: 'Delicately aromatic with distinctive pandan notes and a soft, sweet finish. An exotic Asian-inspired syrup that brings elegance and uniqueness to every drink.', ingredients: 'Sugar, Water, Permitted Pandan Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Aged rum, cold brew coffee, coconut water highballs, and milk teas.', recipe: { name: 'Pandan Mojito', ingredients: ['White Rum — 50 ml', 'Pandan Syrup — 20 ml', 'Fresh Lime Juice — 20 ml', 'Fresh Mint — 8–10 leaves', 'Soda — 60 ml'], method: 'Gently muddle mint and lime. Add rum and syrup. Fill with crushed ice and top with soda.', garnish: 'Mint sprig and lime.' } },
  { id: 'grenadine', name: 'Grenadine Syrup', category: 'Classic Cocktail', index: '14', image: 'grenadine_syrup.jpg', desc: 'Lush, fruity and beautifully vibrant, with a sweet-tart character that adds colour and balance. A timeless cocktail essential for creating stunning layered drinks.', ingredients: 'Sugar, Water, Permitted Grenadine Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Shirley Temples, Tequila Sunrises, Bacardi cocktails, and craft sodas.', recipe: { name: 'Jack Rose', ingredients: ['Apple Brandy — 50 ml', 'Grenadine Syrup — 15 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and strain into a chilled coupe.', garnish: 'Lime twist.' } },
  { id: 'litchi', name: 'Litchi Syrup', category: 'Fruit & Berry', index: '15', image: 'litchi_syrup.jpg', desc: 'Delicate, floral and irresistibly juicy, inspired by the exotic sweetness of ripe litchi. Perfect for elegant, refreshing cocktails with a tropical touch.', ingredients: 'Sugar, Water, Permitted Litchi Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Vodka martinis, prosecco sparklers, green tea coolers, and floral gin floats.', recipe: { name: 'Litchi Martini', ingredients: ['Vodka — 50 ml', 'Litchi Syrup — 20 ml', 'Fresh Lemon Juice — 10 ml'], method: 'Shake with ice and fine strain into a chilled martini glass.', garnish: 'Litchi.' } },
  { id: 'irish-cream', name: 'Irish Cream Syrup', category: 'Creamy & Dessert', index: '16', image: 'irish_cream_syrup.jpg', desc: 'Smooth and indulgent with creamy vanilla, caramel and subtle coffee-inspired notes. A luxurious syrup that transforms coffee and cocktails into rich, comforting creations.', ingredients: 'Sugar, Water, Permitted Irish Cream Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Espresso martinis, cold brews, dessert cocktails, and steamed lattes.', recipe: { name: 'Irish Cream White Russian', ingredients: ['Vodka — 40 ml', 'Irish Cream Syrup — 20 ml', 'Coffee Liqueur — 15 ml', 'Fresh Cream — 30 ml'], method: 'Build over ice and stir gently. Float fresh cream on top.', garnish: 'Coffee beans.' } },
  { id: 'watermelon', name: 'Watermelon Syrup', category: 'Fruit & Berry', index: '17', image: 'watermelon_syrup.jpg', desc: 'Fresh, juicy and delightfully sweet, capturing the refreshing character of ripe watermelon. Perfect for vibrant summer cocktails and refreshing serves.', ingredients: 'Sugar, Water, Permitted Watermelon Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Blanco tequila, mint coolers, vodka seltzers, and lemonade.', recipe: { name: 'Watermelon Daiquiri', ingredients: ['White Rum — 50 ml', 'Watermelon Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and strain into a chilled coupe.', garnish: 'Watermelon slice.' } },
  { id: 'peach', name: 'Peach Syrup', category: 'Fruit & Berry', index: '18', image: 'peach_syrup.jpg', desc: 'Soft, fragrant and beautifully fruity, with the luscious sweetness of ripe peaches. A refined syrup for elegant, refreshing cocktails and sparkling serves.', ingredients: 'Sugar, Water, Permitted Peach Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Bourbon, iced black tea, sparkling wine, and peach bellinis.', recipe: { name: 'Peach Bellini', ingredients: ['Peach Syrup — 20 ml', 'Prosecco — 90 ml'], method: 'Add peach syrup to a chilled flute and slowly top with Prosecco. Stir gently.', garnish: 'Peach slice.' } },
  { id: 'cinnamon', name: 'Cinnamon Syrup', category: 'Spiced', index: '19', image: 'cinnamon_syrup.jpg', desc: 'Warm, aromatic and gently spiced, with rich cinnamon character and a smooth sweet finish. Adds comforting depth and sophistication to cocktails and hot beverages.', ingredients: 'Sugar, Water, Permitted Cinnamon Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Aged rum, Tiki punches, hot toddies, and craft lattes.', recipe: { name: 'Cinnamon Whiskey Sour', ingredients: ['Bourbon — 50 ml', 'Cinnamon Syrup — 15 ml', 'Fresh Lemon Juice — 25 ml', 'Egg White — 15 ml (optional)'], method: 'Dry shake if using egg white. Add ice and shake again. Fine strain over fresh ice.', garnish: 'Cinnamon stick and lemon peel.' } },
  { id: 'green-melon', name: 'Green Melon Syrup', category: 'Melon', index: '20', image: 'green_melon_syrup.jpg', desc: 'Sweet, juicy and refreshingly fruity, with delicate melon notes and a vibrant character. A playful syrup for colourful, tropical-inspired cocktails.', ingredients: 'Sugar, Water, Permitted Melon Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Japanese whiskey, melon sour, coconut water, and tropical highballs.', recipe: { name: 'Green Melon Sour', ingredients: ['Vodka — 45 ml', 'Green Melon Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake with ice and strain over fresh ice.', garnish: 'Melon slice.' } },
  { id: 'coconut', name: 'Coconut Syrup', category: 'Tropical', index: '21', image: 'coconut_syrup.jpg', desc: 'Creamy, tropical and beautifully aromatic, with smooth coconut notes and a luscious finish. Perfect for bringing an instant island-inspired indulgence to every drink.', ingredients: 'Sugar, Water, Permitted Coconut Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'White rum, pineapple juice, iced matcha, and tropical coolers.', recipe: { name: 'Coconut Colada', ingredients: ['White Rum — 50 ml', 'Coconut Syrup — 20 ml', 'Pineapple Juice — 80 ml', 'Fresh Lime Juice — 10 ml'], method: 'Shake with ice and pour over crushed ice, or blend for a frozen serve.', garnish: 'Pineapple leaf and coconut.' } },
  { id: 'lavender', name: 'Lavender Syrup', category: 'Herbal & Botanical', index: '22', image: 'lavender_syrup.jpg', desc: 'Delicately floral with a soft, aromatic sweetness and an elegant finish. A sophisticated touch for refreshing cocktails, mocktails, teas, and crafted beverages.', ingredients: 'Sugar, Water, Permitted Lavender Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Dry gin, sparkling wine, lemonade, Earl Grey iced teas, and botanical sours.', recipe: { name: 'Lavender Gin Fizz', ingredients: ['Gin — 45 ml', 'Lavender Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 60 ml'], method: 'Shake gin, syrup and lemon with ice. Strain into an ice-filled Collins glass and top with soda.', garnish: 'Lavender sprig or lemon wheel.' } },
  { id: 'elderflower', name: 'Elderflower Syrup', category: 'Herbal & Botanical', index: '23', image: 'elderflower_syrup.jpg', desc: 'Light, floral and beautifully fragrant, with a subtle fruity sweetness. Adds a refined botanical character to sparkling drinks, cocktails, mocktails, and summer serves.', ingredients: 'Sugar, Water, Permitted Elderflower Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Prosecco, gin tonics, cucumber spritzes, and sparkling mineral water.', recipe: { name: 'Elderflower Hugo Spritz', ingredients: ['Prosecco — 90 ml', 'Elderflower Syrup — 20 ml', 'Soda — 30 ml', 'Fresh Mint — 6 leaves'], method: 'Build syrup and muddled mint over ice in a wine glass. Top with Prosecco and soda, stir gently.', garnish: 'Mint sprig and lime wheel.' } },
  { id: 'rose', name: 'Rose Syrup', category: 'Herbal & Botanical', index: '24', image: 'rose_syrup.jpg', desc: 'Romantically floral with a delicate rose aroma and luscious sweetness. Perfect for creating elegant beverages with a distinctive floral signature and luxurious appeal.', ingredients: 'Sugar, Water, Permitted Rose Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Gin, white rum, iced milk teas, sparkling lemonades, and floral spritzes.', recipe: { name: 'Rose Petal Gimlet', ingredients: ['Gin — 50 ml', 'Rose Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'], method: 'Shake hard with ice and fine strain into a chilled coupe.', garnish: 'Dried rose petals.' } },
  { id: 'jackfruit', name: 'Jackfruit Syrup', category: 'Fruit & Berry', index: '25', image: 'jackfruit_syrup.jpg', desc: 'Rich, tropical and irresistibly fruity, capturing the distinctive sweetness of ripe jackfruit. A bold tropical addition to cocktails, mocktails, shakes, and desserts.', ingredients: 'Sugar, Water, Permitted Jackfruit Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Aged rum, spiced tequila, tropical punches, and coconut water highballs.', recipe: { name: 'Jackfruit Rum Punch', ingredients: ['Dark Rum — 45 ml', 'Jackfruit Syrup — 20 ml', 'Fresh Lime Juice — 15 ml', 'Pineapple Juice — 40 ml'], method: 'Shake with ice and strain over crushed ice in a Tiki glass.', garnish: 'Pineapple leaf and lime wheel.' } },
  { id: 'fig', name: 'Fig Syrup', category: 'Fruit & Berry', index: '26', image: 'fig_syrup.jpg', desc: 'Lusciously sweet with deep fruity notes and a smooth, sophisticated finish. Brings a rich gourmet character to cocktails, coffee creations, desserts, and specialty drinks.', ingredients: 'Sugar, Water, Permitted Fig Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Bourbon, rye whiskey, aged rum, dark spirit sours, and artisanal sodas.', recipe: { name: 'Fig & Walnut Old Fashioned', ingredients: ['Bourbon — 60 ml', 'Fig Syrup — 15 ml', 'Aromatic Bitters — 2 dashes'], method: 'Stir with ice and strain over a large ice cube.', garnish: 'Fresh fig slice or orange twist.' } },
  { id: 'mojito-mint', name: 'Mojito Mint Syrup', category: 'Herbal & Botanical', index: '27', image: 'mojito_mint_syrup.jpg', desc: 'Cool, crisp and refreshingly minty, with a bright aromatic finish. Crafted to bring an instant burst of freshness to mojitos, coolers, mocktails, and summer beverages.', ingredients: 'Sugar, Water, Permitted Mojito Mint Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'White rum, blanco tequila, sparkling sodas, iced teas, and green mocktails.', recipe: { name: 'Craft Mint Mojito', ingredients: ['White Rum — 50 ml', 'Mojito Mint Syrup — 20 ml', 'Fresh Lime Juice — 20 ml', 'Soda — 60 ml'], method: 'Build rum, syrup and lime juice over ice. Top with soda and stir gently.', garnish: 'Fresh mint sprig and lime wedge.' } },
  { id: 'vanilla', name: 'Vanilla Syrup', category: 'Creamy & Dessert', index: '28', image: 'vanilla_syrup.jpg', desc: 'Smooth, creamy and beautifully aromatic, with the comforting sweetness of vanilla. A versatile classic that elevates coffee, milkshakes, cocktails, desserts, and specialty beverages.', ingredients: 'Sugar, Water, Permitted Vanilla Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Espresso, cold brew, dark rum, bourbon sours, and steamed lattes.', recipe: { name: 'Vanilla Espresso Martini', ingredients: ['Vodka — 40 ml', 'Vanilla Syrup — 15 ml', 'Fresh Espresso — 30 ml', 'Coffee Liqueur — 15 ml'], method: 'Shake hard with ice and fine strain into a chilled martini glass.', garnish: 'Three coffee beans.' } },
  { id: 'passion-fruit', name: 'Passion Fruit Syrup', category: 'Fruit & Berry', index: '29', image: 'passion_fruit_syrup.jpg', desc: 'Bold, tropical and irresistibly tangy, bursting with vibrant passion fruit character. Adds a lively sweet-tart twist to cocktails, mocktails, coolers, and tropical creations.', ingredients: 'Sugar, Water, Permitted Passion Fruit Flavouring Substances, Acidity Regulator (Citric Acid), Preservative.', pairing: 'Vodka, white rum, prosecco floats, Tiki cocktails, and tropical lemonades.', recipe: { name: 'Pornstar Passion Martini', ingredients: ['Vodka — 45 ml', 'Passion Fruit Syrup — 20 ml', 'Fresh Lime Juice — 15 ml', 'Prosecco Shot — 30 ml (side)'], method: 'Shake vodka, syrup and lime juice with ice. Strain into a chilled coupe and serve with a Prosecco shot on the side.', garnish: 'Half a passion fruit.' } }
];

async function generatePDF() {
  const publicDir = path.resolve(__dirname, '../artifacts/flamingo-syrups/public');
  const catalogueDir = path.join(publicDir, 'catalogue');
  if (!fs.existsSync(catalogueDir)) {
    fs.mkdirSync(catalogueDir, { recursive: true });
  }

  const pdfPath = path.join(catalogueDir, 'flamingo-product-catalogue.pdf');
  const rootPdfPath = path.join(publicDir, 'flamingo-product-catalogue.pdf');

  // Generate QR code data URL
  const qrDataUrl = await QRCode.toDataURL(brand.whatsappUrl, { margin: 1, width: 240, color: { dark: '#321e2a', light: '#ffffff' } });
  const qrBuffer = Buffer.from(qrDataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');

  const doc = new PDFDocument({ size: 'A4', margin: 40, autoFirstPage: false });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  // Helper colors
  const darkBg = '#321e2a';
  const rosePrimary = '#d84f78';
  const textDark = '#321e2a';
  const textMuted = '#684454';
  const lightBg = '#fff3f8';

  // ----------------------------------------------------
  // PAGE 1: COVER PAGE
  // ----------------------------------------------------
  doc.addPage({ size: 'A4', margin: 0 });
  doc.rect(0, 0, 595.28, 841.89).fill(darkBg);

  // Decorative border box
  doc.rect(25, 25, 545.28, 791.89).strokeColor('#6b4353').lineWidth(1.5).stroke();

  doc.fillColor('#eaa0b7').fontSize(11).font('Helvetica-Bold').text('FLAMINGO · BENGALURU', 0, 160, { align: 'center', characterSpacing: 2 });
  doc.fillColor('#fff3f8').fontSize(42).font('Times-Bold').text('29 EXCEPTIONAL SYRUPS', 0, 200, { align: 'center', characterSpacing: 1 });
  doc.fillColor('#eaa0b7').fontSize(22).font('Times-Italic').text('29 Flavours. Endless Possibilities.', 0, 260, { align: 'center' });

  // Embedded logo on cover if available
  const logoPath = path.resolve(assetsDir, '2.jpg_1787233517766.jpeg');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 595.28 / 2 - 80, 320, { width: 160 });
  }

  doc.fillColor('#e6bfce').fontSize(11).font('Helvetica').text('PROFESSIONAL MIXOLOGY & CRAFT BEVERAGE CATALOGUE', 0, 720, { align: 'center', characterSpacing: 1 });
  doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text('750 ML PROFESSIONAL PACK RANGE', 0, 740, { align: 'center', characterSpacing: 1.5 });

  // ----------------------------------------------------
  // PAGE 2: THE FLAMINGO STORY
  // ----------------------------------------------------
  doc.addPage({ size: 'A4', margin: 40 });
  doc.rect(0, 0, 595.28, 841.89).fill('#ffeaf3');

  doc.fillColor(rosePrimary).fontSize(11).font('Helvetica-Bold').text('THE CRAFT & HERITAGE', 40, 50, { characterSpacing: 2 });
  doc.fillColor(textDark).fontSize(32).font('Times-Bold').text('THE FLAMINGO STORY', 40, 70);

  doc.moveTo(40, 115).lineTo(555, 115).strokeColor(rosePrimary).lineWidth(2).stroke();

  doc.fillColor(textDark).fontSize(14).font('Helvetica-Bold').text('A Little Colour for the Bar.', 40, 140);
  doc.fillColor(textMuted).fontSize(11).font('Helvetica').lineGap(6).text(
    'Crafted in Bengaluru by Master Mixologist Manoj Alphones, Flamingo represents a dedicated line of 29 exceptional syrup flavours engineered specifically for high-volume hospitality, luxury hotels, craft cocktail bars, and specialty beverage menus.\n\nEvery bottle is formulated to deliver optimal sweet-to-acid balance, bold natural flavour clarity, vibrant visual character, and high-concentration yield for consistent, cost-effective bar execution.',
    40, 170, { width: 515 }
  );

  // Key pillars box
  doc.rect(40, 310, 515, 230).fillAndStroke('#ffffff', '#f1c2d3');
  doc.fillColor(darkBg).fontSize(14).font('Helvetica-Bold').text('WHY BEVERAGE PROFESSIONALS CHOOSE FLAMINGO', 60, 330);

  const pillars = [
    { title: '1. 29 Versatile Flavours', desc: 'From regional fruits like Jamun and Guava Chilli to international classics like Elderflower and Passion Fruit.' },
    { title: '2. Precision Mixology Balance', desc: 'Formulated to integrate seamlessly into spirit-forward cocktails, highballs, spritzes, and alcohol-free mocktails.' },
    { title: '3. 750 ml Professional Packs', desc: 'Standardized bottle volume with easy speed-pour fit designed for high-efficiency bar operation.' },
    { title: '4. High Concentration & Yield', desc: 'Delivers full flavour impact with standard 15–20 ml pours per serve.' }
  ];

  let pillarY = 365;
  pillars.forEach(p => {
    doc.fillColor(rosePrimary).fontSize(10).font('Helvetica-Bold').text(p.title, 60, pillarY);
    doc.fillColor(textMuted).fontSize(9.5).font('Helvetica').text(p.desc, 60, pillarY + 14, { width: 475 });
    pillarY += 40;
  });

  // Footer tag
  doc.fillColor(textMuted).fontSize(9).font('Helvetica-Bold').text('FLAMINGO · BENGALURU  |  PAGE 2', 40, 800);

  // ----------------------------------------------------
  // PAGE 3: CATALOGUE COLLECTION OVERVIEW (TABLE OF CONTENTS)
  // ----------------------------------------------------
  doc.addPage({ size: 'A4', margin: 40 });
  doc.rect(0, 0, 595.28, 841.89).fill('#ffeaf3');

  doc.fillColor(rosePrimary).fontSize(11).font('Helvetica-Bold').text('COMPLETE CATALOGUE', 40, 50, { characterSpacing: 2 });
  doc.fillColor(textDark).fontSize(32).font('Times-Bold').text('29 FLAVOUR COLLECTION', 40, 70);
  doc.moveTo(40, 115).lineTo(555, 115).strokeColor(rosePrimary).lineWidth(2).stroke();

  // Grid layout for 29 syrups overview
  let colX = 40;
  let rowY = 140;
  syrups.forEach((syrup, idx) => {
    colX = idx % 2 === 0 ? 40 : 300;
    if (idx > 0 && idx % 2 === 0) rowY += 42;

    doc.rect(colX, rowY, 255, 36).fillAndStroke('#ffffff', '#fbd6e4');
    doc.fillColor(rosePrimary).fontSize(10).font('Helvetica-Bold').text(syrup.index, colX + 10, rowY + 12);
    doc.fillColor(textDark).fontSize(10).font('Helvetica-Bold').text(syrup.name, colX + 34, rowY + 7);
    doc.fillColor(textMuted).fontSize(8.5).font('Helvetica').text(syrup.category, colX + 34, rowY + 20);
  });

  doc.fillColor(textMuted).fontSize(9).font('Helvetica-Bold').text('FLAMINGO · BENGALURU  |  PAGE 3', 40, 800);

  // ----------------------------------------------------
  // PRODUCT PAGES: 2 SYRUPS PER PAGE
  // ----------------------------------------------------
  let pageNum = 4;
  for (let i = 0; i < syrups.length; i += 2) {
    const p1 = syrups[i];
    const p2 = syrups[i + 1];

    doc.addPage({ size: 'A4', margin: 40 });
    doc.rect(0, 0, 595.28, 841.89).fill('#fff9fb');

    // Render Product 1 (Top Block)
    renderProductBlock(doc, p1, 40);

    // Divider line
    if (p2) {
      doc.moveTo(40, 415).lineTo(555, 415).strokeColor('#fbd6e4').lineWidth(1.5).stroke();
      // Render Product 2 (Bottom Block)
      renderProductBlock(doc, p2, 430);
    }

    doc.fillColor(textMuted).fontSize(9).font('Helvetica-Bold').text(`FLAMINGO · BENGALURU  |  PAGE ${pageNum}`, 40, 800);
    pageNum++;
  }

  // ----------------------------------------------------
  // FINAL PAGE: LET'S TALK & WHATSAPP QR CODE
  // ----------------------------------------------------
  doc.addPage({ size: 'A4', margin: 40 });
  doc.rect(0, 0, 595.28, 841.89).fill(darkBg);
  doc.rect(25, 25, 545.28, 791.89).strokeColor('#6b4353').lineWidth(1.5).stroke();

  doc.fillColor('#eaa0b7').fontSize(11).font('Helvetica-Bold').text('GET IN TOUCH', 0, 80, { align: 'center', characterSpacing: 2 });
  doc.fillColor('#fff3f8').fontSize(40).font('Times-Bold').text("LET'S TALK", 0, 105, { align: 'center' });
  doc.fillColor('#e6bfce').fontSize(12).font('Helvetica').text('Ready to elevate your beverage program with Flamingo?', 0, 155, { align: 'center' });

  // Contact details box
  doc.rect(60, 200, 475, 220).fillAndStroke('#3d2534', '#6b4353');
  doc.fillColor('#eaa0b7').fontSize(10).font('Helvetica-Bold').text('BUSINESS & TRADE ENQUIRIES', 85, 225, { characterSpacing: 1.5 });

  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('Master Mixologist & Brand Creator:', 85, 255);
  doc.fillColor('#e6bfce').fontSize(12).font('Helvetica').text(brand.creator, 85, 272);

  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('Direct Phone:', 85, 302);
  doc.fillColor('#e6bfce').fontSize(12).font('Helvetica').text(brand.phone, 85, 319);

  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('Email:', 85, 349);
  doc.fillColor('#e6bfce').fontSize(12).font('Helvetica').text(brand.email, 85, 366);

  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('HQ Address:', 310, 255);
  doc.fillColor('#e6bfce').fontSize(11).font('Helvetica').text(brand.address, 310, 272, { width: 210 });

  // QR Code Box
  doc.rect(177.64, 450, 240, 270).fillAndStroke('#ffffff', '#eaa0b7');
  doc.image(qrBuffer, 222.64, 470, { width: 150, height: 150 });

  doc.fillColor(darkBg).fontSize(11).font('Helvetica-Bold').text('SCAN TO ENQUIRE ON WHATSAPP', 177.64, 635, { width: 240, align: 'center', characterSpacing: 1 });
  doc.fillColor(rosePrimary).fontSize(9.5).font('Helvetica').text('+91 8971825137 · Instant Bar Consultation', 177.64, 655, { width: 240, align: 'center' });

  doc.fillColor('#eaa0b7').fontSize(9).font('Helvetica-Bold').text('FLAMINGO · BENGALURU  |  END OF CATALOGUE', 0, 800, { align: 'center' });

  doc.end();

  await new Promise((res) => stream.on('finish', res));

  // Copy file to root public directory for github pages compatibility
  fs.copyFileSync(pdfPath, rootPdfPath);
  console.log('Successfully generated catalogue PDF at:', pdfPath);
  console.log('Successfully copied catalogue PDF to:', rootPdfPath);
}

function renderProductBlock(doc, p, startY) {
  const rosePrimary = '#d84f78';
  const textDark = '#321e2a';
  const textMuted = '#684454';

  // Product Image
  const imgFile = path.resolve(assetsDir, p.image);
  if (fs.existsSync(imgFile)) {
    try {
      doc.image(imgFile, 40, startY, { fit: [110, 340], align: 'center', valig: 'center' });
    } catch (e) {
      doc.rect(40, startY + 20, 110, 300).fillAndStroke('#fbd6e4', '#d84f78');
      doc.fillColor(rosePrimary).fontSize(10).font('Helvetica-Bold').text(p.name, 45, startY + 150, { width: 100, align: 'center' });
    }
  } else {
    doc.rect(40, startY + 20, 110, 300).fillAndStroke('#fbd6e4', '#d84f78');
    doc.fillColor(rosePrimary).fontSize(10).font('Helvetica-Bold').text(p.name, 45, startY + 150, { width: 100, align: 'center' });
  }

  // Right Details Column
  const rightX = 165;
  let currY = startY;

  // Header tag & name
  doc.fillColor(rosePrimary).fontSize(9).font('Helvetica-Bold').text(`${p.index}  |  ${p.category.toUpperCase()}  |  750 ML PROFESSIONAL PACK`, rightX, currY, { characterSpacing: 1 });
  currY += 14;

  doc.fillColor(textDark).fontSize(20).font('Times-Bold').text(p.name, rightX, currY);
  currY += 26;

  // Description
  doc.fillColor(textMuted).fontSize(9.5).font('Helvetica').lineGap(3).text(p.desc, rightX, currY, { width: 390 });
  currY += 46;

  // Pairing / Flavour Profile
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica-Bold').text('FLAVOUR PROFILE & PAIRINGS:', rightX, currY);
  currY += 13;
  doc.fillColor(textMuted).fontSize(9).font('Helvetica').text(p.pairing, rightX, currY, { width: 390 });
  currY += 24;

  // Ingredients
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica-Bold').text('INGREDIENTS:', rightX, currY);
  currY += 13;
  doc.fillColor(textMuted).fontSize(9).font('Helvetica').text(p.ingredients, rightX, currY, { width: 390 });
  currY += 24;

  // Signature Recipe Box
  doc.rect(rightX, currY, 390, 115).fillAndStroke('#ffffff', '#fbd6e4');
  doc.fillColor(rosePrimary).fontSize(9).font('Helvetica-Bold').text(`SIGNATURE RECIPE: ${p.recipe.name.toUpperCase()}`, rightX + 10, currY + 8);

  doc.fillColor(textDark).fontSize(8.5).font('Helvetica-Bold').text('Ingredients: ', rightX + 10, currY + 24);
  doc.fillColor(textMuted).fontSize(8.5).font('Helvetica').text(p.recipe.ingredients.join(', '), rightX + 68, currY + 24, { width: 310 });

  doc.fillColor(textDark).fontSize(8.5).font('Helvetica-Bold').text('Method: ', rightX + 10, currY + 44);
  doc.fillColor(textMuted).fontSize(8.5).font('Helvetica').text(p.recipe.method, rightX + 50, currY + 44, { width: 325 });

  doc.fillColor(textDark).fontSize(8.5).font('Helvetica-Bold').text('Garnish: ', rightX + 10, currY + 68);
  doc.fillColor(textMuted).fontSize(8.5).font('Helvetica').text(p.recipe.garnish, rightX + 54, currY + 68, { width: 320 });

  doc.fillColor(rosePrimary).fontSize(8).font('Helvetica-Bold').text('Applications: Cocktails · Mocktails · Spritzes · Cold Brews · Craft Beverages', rightX + 10, currY + 95);
}

generatePDF().catch(console.error);
