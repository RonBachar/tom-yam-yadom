export const INGREDIENT_IMAGE_ALT = {
  menthol: "Menthol crystals scattered on a dark surface",
  cloves: "Dried cloves arranged in a small pile",
  "aromatic-curcuma": "Aromatic curcuma roots with warm golden tones",
  cardamom: "Green cardamom pods with textured shells",
  camphor: "Camphor crystals with a clean, translucent look",
  borneol: "Borneol crystals with a frosty, mineral texture",
  "lotus-root": "Sliced lotus root showing its delicate pattern",
  "peppermint-oil": "Peppermint leaves and oil droplets on a dark background",
  "wasabi-extract": "Wasabi root and paste with vivid green color",
  "kaffir-lime-skin": "Kaffir lime peel with a bumpy green texture",
  "tangerine-zest": "Bright tangerine zest curled into fine ribbons",
  "orange-blossom": "Orange blossoms in soft white petals",
  cinnamon: "Cinnamon bark sticks with rich reddish-brown tones",
  "cinnamon-oil": "Cinnamon Oil ingredient used in Tom Yam Yadom herbal inhalers",
  "pink-peppercorn": "Pink peppercorns with rosy, speckled color",
  "white-peppercorn": "White peppercorns with a pale, earthy texture",
  "thai-ginger": "Thai ginger (galangal) sliced to reveal pale interiors",
  "rose-hips": "Rose hips with deep red-orange skins",
  jasmine: "Jasmine flowers with delicate white petals",
  "thai-royal-basil": "Thai basil leaves with deep green and purple stems",
  "fuji-pear-tea": "Sliced pear with a light, crisp tea-like mood",
};

const SAMUNPRAI_BASE = [
  "menthol",
  "cloves",
  "aromatic-curcuma",
  "cardamom",
  "camphor",
  "borneol",
  "lotus-root",
];

export const INGREDIENT_CATEGORIES = [
  "Foundations",
  "Cooling Compounds",
  "Citrus & Bright Notes",
  "Spice Cabinet",
  "Roots & Rhizomes",
  "Botanicals",
  "Specialty Extracts",
];

