--------------------------------------------------------------------
-- ONLY LOCAL, CHINESE, MALAY RECIPES INCLUDED SO FAR (3 EACH)
--------------------------------------------------------------------

----------------------------------
-- TRUNCATE RECIPESERVICE TABLES
----------------------------------
truncate recipeservice.tbl_recipe;
truncate recipeservice.tbl_recipe_image;
truncate recipeservice.tbl_recipe_ingredient;
truncate recipeservice.tbl_recipe_step;
truncate recipeservice.tbl_favourites;
truncate recipeservice.tbl_comments;

----------------------------------
-- use recipeservice
----------------------------------
use recipeservice;

----------------------------------
-- insert Recipe 
----------------------------------
INSERT INTO `tbl_recipe` VALUES (1,'Hainanese Chicken Rice','One-Pot Hainanese Chicken Rice','Local',4,1,'hour',3,'2023-04-25 07:04:14','2023-04-25 23:04:14');
INSERT INTO `tbl_recipe` VALUES (2,'Pandan Chiffon Cake','It is soft, fluffy and full of aromatic Pandan leaf and coconut flavour!','Local',8,120,'minute',4,'2023-04-25 07:45:57','2023-04-28 23:52:18');
INSERT INTO `tbl_recipe` VALUES (3,'Nasi Lemak',NULL,'Malay',3,50,'minute',2,'2023-04-25 07:59:35','2023-04-28 23:52:55');
INSERT INTO `tbl_recipe` VALUES (4,'Chicken Satay','Delicious chicken satay or grilled chicken skewers marinated with spices and served with peanut sauce.','Malay',6,1,'hour',2,'2023-04-25 08:12:40','2023-04-28 23:53:16');
INSERT INTO `tbl_recipe` VALUES (5,'Spicy Chicken Chilli Oil Noodles',NULL,'Chinese',3,1,'hour',3,'2023-04-25 08:30:52','2023-04-28 23:55:02');
INSERT INTO `tbl_recipe` VALUES (6,'Tomato Egg Drop Soup',NULL,'Chinese',4,15,'minute',1,'2023-04-25 08:51:47','2023-04-28 23:56:05');
INSERT INTO `tbl_recipe` VALUES (7,'Murgh Makhani','Butter Chicken','Indian',4,50,'minute',2,'2023-04-28 16:09:06','2023-04-29 00:15:35');
INSERT INTO `tbl_recipe` VALUES (8,'Mango Lassi',NULL,'Indian',2,10,'minute',1,'2023-04-28 16:16:58','2023-04-29 00:16:58');

----------------------------------
-- insert Recipe Images
----------------------------------
INSERT INTO `tbl_recipe_image` VALUES (1,'image/jpeg','chicken rice.jpg','/images/uploads/chicken rice-1682435061574.jpg',1,'2023-04-25 07:04:21','2023-04-25 23:04:22');
INSERT INTO `tbl_recipe_image` VALUES (3,'image/jpeg','chiffon cake.jpg','/images/uploads/chiffon cake-1682437565462.jpg',2,'2023-04-25 07:46:05','2023-04-28 23:52:18');
INSERT INTO `tbl_recipe_image` VALUES (4,'image/jpeg','knorr-nasi-lemak.jpeg','/images/uploads/knorr-nasi-lemak-1682438420518.jpg',3,'2023-04-25 08:00:20','2023-04-28 23:52:55');
INSERT INTO `tbl_recipe_image` VALUES (5,'image/jpeg','satay.jpg','/images/uploads/satay-1682439235542.jpg',4,'2023-04-25 08:13:55','2023-04-28 23:53:16');
INSERT INTO `tbl_recipe_image` VALUES (6,'image/jpeg','spicy chicken scallion oil noodles.jpg','/images/uploads/spicy chicken scallion oil noodles-1682440291801.jpg',5,'2023-04-25 08:31:31','2023-04-29 00:30:27');
INSERT INTO `tbl_recipe_image` VALUES (7,'image/webp','tomato-egg-drop-soup-feat.webp','/images/uploads/tomato-egg-drop-soup-feat-1682695257093.jpg',6,'2023-04-25 08:51:52','2023-04-29 00:30:27');
INSERT INTO `tbl_recipe_image` VALUES (8,'image/jpeg','butter chicken.jpg','/images/uploads/butter chicken-1682698153437.jpg',7,'2023-04-28 16:09:13','2023-04-29 00:30:27');
INSERT INTO `tbl_recipe_image` VALUES (9,'image/jpeg','mango-lassi-featured.jpg','/images/uploads/mango-lassi-featured-1682698817698.jpg',8,'2023-04-28 16:20:17','2023-04-29 00:30:27');

