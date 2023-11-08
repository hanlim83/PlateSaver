''' 
    0. Normal Recipe
    1. Long descriptions
    2. Swear words
    7. Whitespace trimming(validated)
    8. Whitespace trimming + Long descriptions (validated)
    9. very long list of ingredients
    10. very long list of directions
    11. Extremely long username in recipe post
    12. NoSQL injection???
    - If section not completed, should not show green?
    - Can progress to next tab without completing fields?
    - Missing fields validation (validated)
'''
#Recipedetails[ recipe1[recipename,preptime,cookingtime,description,servings,photo,ingredients[],directions[],calories,carbs,fat,protein,sodium,cholesterol]  ]

#IMAGE FILEPATH NEEDS TO BE CHANGED TO YOUR OWN'S
recipeValidations=[  
    ["Chicken Croquettes (normal recipe)","10min","15min","This recipe is easy to make and delicious!","2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/chickencroquettes.jpg",['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon vanilla', '4 cups milk'],
                    ['Preheat oven to 175 degrees C.', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal","200mg","5g","100mg","2g","50mg"],
                    
    ["Sushi (long description, 1 para)","10min","15min","The iconic dish known as 'Sushi' has a rich and fascinating background that dates back to ancient Japan. Sushi, which means 'vinegar-seasoned rice,' originated as a way to preserve fish in fermented rice. It began as a simple street food, with fish-packed rice wrapped in salted leaves or bamboo. Over the centuries, sushi evolved, incorporating various ingredients and techniques to become the beloved culinary art form we know today. In the early 19th century, Edo (now Tokyo) became a sushi hotspot, as vendors created Edomae sushi, a style that emphasizes fresh, local seafood. Sushi bars proliferated and grew in sophistication, with the introduction of ingredients like soy sauce, wasabi, and pickled ginger to enhance the dining experience. Today, sushi has become a global sensation, with a myriad of styles and variations to suit diverse palates, making it a delectable and culturally significant dish appreciated worldwide.",
                    "2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/sushi.jpg",['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon vanilla', '4 cups milk'],
                    ['Preheat oven to 175 degrees C.', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal","200mg","5g","100mg","2g","50mg"],
    
    ["Lasagna (super long description, 6 para)","10min","15min","""Lasagna is a classic Italian dish with a rich and storied culinary history that spans centuries. This mouthwatering creation, known for its layers of pasta, rich meat sauce, creamy béchamel, and melted cheese, has its origins in ancient Greece. The term 'lasagna' is believed to have been derived from the Greek word 'lasanon,' which referred to the flat dough used for cooking. However, it was in Italy, particularly in the region of Emilia-Romagna, where lasagna as we know it today truly took shape.
     In Italy, the first documented recipe for lasagna appeared in the 14th century in a cookbook known as the 'Liber de Coquina.' These early versions featured layers of pasta and cheese, but tomatoes, a quintessential lasagna ingredient, were not introduced until the late 18th century after their arrival in Europe from the New World. Over time, different regions in Italy put their own unique spin on lasagna, with variations that incorporated local ingredients and regional preferences. In the north, it was common to find lasagna with béchamel sauce, while the south often favored a hearty meat ragù.
     Lasagna's popularity eventually spread beyond Italy's borders, making its way to North America through Italian immigrants. It gained widespread recognition in the United States during the 20th century, thanks to the growth of Italian-American communities. Today, lasagna remains a beloved and versatile dish, with countless interpretations and adaptations found in kitchens worldwide, from traditional meat and cheese versions to vegetarian and even vegan alternatives. It continues to be a cherished comfort food and a testament to the enduring appeal of Italian cuisine.
     As lasagna evolved, it became synonymous with Italian home cooking, often prepared for special family gatherings and celebrations. Each household had its unique twist on the recipe, passed down through generations. The preparation of lasagna was a labor of love, as it required careful layering and an investment of time and effort. This familial aspect of lasagna contributed to its enduring popularity and its status as a symbol of Italian culinary heritage.
     The components of lasagna, from the pasta to the sauce, varied with the season and availability of ingredients. In the summer, fresh, ripe tomatoes were used to create a vibrant tomato sauce, while in the winter, canned or preserved tomatoes were utilized. The pasta was typically homemade, rolled out and cut by hand. These adaptations showcased the resourcefulness and adaptability of Italian cuisine, emphasizing the importance of using what was at hand.
     Today, lasagna has transcended its Italian origins to become a globally cherished dish, adored for its comforting and hearty layers. It is not only a culinary delight but a cultural icon, symbolizing the warm embrace of Italian hospitality. Lasagna's journey through history is a testament to the enduring appeal of simple yet exquisite dishes that have the power to bring people together, no matter where in the world they may be.""",
                    "2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/lasagna.jpg",['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon vanilla', '4 cups milk'],
                    ['Preheat oven to 175 degrees C.', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal","200mg","5g","100mg","2g","50mg"],

    ["Bitch, stupid and shit (swear words)","10min","15min","This recipe is easy to make and delicious!",
                    "2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/sushi.jpg",['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon vanilla', '4 cups milk'],
                    ['Preheat oven to 175 degrees C.', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal","200mg","5g","100mg","2g","50mg"],
    
    ["                             Burger (Unnecessary whitespace)","      10min       ","15min             ",
                    "           Hamburgers, with their roots in the 19th-century United States, were initially popularized by German immigrants who shaped ground meat into patties, a tradition that eventually evolved into the iconic American fast food staple.                     ",
                    "2 people              ","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/burger.jpg",['          2 cups flour sifted', '1/2 tablespoons butter, softened           ', '1 cup sugar           ', '1/2 teaspoon vanilla                 ', '4 cups milk              '],
                    ['Preheat oven to 175 degrees C.         ', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.           ', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal             ","200mg              ","             5g","           100mg","2g","50mg"],

    ["                             Pizza(Unnecessary whitespace + long description)","      10min       ","15min             ",
                    """           Pizza, one of the world's most beloved and iconic dishes, can trace its origins back to ancient civilizations. The concept of baking a flatbread with various toppings has been part of human culinary history for centuries, with evidence of such dishes dating as far back as ancient Egypt, Greece, and Rome. However, the modern pizza, as we know it today, has its roots in Naples, Italy.
                    In the 18th century, Naples was a bustling and densely populated city, and a type of simple, round flatbread was a common street food for the working class. These early pizzas were often topped with ingredients like garlic, lard, salt, and local cheese, making them a tasty and affordable option. They were cooked quickly in the extremely hot ovens of the local pizzerias.

                    The pizza Margherita, often credited as the first true pizza, was created in Naples in 1889. It was made to honor the Queen Margherita of Savoy and featured the now-classic combination of tomato, mozzarella cheese, and basil, representing the colors of the Italian flag. This pizza became a favorite of the queen and soon gained popularity, helping to establish pizza as a national dish in Italy.
                    In the late 19th century, Italian immigrants brought pizza to the United States, where it found its way into cities like New York and Chicago. Initially, pizza was primarily enjoyed by Italian communities, but it gradually gained popularity among Americans and evolved to include a wider variety of toppings, such as pepperoni and sausage.

                    Over the years, pizza has continued to evolve, with regional variations like the thin-crust New York-style and the deep-dish Chicago-style pizza gaining fame. It has become a global phenomenon, with countless interpretations, toppings, and styles, from Neapolitan to gourmet and everything in between. Today, pizza is a universally adored dish, enjoyed in pizzerias, restaurants, and homes around the world, a symbol of Italy's rich culinary heritage and a testament to the enduring appeal of a simple, yet delicious, creation.              """,
                    "2 people              ","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/pizza.jpg",['          2 cups flour sifted', '1/2 tablespoons butter, softened           ', '1 cup sugar           ', '1/2 teaspoon vanilla                 ', '4 cups milk              '],
                    ['Preheat oven to 175 degrees C.         ', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.           ', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
                    ,"288kcal             ","200mg              ","             5g","           100mg","2g","50mg"],

    ["Classic Beef Bourguignon(long ingredient list)","10min","15min","A French stew that's rich and flavorful ",
                    "2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/beefbour.jpg",[
    "2 pounds of beef stew meat",
    "4 slices of bacon, diced",
    "1 large onion, finely chopped",
    "2 cloves of garlic, minced",
    "3 carrots, peeled and sliced",
    "2 cups of red wine",
    "2 cups of beef broth",
    "2 tablespoons of tomato paste",
    "1 teaspoon of dried thyme",
    "2 bay leaves",
    "20 small pearl onions, peeled",
    "1 pound of mushrooms, sliced",
    "2 tablespoons of all-purpose flour",
    "2 tablespoons of butter",
    "Salt and pepper to taste",
    "1 tablespoons extra-virgin olive oil",
    "3 pounds (1 1/2 kg) beef brisket",
    "6 cloves garlic, minced (divided)",
    "12 small pearl onions (optional)",
    "1 teaspoon fresh thyme, finely chopped",
    "2 bay leaves",
    "1 pound fresh brown mushrooms",
    "8ounces cremini mushrooms",
    "Chopped flat-leaf parsley",
    "1 tbsp tomato purée"

],['Preheat oven to 175 degrees C.', 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.', 'In a medium bowl, cream together the sugar and butter.', 'Beat in the eggs, one at a time, then stir in the vanilla.', 'Combine flour and baking powder, add to the creamed mixture and mix well.']
    ,"288kcal","200mg","5g","100mg","2g","50mg"],

    ["Coq au Vin (long list of directions)","10min","15min","Coq au Vin is a classic French dish that demands patience and precision but rewards you with a delightful meal featuring complex flavors and layers of deliciousness.",
                    "2 people","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/coq.jpg",['2 cups flour sifted', '1/2 tablespoons butter, softened', '1 cup sugar', '1/2 teaspoon vanilla', '4 cups milk'],
                    [
    "Prepare the Chicken: Cut the whole chicken into pieces.",
    "Season with salt and black pepper.",
    "Dredge in flour and shake off excess.",
    "Cook the Bacon: Heat 2 tablespoons of olive oil in a large Dutch oven.", 
    "Cook diced bacon until crispy.",
    "Remove and set aside.",
    "Brown the Chicken: In the same pot, brown chicken pieces in bacon fat and oil.",
    "Brown on all sides.", 
    "Remove and set aside.",
    "Sauté Onions, Carrots, and Garlic: In the same pot, add chopped onions and carrots.",
    "Sauté until soft and golden, about 5-7 minutes.",
    "Add minced garlic and cook for an additional minute.",
    "Flambe with Brandy: Pour brandy or cognac into the pot.", 
    "Carefully ignite it with a lighter to flambe. Allow flames to subside.",
    "Simmer with Wine and Broth: Return chicken and bacon to the pot.", 
    "Add red wine and chicken broth.",
    "Add bouquet garni and bring to a simmer.",
    "Simmer the Chicken: Cover with a lid and simmer for about 2 hours until chicken is tender and fully cooked.",
    "Prepare Mushroom and Onion Garnish: In a separate skillet, melt 2 tablespoons of butter.", 
    "Sauté small peeled onions and mushrooms until lightly browned.",
    "Strain the Cooking Liquid: Carefully remove chicken from the pot and set aside.", 
    "Strain the cooking liquid to remove solids.",
    "Thicken the Sauce: Return the liquid to the pot and heat over medium-low.", 
    "Create a roux by melting 2 tablespoons of butter and stirring in 2 tablespoons of flour.", 
    "Whisk the roux into the strained liquid and simmer until the sauce thickens.",
    "Combine and Simmer: Return chicken, pearl onions, and mushrooms to the pot.",
    "Simmer for an additional 15-20 minutes to heat everything through and meld the flavors.",
    "Garnish and Serve: Serve Coq au Vin hot, garnished with chopped fresh parsley for a fresh touch."
    ]
                    ,"288kcal","200mg","5g","100mg","2g","50mg"]

]          