export const INGREDIENTS = [
  {
    slug: "menthol",
    title: "Menthol: Aroma, History & Uses",
    categories: ["Foundations", "Cooling Compounds"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
      "crown-blend",
    ],
    aromaProfile:
      "Sharp, bright, and intensely cooling. Menthol delivers an immediate rush of cold clarity, clean and penetrating, with a freshness that opens the breath on contact.",
    historicalUses:
      "Menthol has been extracted from peppermint and related mint plants for centuries across Asia and Europe. In Japanese and Chinese traditional practice, menthol crystals were used in aromatic preparations and topical balms valued for their cooling character. In South and Southeast Asia, mint-derived compounds were common ingredients in inhalants, cooling oils, and preparations used by healers and travelers alike. In the Western world, menthol became a key ingredient in the apothecary trade from the 18th century onward, appearing in everything from breath preparations to aromatic salts. Culinarily, mint and menthol have flavored confectionery, tea, and digestifs across dozens of cultures for hundreds of years.",
    modernUses:
      "Today menthol is one of the most widely recognized aromatic compounds in the world. It appears in oral care products, confectionery, cooling balms, and aromatic inhalers. Its crisp, breath-opening character makes it a natural anchor ingredient in any blend designed for alertness and clarity.",
    image: "",
  },
  {
    slug: "cloves",
    title: "Cloves: Aroma, History & Uses",
    categories: ["Foundations", "Spice Cabinet"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
    ],
    aromaProfile:
      "Warm, intensely aromatic, and slightly sweet-spicy. Cloves have a depth and richness that grounds a blend, adding a rounded heat that lingers without sharpness.",
    historicalUses:
      "Cloves (Syzygium aromaticum) are native to the Maluku Islands of Indonesia and were among the most prized spices in the ancient and medieval spice trade, reaching China, India, the Arab world, and eventually Europe centuries before colonization. In traditional Ayurvedic and Chinese medicine, cloves were used in aromatic and warming preparations. They feature prominently in the incense and ritual traditions of South and Southeast Asia, where their warm, resinous smoke was considered purifying. Culinarily, cloves have been essential to spice blends, braises, mulled drinks, and sweets across South Asian, Middle Eastern, European, and Southeast Asian cooking for millennia.",
    modernUses:
      "Cloves remain a cornerstone of global cooking and aromatic craft. Clove essential oil is widely used in perfumery and artisanal aromatics for its warmth and staying power. In herbal inhalers, cloves add grounding depth and a sweet-spicy character that balances cooler, sharper notes.",
    image: "",
  },
  {
    slug: "aromatic-curcuma",
    title: "Aromatic Curcuma: Aroma, History & Uses",
    categories: ["Foundations", "Roots & Rhizomes"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
    ],
    aromaProfile:
      "Warm, earthy, and subtly radiant. Aromatic curcuma (distinct from culinary turmeric) carries a softer, more floral earthiness than its kitchen cousin, with a gentle warmth that opens slowly in a blend.",
    historicalUses:
      "Curcuma species have been cultivated across South and Southeast Asia for thousands of years. In Thailand, aromatic curcuma (Curcuma aromatica) holds a distinct place from culinary turmeric, used historically in ritual, cosmetic, and aromatic contexts rather than primarily as a food ingredient. It appears in traditional Thai herbal compress recipes (luk pra kob) and in aromatic preparations used during ceremonial occasions. In Indian tradition, curcuma species feature in both Ayurvedic practice and in ritual use, including as a component of ceremonial pastes and incense.",
    modernUses:
      "Aromatic curcuma is valued in natural perfumery and craft aromatics for its earthy warmth and its ability to add body and depth to a blend without dominating it. In Thai herbal traditions it remains a staple of handcrafted inhalants and compresses, linking it directly to the yadom lineage.",
    image: "",
  },
  {
    slug: "cardamom",
    title: "Cardamom: Aroma, History & Uses",
    categories: ["Foundations", "Spice Cabinet"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
    ],
    aromaProfile:
      "Bright, aromatic, and slightly sweet-spiced. Cardamom has a complex character that sits between spice and freshness, warm but with a clean, almost floral top note that lifts a blend.",
    historicalUses:
      "Cardamom (Elettaria cardamomum) is native to southern India and Sri Lanka and has been traded across the ancient world for over 4,000 years. It is one of the oldest known spices, appearing in Sanskrit texts and in records of the ancient spice routes connecting India to the Arab world and beyond. In Arabic coffee culture, cardamom is essential: qahwa, the traditional spiced coffee of the Gulf, is defined by it. In Scandinavia, cardamom found its way into baking centuries ago and remains a signature flavor in pastries and breads today. In Ayurvedic tradition, cardamom was used in aromatic preparations and considered a warming, digestive spice. Across South and Southeast Asia it appears in spice blends, ritual foods, and aromatic crafts.",
    modernUses:
      "Cardamom is a prized ingredient in specialty coffee, pastry, perfumery, and craft spirits. In natural aromatics it adds brightness and complexity, bridging spice and floral notes in a way few other ingredients can.",
    image: "",
  },
  {
    slug: "camphor",
    title: "Camphor: Aroma, History & Uses",
    categories: ["Foundations", "Cooling Compounds"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
      "crown-blend",
    ],
    aromaProfile:
      "Intensely cooling, sharp, and penetrating. Camphor has a powerful, medicinal clarity that cuts through almost anything around it, clean and resinous with a cool that borders on cold.",
    historicalUses:
      "Camphor has one of the longest documented histories of any aromatic substance in the world. Derived from the wood of Cinnamomum camphora, a tree native to East and Southeast Asia, camphor was traded along the ancient Silk Road and appears in Chinese, Sanskrit, Arabic, and medieval European texts. In Chinese and Japanese traditions it was burned as incense, used in ritual contexts, and employed as an aromatic preservative. In South and Southeast Asian medicine it featured in preparations valued for its strong aromatic character. In Europe, camphor became part of the apothecary tradition and appeared in smelling salts and aromatic vinegars from the medieval period onward. Its sharp, penetrating scent made it a natural choice wherever a powerful aromatic signal was needed.",
    modernUses:
      "Camphor remains a key aromatic in traditional preparations across Asia and is used in natural perfumery, ritual incense, and artisanal aromatics. In herbal inhalers it is one of the primary cooling and clarifying notes, often paired with menthol and borneol to build a deep, multi-layered clarity.",
    image: "",
  },
  {
    slug: "borneol",
    title: "Borneol: Aroma, History & Uses",
    categories: ["Foundations", "Cooling Compounds"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
    ],
    aromaProfile:
      "Soft, cooling, and resinous. Borneol is camphor-adjacent but rounder and more refined, with a cool clarity that feels cleaner and less sharp, and a subtle woody depth that grounds it.",
    historicalUses:
      "Borneol is one of the most prized aromatic substances in classical Asian medicine. Historically harvested from the resin of Dryobalanops aromatica, a tree native to Borneo and Sumatra, it formed fragrant pale crystals that were among the most valued trade goods in the ancient maritime routes of Southeast Asia. In classical Chinese medicine it is known as bing pian and was considered a precious ingredient, associated with clarifying the senses and awakening the mind. It appears in the oldest Chinese pharmacopoeias and was traded westward along the spice routes to the Arab world, where it was known and valued by medieval scholars. In Thai and Southeast Asian herbal traditions, borneol is a native ingredient with deep roots in aromatic preparations, inhalants, and compresses.",
    modernUses:
      "Genuine botanical borneol signals a premium, traditional approach to aromatic blending. It is used in high-quality natural perfumery and in traditional herbal preparations across Asia. In an inhaler blend, borneol contributes a cool, resinous clarity that layers beautifully with camphor and menthol without duplicating them, and it is precisely this quality that makes it the signature focus ingredient in our Clarity blend.",
    image: "",
  },
  {
    slug: "lotus-root",
    title: "Lotus Root: Aroma, History & Uses",
    categories: ["Foundations", "Roots & Rhizomes"],
    foundIn: [
      "compassion",
      "vitality",
      "radiance",
      "balance",
      "power",
      "clarity",
      "serenity",
    ],
    aromaProfile:
      "Soft, aqueous, and subtly earthy. Lotus root brings a quiet, clean, almost watery note to a blend, a gentle background presence that softens and opens the space around stronger aromatics.",
    historicalUses:
      "The lotus (Nelumbo nucifera) holds a central place in the cultural and spiritual traditions of Asia. Sacred in Hindu, Buddhist, and ancient Egyptian contexts, the lotus is one of the most symbolically loaded plants in human history, representing purity, awakening, and the emergence of beauty from muddy water. In Thailand, the lotus is woven into daily life: flowers are offered at temples, petals are folded into decorative forms, and the plant appears in both cuisine and ceremonial practice. Lotus root has been a culinary ingredient in Chinese, Japanese, Korean, and Southeast Asian cooking for centuries, valued for its texture and mild flavor. Aromatically, lotus has been used in perfumery and incense across the region for its clean, soft, aquatic character.",
    modernUses:
      "Lotus root extract appears in natural perfumery and in artisanal aromatics as a soft, grounding note. Its aqueous quality makes it a useful balancing ingredient in blends that need a quiet, centering presence beneath more assertive aromatics.",
    image: "",
  },
  {
    slug: "peppermint-oil",
    title: "Peppermint Oil: Aroma, History & Uses",
    categories: ["Cooling Compounds"],
    foundIn: ["power", "crown-blend"],
    aromaProfile:
      "Sharp, green, and intensely refreshing. Peppermint oil is brighter and more vegetal than menthol alone, with a fresh, almost grassy top note alongside its cool rush.",
    historicalUses:
      "Peppermint (Mentha piperita) is a hybrid of watermint and spearmint, cultivated in Europe since at least the 18th century, though mint species have been used aromatically and culinarily across the Mediterranean and Middle East for thousands of years. Ancient Egyptians, Greeks, and Romans used dried mint in cooking, medicine, and ritual. In European folk tradition, peppermint was a staple of the herbalist's cabinet, used in aromatic preparations and digestive tonics. Distillation of peppermint oil became commercially significant in England and America in the 18th and 19th centuries, and by the Victorian era peppermint oil was a widely traded aromatic commodity.",
    modernUses:
      "Peppermint oil is one of the most versatile and widely used essential oils in the world, appearing in confectionery, oral care, cosmetics, and aromatics. In inhaler blends it adds a bright, green freshness that complements and extends the cooling action of menthol and camphor.",
    image: "",
  },
  {
    slug: "kaffir-lime-skin",
    title: "Kaffir Lime Skin: Aroma, History & Uses",
    categories: ["Citrus & Bright Notes"],
    foundIn: ["radiance"],
    aromaProfile:
      "Sharp, vibrant, and intensely aromatic. Kaffir lime (Citrus hystrix) skin is one of the most distinctive citrus aromas in the world: bright and assertive, with a complexity and depth that sets it far apart from ordinary lime.",
    historicalUses:
      "Kaffir lime is native to tropical Southeast Asia and has been central to Thai, Indonesian, Cambodian, and Malay cuisine and culture for centuries. Its leaves and skin are among the most recognizable aromatics in Thai cooking, essential to tom kha, curries, and aromatic pastes. In traditional Thai and Southeast Asian practice, kaffir lime was also used in ritual contexts: lime water made with the fruit has long been used in purification and blessing ceremonies. The whole fruit, leaves, and skin appear across the region's traditional aromatic and cosmetic practices as well.",
    modernUses:
      "Kaffir lime zest and essential oil are prized in natural perfumery and craft aromatics for their vivid, complex citrus character. In a herbal inhaler blend, the skin adds a sharp, energizing brightness that lifts the entire composition.",
    image: "",
  },
  {
    slug: "tangerine-zest",
    title: "Tangerine Zest: Aroma, History & Uses",
    categories: ["Citrus & Bright Notes"],
    foundIn: ["radiance"],
    aromaProfile:
      "Soft citrus sweetness with a gentle fruit character. Tangerine zest is warmer and rounder than sharper citrus notes, approachable and bright without any edge.",
    historicalUses:
      "Tangerines and mandarin oranges have been cultivated in China for over 3,000 years and hold a prominent place in Chinese culture, especially as symbols of luck and abundance during Lunar New Year celebrations. The fruit spread westward along trade routes, reaching the Mediterranean, North Africa, and eventually Europe and the Americas. In Chinese and Southeast Asian culinary tradition, tangerine peel (both fresh and dried) has long been used as a flavoring in cooking, confectionery, and tea. Dried tangerine peel (chen pi) is also a valued ingredient in classical Chinese herbal cuisine.",
    modernUses:
      "Tangerine zest and oil appear in natural perfumery, cocktail crafting, pastry, and artisanal aromatics. In a blend, the zest adds a warm, approachable citrus sweetness that brightens without the sharp edge of lime or lemon.",
    image: "",
  },
  {
    slug: "orange-blossom",
    title: "Orange Blossom: Aroma, History & Uses",
    categories: ["Citrus & Bright Notes", "Botanicals"],
    foundIn: ["radiance"],
    aromaProfile:
      "Delicate, floral, and softly luminous. Orange blossom sits at the intersection of citrus and flower, sweet and light, with a warmth that feels both clean and intimate.",
    historicalUses:
      "Orange blossom (from Citrus sinensis or Citrus aurantium) has been prized in perfumery and ritual across the Middle East, North Africa, and the Mediterranean for centuries. In Moroccan and Levantine cooking, orange blossom water is a fundamental flavoring in pastries, sweets, and drinks. In European tradition, orange blossom became associated with weddings and purity, worn by brides and distilled into some of the first recognized perfumes of the modern era. Neroli, the essential oil distilled from bitter orange blossom, has been a cornerstone of fine perfumery since the 17th century. Across many cultures, the scent of orange blossom carries associations of celebration, warmth, and beauty.",
    modernUses:
      "Orange blossom water and neroli oil remain staples of Middle Eastern and Mediterranean cooking and of fine perfumery worldwide. In natural aromatics, orange blossom adds a delicate, luminous floral note that lifts and sweetens a blend without heaviness.",
    image: "",
  },
  {
    slug: "cinnamon",
    title: "Cinnamon: Aroma, History & Uses",
    categories: ["Spice Cabinet"],
    foundIn: [],
    aromaProfile:
      "Warm, sweet-spiced, and slightly woody. Cinnamon is one of the most immediately recognizable aromas in the world: comforting, round, and deeply familiar, with a lingering sweetness that grounds a blend.",
    historicalUses:
      "Cinnamon is among the oldest known spices in human history. True cinnamon (Cinnamomum verum) is native to Sri Lanka and was traded to Egypt, the Arab world, and China thousands of years ago. It appears in ancient Egyptian records, in the Hebrew Bible, in Greek and Roman texts, and in the earliest Sanskrit writings on spice. The Portuguese, Dutch, and British all fought for control of cinnamon trade routes, making it one of the most geopolitically significant spices of the early modern era. In Southeast Asian cooking, cassia (a close relative) is a foundational spice in dishes like pho, massaman curry, and char siu. Culinarily, cinnamon has shaped the flavor of baking, confectionery, and spiced drinks across virtually every culture that had access to it.",
    modernUses:
      "Cinnamon remains a universal culinary spice and a key ingredient in natural perfumery, where its warmth and sweetness add body and familiarity to a blend. In herbal inhalers, cinnamon contributes a comforting depth that rounds sharper cooling notes.",
    image: "",
  },
  {
    slug: "cinnamon-oil",
    title: "Cinnamon Oil: Aroma, History & Uses",
    categories: ["Spice Cabinet"],
    foundIn: ["power", "crown-blend"],
    aromaProfile: "Content coming soon.",
    historicalUses: "Content coming soon.",
    modernUses: "Content coming soon.",
    image: "/images/ingredients/cinnamon-oil.png",
  },
  {
    slug: "pink-peppercorn",
    title: "Pink Peppercorn: Aroma, History & Uses",
    categories: ["Spice Cabinet"],
    foundIn: ["compassion"],
    aromaProfile:
      "Bright, lightly spicy, and subtly fruity. Pink peppercorn is the most delicate of the pepper family, with a fresh, almost berry-like quality alongside its gentle heat.",
    historicalUses:
      "Pink peppercorns (Schinus molle or Schinus terebinthifolia) are native to South America, where they have been used since pre-Columbian times by indigenous peoples of the Andes as a spice and aromatic. They were introduced to European and global cooking more recently than black pepper, gaining wide culinary attention in the latter half of the 20th century, particularly in French nouvelle cuisine. In natural perfumery, pink peppercorn has become a prized top note ingredient for its unusual combination of spice and fruit.",
    modernUses:
      "Pink peppercorn appears in fine dining, craft spirits, chocolate making, and natural perfumery. In an aromatic blend it contributes a bright, lively opening that adds energy and a subtle fruity dimension.",
    image: "",
  },
  {
    slug: "white-peppercorn",
    title: "White Peppercorn: Aroma, History & Uses",
    categories: ["Spice Cabinet"],
    foundIn: ["serenity"],
    aromaProfile:
      "Sharp, dry, and subtly earthy. White peppercorn is cleaner and more austere than black pepper, with a dry, almost mineral quality and less of the fruity complexity of its unprocessed counterpart.",
    historicalUses:
      "White pepper is black pepper (Piper nigrum) with the outer skin removed, a process that changes its aromatic character significantly. Black pepper has been traded from South India since at least 3,000 years ago and was one of the most valuable commodities in the ancient and medieval spice trade. White pepper became particularly valued in European and Chinese cooking for its cleaner, sharper heat and for its visual neutrality in pale dishes. In Southeast Asian cuisine, white pepper is foundational: it is the pepper of choice in Thai, Vietnamese, and Chinese-influenced cooking across the region.",
    modernUses:
      "White pepper is a staple of professional kitchens globally, especially in French, Chinese, and Southeast Asian cooking. In natural perfumery and aromatics, white peppercorn adds a dry, clean spice note with an earthy depth that anchors brighter ingredients.",
    image: "",
  },
  {
    slug: "thai-ginger",
    title: "Thai Ginger: Aroma, History & Uses",
    categories: ["Roots & Rhizomes"],
    foundIn: ["vitality"],
    aromaProfile:
      "Bright, spicy, and warmly aromatic. Thai ginger (galangal, Alpinia galanga) is sharper and more resinous than common ginger, with a piney, almost medicinal quality alongside its heat.",
    historicalUses:
      "Galangal has been cultivated and traded in Southeast Asia for thousands of years, and it reached the Arab world and medieval Europe as a prized spice along the ancient trade routes. In medieval European cooking and in Arab medical texts, galangal was considered a luxury spice with warming properties. In Thailand and across Southeast Asia, galangal is a kitchen essential: it is one of the defining aromatics of tom kha gai and appears in curry pastes, spice blends, and aromatic preparations throughout the region. It also has a documented place in traditional Thai herbal practice, appearing in compresses, teas, and topical preparations.",
    modernUses:
      "Galangal is experiencing broader interest in global cooking and in craft aromatics. Its distinctive sharp, resinous, spicy character is difficult to replicate and makes it an immediately recognizable ingredient in any blend that includes it.",
    image: "",
  },
  {
    slug: "fuji-pear-tea",
    title: "Fuji Pear Tea: Aroma, History & Uses",
    categories: ["Specialty Extracts"],
    foundIn: ["vitality"],
    aromaProfile: "Content coming soon.",
    historicalUses: "Content coming soon.",
    modernUses: "Content coming soon.",
    image: "",
  },
  {
    slug: "wasabi-extract",
    title: "Wasabi Extract: Aroma, History & Uses",
    categories: ["Cooling Compounds", "Roots & Rhizomes"],
    foundIn: ["crown-blend"],
    aromaProfile:
      "Sharp, volatile, and intensely sinus-opening. Wasabi delivers one of the most immediate and striking aromatic experiences of any ingredient: a penetrating, nasal rush that clears everything in its path.",
    historicalUses:
      "True wasabi (Wasabia japonica) is native to Japan, where it has been cultivated since at least the 10th century. It was historically used as a condiment with raw fish, partly for its flavor and partly because its sharp aromatic compounds were believed to have food-safety properties. Wasabi cultivation was centered in mountain stream regions of Japan, particularly in Shizuoka prefecture, and true wasabi was a luxury ingredient reserved for special occasions and high-end dining. The characteristic nose-clearing sensation of wasabi is chemically distinct from chili heat: it is volatile and airborne, which is why it affects the sinuses rather than just the tongue.",
    modernUses:
      "True wasabi remains a prized and expensive ingredient in Japanese cuisine. Wasabi extract is used in specialty food products and, increasingly, in experimental aromatics where its sinus-opening intensity is valued as an extreme version of the clear head effect sought from inhalers.",
    image: "",
  },
  {
    slug: "peach-blossom",
    title: "Peach Blossom: Aroma, History & Uses",
    categories: ["Botanicals"],
    foundIn: ["compassion"],
    aromaProfile: "Content coming soon.",
    historicalUses: "Content coming soon.",
    modernUses: "Content coming soon.",
    image: "",
  },
  {
    slug: "rose-hips",
    title: "Rose Hips: Aroma, History & Uses",
    categories: ["Botanicals"],
    foundIn: ["compassion"],
    aromaProfile:
      "Soft tart fruit with muted floral warmth. Rose hips carry a gentle, slightly tangy fruitiness with a quiet floral background inherited from the rose, subtle and rounded rather than sharp.",
    historicalUses:
      "Rose hips are the fruit of the rose plant and have been used across Europe, the Middle East, and Asia for centuries. In Scandinavian and Eastern European tradition, rose hip soup and preserves are a long-standing culinary staple. Rose hips were used across the Arab world and in medieval European herbalism as a nutritious food and a source of tart, fruity flavor. During World War II, rose hip syrup was distributed in Britain as a source of vitamin C when citrus was scarce, making it one of the best-documented wartime food traditions in the country. Rose hips also appear in Turkish and Persian culinary traditions in jams, teas, and sweets.",
    modernUses:
      "Rose hips appear in specialty teas, jams, confectionery, natural skincare, and craft aromatics. In a blend, they contribute a soft, tart fruitiness that adds a subtle warmth and roundness distinct from the sharper character of citrus.",
    image: "",
  },
  {
    slug: "jasmine",
    title: "Jasmine: Aroma, History & Uses",
    categories: ["Botanicals"],
    foundIn: ["serenity"],
    aromaProfile:
      "Soft, floral, and luminous. Jasmine is one of the great floral aromatics: rich and sweet but not heavy, with an almost honeyed quality and a warmth that deepens on the exhale.",
    historicalUses:
      "Jasmine (Jasminum sambac and related species) has been cultivated for its scent across South Asia, Southeast Asia, the Middle East, and the Mediterranean for thousands of years. In Thailand, jasmine holds deep cultural significance: malai jasmine garlands are offered at temples, given as tokens of respect, and used in religious ceremonies throughout the country. Thai jasmine rice (Khao Hom Mali) takes its name from the flower's scent. In India, jasmine is woven into bridal garlands and is central to several regional perfumery traditions. In the Arab world and in Europe, jasmine has been a foundational fine fragrance ingredient since the earliest days of perfumery. Jasmine absolute is one of the most expensive natural aromatic materials in the world.",
    modernUses:
      "Jasmine is a cornerstone of fine perfumery globally and remains central to Thai and South Asian floral tradition. In an inhaler blend, jasmine adds a soft, warm, luminous floral note that brings elegance and depth to any composition it enters.",
    image: "",
  },
  {
    slug: "thai-royal-basil",
    title: "Thai Royal Basil: Aroma, History & Uses",
    categories: ["Botanicals"],
    foundIn: ["power"],
    aromaProfile:
      "Green, spicy, and slightly anise-like. Thai royal basil (horapa, Ocimum basilicum var. thyrsiflorum) is more assertive than Italian sweet basil, with a peppery edge and a clove-like warmth underneath its green freshness.",
    historicalUses:
      "Basil has been cultivated across Asia and the Mediterranean since antiquity. In South Asian tradition, holy basil (tulsi) is considered sacred in Hinduism and has been used in ritual and aromatic practice for thousands of years. In Thailand, several distinct basil varieties each hold their own culinary and cultural place: Thai royal basil (horapa) is the variety used in stir-fries, curries, and aromatic preparations, and it is one of the defining flavors of Thai cooking. Basil cultivation spread westward from Asia to the Middle East and then to Europe, where it became central to Mediterranean cooking and, eventually, to the fine herb tradition of French cuisine.",
    modernUses:
      "Thai royal basil is an essential ingredient in Thai cuisine and is gaining recognition in global cooking for its distinctive spicy, anise-inflected character. In natural perfumery and craft aromatics, basil's green, spicy complexity adds a fresh, herbal energy that contrasts cleanly with warmer or heavier notes.",
    image: "",
  },
];