----------------------------------
-- insert Recipe Ingredients
----------------------------------
INSERT INTO `tbl_recipe_ingredient` VALUES (1,'Chicken Breasts','skin-on with bones removed',4,'quantity',1,'2023-04-25 07:04:46','2023-04-25 23:04:46');
INSERT INTO `tbl_recipe_ingredient` VALUES (2,'Salt',NULL,1,'teaspoon',1,'2023-04-25 07:04:59','2023-04-25 23:04:59');
INSERT INTO `tbl_recipe_ingredient` VALUES (3,'Vegetable Oil',NULL,80,'ml',1,'2023-04-25 07:05:14','2023-04-25 23:12:29');
INSERT INTO `tbl_recipe_ingredient` VALUES (4,'Ginger','minced',1,'tablespoon',1,'2023-04-25 07:05:43','2023-04-25 23:05:43');
INSERT INTO `tbl_recipe_ingredient` VALUES (5,'Garlic','minced',1,'tablespoon',1,'2023-04-25 07:06:01','2023-04-25 23:06:01');
INSERT INTO `tbl_recipe_ingredient` VALUES (6,'Shallot','sliced',1,'quantity',1,'2023-04-25 07:06:12','2023-04-25 23:06:12');
INSERT INTO `tbl_recipe_ingredient` VALUES (7,'White Jasmine Rice',NULL,1,'cup',1,'2023-04-25 07:08:25','2023-04-25 23:08:25');
INSERT INTO `tbl_recipe_ingredient` VALUES (8,'Chicken Stock',NULL,1,'cup',1,'2023-04-25 07:08:43','2023-04-25 23:08:43');
INSERT INTO `tbl_recipe_ingredient` VALUES (9,'Spring Onions',NULL,3,'quantity',1,'2023-04-25 07:11:17','2023-04-25 23:11:17');
INSERT INTO `tbl_recipe_ingredient` VALUES (10,'Cucumber','thinly sliced',1,'quantity',1,'2023-04-25 07:15:52','2023-04-25 23:15:52');
INSERT INTO `tbl_recipe_ingredient` VALUES (11,'Egg Yolks',NULL,4,'quantity',2,'2023-04-25 07:46:23','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (12,'Caster Sugar','separate into 2 bowls: 13 g and 53 g',66,'g',2,'2023-04-25 07:46:32','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (13,'Vegetable Oil',NULL,26,'ml',2,'2023-04-25 07:46:46','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (14,'Pandan Paste',NULL,1,'g',2,'2023-04-25 07:47:32','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (15,'Coconut Milk',NULL,53,'ml',2,'2023-04-25 07:47:54','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (16,'Cake Flour','sifted',53,'g',2,'2023-04-25 07:48:07','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (17,'Egg Whites',NULL,4,'quantity',2,'2023-04-25 07:48:15','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (18,'Cream of Tartar',NULL,1,'g',2,'2023-04-25 07:50:35','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (19,'Chicken Wings',NULL,6,'quantity',3,'2023-04-25 08:01:33','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (20,'Turmeric','for chicken marinate',2,'teaspoon',3,'2023-04-25 08:01:46','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (21,'Salt',NULL,1,'teaspoon',3,'2023-04-25 08:01:55','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (22,'Cornstarch',NULL,30,'g',3,'2023-04-25 08:03:55','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (23,'White Pepper','powder',1,'teaspoon',3,'2023-04-25 08:06:10','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (24,'Rice','washed',2,'cup',3,'2023-04-25 08:06:24','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (25,'Thick Coconut Milk',NULL,1,'cup',3,'2023-04-25 08:06:38','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (26,'Water',NULL,1,'cup',3,'2023-04-25 08:06:46','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (27,'Pandan Leaf','knotted',4,'quantity',3,'2023-04-25 08:06:57','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (28,'Lemongrass','bruised',2,'quantity',3,'2023-04-25 08:07:12','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (29,'Sambal',NULL,1,'quantity',3,'2023-04-25 08:07:18','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (30,'Cucumber','sliced',1,'quantity',3,'2023-04-25 08:07:28','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (31,'Egg','hard boiled',3,'quantity',3,'2023-04-25 08:07:40','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (32,'Roasted Peanuts',NULL,50,'g',3,'2023-04-25 08:08:21','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (33,'Fried Ikan Bilis',NULL,50,'g',3,'2023-04-25 08:08:32','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (34,'Chicken Thigh and Leg Meat','boneless and skinless',1,'kg',4,'2023-04-25 08:14:56','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (35,'Cucumber','cut into small pieces',1,'quantity',4,'2023-04-25 08:15:37','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (36,'Onion','quartered',1,'quantity',4,'2023-04-25 08:15:53','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (37,'Oil','for chicken marinade',3,'tablespoon',4,'2023-04-25 08:16:42','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (38,'Lemongrass','white parts only, for chicken marinade',2,'quantity',4,'2023-04-25 08:17:10','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (39,'Garlic','peeled, for chicken marinade',2,'quantity',4,'2023-04-25 08:17:46','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (40,'Shallots','peeled, for chicken marinade',6,'quantity',4,'2023-04-25 08:17:59','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (41,'Turmeric powder','for chicken marinade',2,'teaspoon',4,'2023-04-25 08:18:18','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (42,'Coriander Powder','for chicken marinade',1,'teaspoon',4,'2023-04-25 08:18:32','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (43,'Chili Powder','for chicken marinade',1,'teaspoon',4,'2023-04-25 08:18:49','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (44,'Salt','for chicken marinade',2,'teaspoon',4,'2023-04-25 08:19:00','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (45,'Sugar','for chicken marinade',1,'tablespoon',4,'2023-04-25 08:19:11','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (46,'Peanut Sauce',NULL,1,'quantity',4,'2023-04-25 08:21:34','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (47,'Chicken Thighs',NULL,2,'quantity',5,'2023-04-25 08:31:47','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (48,'Kway Teow','or any preferred noodles, cooked',1,'quantity',5,'2023-04-25 08:32:04','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (49,'Chilli Oil',NULL,50,'ml',5,'2023-04-25 08:32:23','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (50,'Black Vinegar',NULL,3,'tablespoon',5,'2023-04-25 08:32:28','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (51,'Soy Sauce',NULL,2,'tablespoon',5,'2023-04-25 08:32:39','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (52,'Chicken Stock Powder',NULL,1,'teaspoon',5,'2023-04-25 08:32:49','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (53,'Garlic','sliced thinly',1,'quantity',5,'2023-04-25 08:33:05','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (54,'Boiled vegetables','of choice',1,'quantity',5,'2023-04-25 08:33:22','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (55,'Tomatoes','large, cut into wedges',2,'quantity',6,'2023-04-25 08:52:12','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (56,'Vegetable Oil',NULL,1,'tablespoon',6,'2023-04-25 08:52:18','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (57,'Garlic','finely grated, 1 clove',1,'quantity',6,'2023-04-25 08:52:42','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (58,'Chicken Stock',NULL,6,'cup',6,'2023-04-25 08:52:53','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (59,'Egg','lightly whisked',2,'quantity',6,'2023-04-25 08:53:04','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (60,'Cornstarch',NULL,2,'tablespoon',6,'2023-04-25 08:53:18','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (61,'Water',NULL,2,'tablespoon',6,'2023-04-25 08:53:28','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (62,'Soy Sauce',NULL,2,'tablespoon',6,'2023-04-25 08:53:43','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (63,'White Pepper','ground, to taste',1,'quantity',6,'2023-04-25 08:54:04','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (64,'Spring Onions','sliced',2,'quantity',6,'2023-04-25 08:54:16','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (65,'Salt',NULL,1,'quantity',6,'2023-04-25 08:54:20','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (66,'Chicken Breasts','boneless and skinless, cut into 1-inch pieces',1,'kg',7,'2023-04-28 16:10:05','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (67,'Lemon Juice',NULL,2,'tablespoon',7,'2023-04-28 16:10:14','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (68,'Olive Oil',NULL,2,'tablespoon',7,'2023-04-28 16:10:27','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (69,'Curry Powder',NULL,3,'teaspoon',7,'2023-04-28 16:10:39','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (70,'Onion','thinly sliced',1,'quantity',7,'2023-04-28 16:10:48','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (71,'Garlic','3 cloves, minced',1,'quantity',7,'2023-04-28 16:11:07','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (72,'Ginger','finely chopped',1,'tablespoon',7,'2023-04-28 16:11:23','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (73,'Butter',NULL,3,'tablespoon',7,'2023-04-28 16:11:33','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (74,'White Pepper',NULL,1,'quantity',7,'2023-04-28 16:11:42','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (75,'Salt',NULL,1,'teaspoon',7,'2023-04-28 16:11:48','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (76,'Tomato Puree',NULL,2,'cup',7,'2023-04-28 16:12:01','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (77,'Heavy Cream',NULL,1,'cup',7,'2023-04-28 16:12:11','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (78,'Basmati Rice','cooked',3,'cup',7,'2023-04-28 16:12:23','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (79,'Mango','chopped, ripe',2,'cup',8,'2023-04-28 16:20:46','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (80,'Plain yogurt',NULL,1,'cup',8,'2023-04-28 16:20:55','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (81,'Milk',NULL,1,'cup',8,'2023-04-28 16:21:01','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (82,'Sugar',NULL,2,'tablespoon',8,'2023-04-28 16:21:12','2023-04-29 00:27:05');
INSERT INTO `tbl_recipe_ingredient` VALUES (83,'Cardamom Powder','a pinch',1,'quantity',8,'2023-04-28 16:22:10','2023-04-29 00:27:05');

----------------------------------
-- insert Recipe Steps
----------------------------------
INSERT INTO `tbl_recipe_step` VALUES (1,'Rub the skin-on chicken with the salt and set aside.',1,'2023-04-25 07:12:42','2023-04-25 23:12:42');
INSERT INTO `tbl_recipe_step` VALUES (2,'In a pan or pot with a lid, heat up 1-2 tablespoons of oil.',1,'2023-04-25 07:12:48','2023-04-25 23:13:38');
INSERT INTO `tbl_recipe_step` VALUES (3,'Add the ginger, garlic, and shallot. Cook, stirring, until fragrant.',1,'2023-04-25 07:12:53','2023-04-25 23:12:53');
INSERT INTO `tbl_recipe_step` VALUES (4,'Stir in the rice and fry gently until glossy.',1,'2023-04-25 07:12:58','2023-04-25 23:12:58');
INSERT INTO `tbl_recipe_step` VALUES (5,'Add chicken stock, then place the chicken, skin-side up, in the pan. Add 2 of the spring onions on top.',1,'2023-04-25 07:13:09','2023-04-25 23:13:09');
INSERT INTO `tbl_recipe_step` VALUES (6,'Bring to boil over medium-high heat and when it starts to simmer, cover and turn the heat down to low. Cook for 17 mins. Turn off the heat and leave it to rest for 10 mins.',1,'2023-04-25 07:13:20','2023-04-25 23:13:20');
INSERT INTO `tbl_recipe_step` VALUES (7,'While the rice is cooking, make the spring onion oil: slice 1 spring onion and set them aside in a deep heat-proof bowl.',1,'2023-04-25 07:13:46','2023-04-25 23:14:51');
INSERT INTO `tbl_recipe_step` VALUES (8,'In a small pot, heat oil over medium heat. Remove the pot from the stove and very carefully pour over the green onions – they will sizzle and bubble up.',1,'2023-04-25 07:14:58','2023-04-25 23:14:58');
INSERT INTO `tbl_recipe_step` VALUES (9,'Stir in some salt to taste.',1,'2023-04-25 07:15:03','2023-04-25 23:15:03');
INSERT INTO `tbl_recipe_step` VALUES (10,'When the 10 min rest time is up, remove and discard the spring onions.',1,'2023-04-25 07:15:09','2023-04-25 23:15:09');
INSERT INTO `tbl_recipe_step` VALUES (11,'Remove the chicken and slice evenly.',1,'2023-04-25 07:15:13','2023-04-25 23:15:13');
INSERT INTO `tbl_recipe_step` VALUES (12,'Fluff up the rice and serve with chicken, thinly sliced cucumbers and spring onion oil. Serve immediately!',1,'2023-04-25 07:15:19','2023-04-25 23:15:19');
INSERT INTO `tbl_recipe_step` VALUES (13,'Put the egg yolks and sugar into a mixing bowl and start mixing them. ',2,'2023-04-25 07:51:01','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (14,'Mix them about 4-5 minutes until it turns a lighter shade. Then add vegetable oil and continue beating.',2,'2023-04-25 07:51:27','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (15,'Once the oil has been incorporated, add coconut milk and pandan paste. The colour will change into light green.',2,'2023-04-25 07:51:35','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (16,'Gradually add the sifted cake flour and mix until it just combined. Then set the mixture aside.',2,'2023-04-25 07:51:41','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (17,'Use white vinegar to wipe the other clean mixing bowl and the whisk before beating the egg whites.',2,'2023-04-25 07:51:47','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (18,'Whisk the egg whites at low speedy until foamy, approx. 1-2 mins.',2,'2023-04-25 07:51:54','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (19,'Add cream of tartar and continue whisking. Then gradually add in the sugar into the egg white.',2,'2023-04-25 07:51:59','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (20,'Turn the speed up to high and keep whisking all the time until the egg whites form a stiff peak. It takes around 5-7 minutes.',2,'2023-04-25 07:52:10','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (21,'Gently fold 1/3 of the meringue into the green yolk mixture.',2,'2023-04-25 07:52:17','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (22,'Then, fold the remaining meringue into the mixture in 2 batches until all well combined.',2,'2023-04-25 07:52:23','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (23,'Transfer the cake into an NON-GREASED tube pan and bake at 160 degrees for about 40-45 minutes or until insert a skewer withdraws clean.',2,'2023-04-25 07:52:33','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (24,'If the top of the cake cracks or become too dark, place a sheet of aluminium foil over it and continue baking.',2,'2023-04-25 07:52:39','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (25,'Once the cake is baked, invert the pan and place it on a raised wire rack to cool completely.',2,'2023-04-25 07:52:45','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (26,'Use a small platte knife gently scrape along the side of the pan to unmold the cake.',2,'2023-04-25 07:53:19','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (27,'Wash and clean rice.',3,'2023-04-25 08:08:46','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (28,'Add rice, coconut milk, water, pandan knots, lemongrass and salt to rice pot and cook the rice.',3,'2023-04-25 08:09:02','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (29,'Once rice is done, fluff it up.',3,'2023-04-25 08:09:07','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (30,'Remove pandan knots and lemongrass before serving.',3,'2023-04-25 08:09:11','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (31,'Clean chicken wings.',3,'2023-04-25 08:09:16','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (32,'In a bowl, add turmeric, salt and pepper.',3,'2023-04-25 08:09:22','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (33,'Marinade chicken for at least 30 minutes.',3,'2023-04-25 08:09:26','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (34,'Heat pan to medium high and add oil.',3,'2023-04-25 08:09:32','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (35,'Fry chicken wings till crispy. About 15-20 minutes.',3,'2023-04-25 08:09:36','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (36,'On a serving plate, add coconut rice, turmeric fried chicken and choice of condiments.',3,'2023-04-25 08:09:43','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (37,'Cut the chicken meat into small cubes. Set aside.',4,'2023-04-25 08:20:22','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (38,'Blend all the the Marinade ingredients in a food processor. Add a little water if needed.',4,'2023-04-25 08:20:30','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (39,'Combine the chicken and the Marinade together, stir to mix well.',4,'2023-04-25 08:20:43','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (40,'Marinate the chicken for 6 hours in the fridge, or best overnight.',4,'2023-04-25 08:20:49','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (41,'When ready, thread 3-4 pieces of the chicken meat onto the bamboo skewers.',4,'2023-04-25 08:20:54','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (42,'Grill the chicken satay skewers for 2-3 minutes on each side until the meat is fully cooked, and the surface is nicely charred, on both sides.',4,'2023-04-25 08:21:03','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (43,'Baste and brush with some oil while grilling. Serve hot with peanut sauce, the fresh cucumber pieces and onions.',4,'2023-04-25 08:21:08','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (44,'Boil chicken thighs in a pot of water for 15 mins or until cooked and tender.',5,'2023-04-25 08:33:29','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (45,'Set aside to cool in the fridge for 10 mins.',5,'2023-04-25 08:33:33','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (46,'Add cooking oil and sliced garlic in a small pan over low heat and slowly heat for about 3-4 mins until the garlic starts to turn slightly light brown at the edges.',5,'2023-04-25 08:33:38','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (47,'Add chicken stock powder into a bowl, pour in the hot garlic oil and mix well.',5,'2023-04-25 08:33:42','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (48,'Add the chilli oil into the garlic-chicken stock oil and mix well.',5,'2023-04-25 08:33:47','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (49,'Distribute the noodles evenly in a bowl and toss them with 2 tbsp of the sauce mix.',5,'2023-04-25 08:33:52','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (50,'Slice the cold chicken thigh and place it on top of the noodles.',5,'2023-04-25 08:33:55','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (51,'Drizzle more sauce over the sliced chicken, followed by boiled veggies if desired.',5,'2023-04-25 08:34:20','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (52,'Season the tomatoes with salt and allow them to sit for a couple of minutes before using.',6,'2023-04-25 08:54:28','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (53,'Heat the vegetable oil in a saucepan over high heat.',6,'2023-04-25 08:54:36','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (54,'Add the tomatoes and cook, stirring, for 2 minutes or until the tomatoes start to soften. ',6,'2023-04-25 08:54:45','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (55,'Stir through the garlic. Then add the chicken stock. Bring to a simmer. ',6,'2023-04-25 08:54:51','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (56,'Then stir the soup to form a vortex in the centre.',6,'2023-04-25 08:54:58','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (57,'Pour the egg into the centre of the vortex and stir vigorously to form the lacy egg.',6,'2023-04-25 08:55:03','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (58,'Mix the cornstarch and water to make a cornstarch slurry.',6,'2023-04-25 08:55:29','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (59,'Add the slurry, soy sauce and pepper. Simmer for another minute to thicken. ',6,'2023-04-25 08:55:45','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (60,'Add the spring onion and season with salt to taste.',6,'2023-04-25 08:55:50','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (61,'In a medium bowl, place the chicken pieces and add the lemon juice, 1 tablespoon of olive oil, and 2 teaspoons curry powder.',7,'2023-04-28 16:12:33','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (62,'Toss to coat the chicken, cover, and set aside.',7,'2023-04-28 16:12:40','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (63,'In a heavy skillet over medium heat, warm up the remaining olive oil with one tablespoon of butter.',7,'2023-04-28 16:12:46','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (64,'Add the onion, garlic, and ginger and saute for one minute.',7,'2023-04-28 16:12:51','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (65,'Add the remaining curry powder and remaining butter. Stir well.',7,'2023-04-28 16:12:57','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (66,'Add the pepper, salt, and tomato puree. Mix well and simmer for 5 minutes, stirring frequently.',7,'2023-04-28 16:13:03','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (67,'Stir in the skillet the marinated chicken pieces with their juices.',7,'2023-04-28 16:13:08','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (68,'Bring the chicken to a boil, then reduce the heat and simmer for about 11 to 15 minutes until the chicken is thoroughly cooked.',7,'2023-04-28 16:13:46','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (69,'Stir in the heavy cream and mix. Cook for one more minute.',7,'2023-04-28 16:13:51','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (70,'Turn off the heat and let the chicken rest for 2 to 5 minutes.',7,'2023-04-28 16:13:56','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (71,'Serve the chicken over basmati rice.',7,'2023-04-28 16:14:01','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (72,'To a blender jar, add mangoes, yogurt, milk, cardamom powder and sugar.',8,'2023-04-28 16:22:49','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (73,'Blend until the mango lassi is super smooth. It should be thick yet of pouring consistency.',8,'2023-04-28 16:23:03','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (74,'Pour Mango Lassi to serving glasses. If you prefer it to be colder, refrigerate it for an hour.',8,'2023-04-28 16:24:15','2023-04-29 00:28:50');
INSERT INTO `tbl_recipe_step` VALUES (75,'Garnish with sliced pistachios or with saffron if desired.',8,'2023-04-28 16:24:44','2023-04-29 00:28:50');