const INGREDIENT_ALIASES = {
  menthol: "menthol",
  cloves: "cloves",
  "aromatic curcuma": "aromatic-curcuma",
  cardamom: "cardamom",
  camphor: "camphor",
  borneol: "borneol",
  "lotus root": "lotus-root",
  "peppermint oil": "peppermint-oil",
  "kaffir lime skin": "kaffir-lime-skin",
  "kaffir lime": "kaffir-lime-skin",
  "tangerine zest": "tangerine-zest",
  "orange blossom": "orange-blossom",
  "orange blossom tea": "orange-blossom",
  cinnamon: "cinnamon",
  "cinnamon oil": "cinnamon-oil",
  "peach blossom": "peach-blossom",
  "fuji pear": "fuji-pear-tea",
  "fuji pear tea": "fuji-pear-tea",
  "pink peppercorn": "pink-peppercorn",
  "white peppercorn": "white-peppercorn",
  "white pepper": "white-peppercorn",
  "thai ginger": "thai-ginger",
  ginger: "thai-ginger",
  galangal: "thai-ginger",
  "wasabi extract": "wasabi-extract",
  wasabi: "wasabi-extract",
  "rose hips": "rose-hips",
  jasmine: "jasmine",
  "jasmine pearls": "jasmine",
  "thai royal basil": "thai-royal-basil",
};

export function getIngredientName(title) {
  return title.replace(/: Aroma, History & Uses$/, "");
}

export function getIngredientImageAlt(slug, name) {
  return INGREDIENT_IMAGE_ALT[slug] ?? `${name} ingredient photograph`;
}

export function getIngredientBySlug(slug) {
  return INGREDIENTS.find((i) => i.slug === slug);
}

export function matchIngredientSlug(name) {
  const normalized = name.trim().toLowerCase();
  if (INGREDIENT_ALIASES[normalized]) {
    return INGREDIENT_ALIASES[normalized];
  }
  const byName = INGREDIENTS.find(
    (i) => getIngredientName(i.title).toLowerCase() === normalized
  );
  return byName ? byName.slug : null;
}

export function ingredientMetaDescription(ingredient) {
  const text = ingredient.aromaProfile;
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trim()}...`;
}

export function getIngredientsByCategory() {
  return INGREDIENT_CATEGORIES.map((category) => ({
    category,
    ingredients: INGREDIENTS.filter((i) => i.categories.includes(category)),
  })).filter((group) => group.ingredients.length > 0);
}
