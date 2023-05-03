----------------------------------
-- TRUNCATE PRODUCTSERVICE TABLES
----------------------------------
truncate productservice.tbl_product;
truncate productservice.tbl_product_image;

----------------------------------
-- use productservice
----------------------------------
use productservice;

----------------------------------
-- insert Product
----------------------------------
INSERT INTO `tbl_product` VALUES (1,'Chicken Breast','boneless and skinless',10,10,'2023-03-05 16:10:05','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (2,'Salt',NULL,200,2.50,'2023-03-05 07:04:59','2023-03-05 23:04:59');
INSERT INTO `tbl_product` VALUES (3,'Vegetable Oil',NULL,80,6.40,'2023-03-05 07:05:14','2023-03-05 23:12:29');
INSERT INTO `tbl_product` VALUES (4,'Ginger','minced',100,3.90,'2023-03-05 07:05:43','2023-03-05 23:05:43');
INSERT INTO `tbl_product` VALUES (5,'Garlic','minced',100,1.50,'2023-03-05 07:06:01','2023-03-05 23:06:01');
INSERT INTO `tbl_product` VALUES (6,'Shallot',NULL,100,1.50,'2023-03-05 07:06:12','2023-03-05 23:06:12');
INSERT INTO `tbl_product` VALUES (7,'White Jasmine Rice',NULL,30,12.50,'2023-03-05 07:08:25','2023-03-05 23:08:25');
INSERT INTO `tbl_product` VALUES (8,'Chicken Stock',NULL,100,3,'2023-03-05 07:08:43','2023-03-05 23:08:43');
INSERT INTO `tbl_product` VALUES (9,'Spring Onion',NULL,100,0.80,'2023-03-05 07:11:17','2023-03-05 23:11:17');
INSERT INTO `tbl_product` VALUES (10,'Cucumber',NULL,100,2.50,'2023-03-05 07:15:52','2023-03-05 23:15:52');
INSERT INTO `tbl_product` VALUES (11,'Eggs','Carton of 10',50,8,'2023-03-05 07:46:23','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (12,'Caster Sugar',NULL,66,5,'2023-03-05 07:46:32','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (13,'Pandan Paste',NULL,20,4,'2023-03-05 07:47:32','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (14,'Coconut Milk',NULL,53,6,'2023-03-05 07:47:54','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (15,'Cake Flour',NULL,53,7.80,'2023-03-05 07:48:07','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (16,'Cream of Tartar',NULL,100,7,'2023-03-05 07:50:35','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (17,'Chicken Wings',NULL,60,10.20,'2023-03-05 08:01:33','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (18,'Turmeric',NULL,20,3,'2023-03-05 08:01:46','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (19,'Cornstarch',NULL,30,4,'2023-03-05 08:03:55','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (20,'White Pepper',NULL,50,3,'2023-03-05 08:06:10','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (21,'Thick Coconut Milk',NULL,50,7,'2023-03-05 08:06:38','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (22,'Pandan Leaf',NULL,40,2.10,'2023-03-05 08:06:57','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (23,'Lemongrass',NULL,50,1.90,'2023-03-05 08:07:12','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (24,'Sambal',NULL,50,3,'2023-03-05 08:07:18','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (25,'Roasted Peanuts',NULL,50,3,'2023-03-05 08:08:21','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (26,'Fried Ikan Bilis',NULL,50,3,'2023-03-05 08:08:32','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (27,'Onion',NULL,50,2,'2023-03-05 08:15:53','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (28,'Oil',NULL,30,5,'2023-03-05 08:16:42','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (29,'Coriander Powder',NULL,100,4,'2023-03-05 08:18:32','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (30,'Chili Powder',NULL,100,4,'2023-03-05 08:18:49','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (31,'Sugar',NULL,100,4,'2023-03-05 08:19:11','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (32,'Peanut Sauce',NULL,100,4,'2023-03-05 08:21:34','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (33,'Chicken Thigh','boneless and skinless',10,10,'2023-03-05 08:31:47','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (34,'Kway Teow',NULL,100,5,'2023-03-05 08:32:04','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (35,'Chilli Oil',NULL,50,5,'2023-03-05 08:32:23','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (36,'Black Vinegar',NULL,30,5,'2023-03-05 08:32:28','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (37,'Soy Sauce',NULL,50,5,'2023-03-05 08:32:39','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (38,'Tomato',NULL,200,3.50,'2023-03-05 08:52:12','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (39,'Chicken Stock Powder',NULL,50,6,'2023-03-05 08:53:43','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (40,'Lemon Juice',NULL,50,7,'2023-03-05 16:10:14','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (41,'Olive Oil',NULL,50,7,'2023-03-05 16:10:27','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (42,'Curry Powder',NULL,30,5,'2023-03-05 16:10:39','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (43,'Butter',NULL,100,6,'2023-03-05 16:11:33','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (44,'Tomato Puree',NULL,20,7,'2023-03-05 16:12:01','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (45,'Heavy Cream',NULL,30,7,'2023-03-05 16:12:11','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (46,'Basmati Rice',NULL,30,14,'2023-03-05 16:12:23','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (47,'Mango',NULL,50,4,'2023-03-05 16:20:46','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (48,'Plain Yogurt',NULL,50,8,'2023-03-05 16:20:55','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (49,'Milk',NULL,50,6,'2023-03-05 16:21:01','2023-03-05 00:27:05');
INSERT INTO `tbl_product` VALUES (50,'Cardamom Powder',NULL,78,4.30,'2023-03-05 16:22:10','2023-03-05 00:27:05');

----------------------------------
-- insert Product Images
----------------------------------
INSERT INTO `tbl_product_image` VALUES (1,'image/jpeg','chicken breast.jpg','/images/uploads/chicken breast.jpg',1,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (2,'image/jpeg','salt.jpg','/images/uploads/salt.jpg',2,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (3,'image/jpeg','vegetable oil.jpg','/images/uploads/vegetable oil.jpg',3,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (4,'image/jpeg','ginger.jpg','/images/uploads/ginger.jpg',4,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (5,'image/jpeg','garlic.jpg','/images/uploads/garlic.jpg',5,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (6,'image/jpeg','shallot.jpg','/images/uploads/shallot.jpg',6,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (7,'image/jpeg','white jasmine rice.jpg','/images/uploads/white jasmine rice.jpg',7,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (8,'image/jpeg','chicken stock.jpg','/images/uploads/chicken stock.jpg',8,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (9,'image/jpeg','spring onion.jpg','/images/uploads/spring onion.jpg',9,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (10,'image/jpeg','cucumber.jpg','/images/uploads/cucumber.jpg',10,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (11,'image/jpeg','eggs.jpg','/images/uploads/eggs.jpg',11,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (12,'image/jpeg','caster sugar.jpg','/images/uploads/caster sugar.jpg',12,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (13,'image/jpeg','pandan paste.jpg','/images/uploads/pandan paste.jpg',13,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (14,'image/jpeg','coconut milk.jpg','/images/uploads/coconut milk.jpg',14,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (15,'image/jpeg','cake flour.jpg','/images/uploads/cake flour.jpg',15,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (16,'image/jpeg','cream of tartar.jpg','/images/uploads/cream of tartar.jpg',16,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (17,'image/jpeg','chicken wings.jpg','/images/uploads/chicken wings.jpg',17,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (18,'image/jpeg','turmeric.jpg','/images/uploads/turmeric.jpg',18,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (19,'image/jpeg','cornstarch.jpg','/images/uploads/cornstarch.jpg',19,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (20,'image/jpeg','white pepper.jpg','/images/uploads/white pepper.jpg',20,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (21,'image/jpeg','thick coconut milk.jpg','/images/uploads/thick coconut milk.jpg',21,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (22,'image/jpeg','pandan leaf.jpg','/images/uploads/pandan leaf.jpg',22,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (23,'image/jpeg','lemongrass.jpg','/images/uploads/lemongrass.jpg',23,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (24,'image/jpeg','sambal.jpg','/images/uploads/sambal.jpg',24,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (25,'image/jpeg','roasted peanuts.jpg','/images/uploads/roasted peanuts.jpg',25,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (26,'image/jpeg','fried ikan bilis.jpg','/images/uploads/fried ikan bilis.jpg',26,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (27,'image/jpeg','onion.jpg','/images/uploads/onion.jpg',27,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (28,'image/jpeg','oil.jpg','/images/uploads/oil.jpg',28,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (29,'image/jpeg','coriander powder.jpg','/images/uploads/coriander powder.jpg',29,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (30,'image/jpeg','chili powder.jpg','/images/uploads/chili powder.jpg',30,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (31,'image/jpeg','sugar.jpg','/images/uploads/sugar.jpg',31,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (32,'image/jpeg','peanut sauce.jpg','/images/uploads/peanut sauce.jpg',32,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (33,'image/jpeg','chicken thigh.jpg','/images/uploads/chicken thigh.jpg',33,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (34,'image/jpeg','kway teow.jpg','/images/uploads/kway teow.jpg',34,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (35,'image/jpeg','chili oil.jpg','/images/uploads/chili oil.jpg',35,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (36,'image/jpeg','black vinegar.jpg','/images/uploads/black vinegar.jpg',36,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (37,'image/jpeg','soy sauce.jpg','/images/uploads/soy sauce.jpg',37,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (38,'image/jpeg','tomato.jpg','/images/uploads/tomato.jpg',38,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (39,'image/jpeg','chicken stock powder.jpg','/images/uploads/chicken stock powder.jpg',39,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (40,'image/jpeg','lemon juice.jpg','/images/uploads/lemon juice.jpg',40,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (41,'image/jpeg','olive oil.jpg','/images/uploads/olive oil.jpg',41,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (42,'image/jpeg','curry powder.jpg','/images/uploads/curry powder.jpg',42,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (43,'image/jpeg','butter.jpg','/images/uploads/butter.jpg',43,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (44,'image/jpeg','tomato puree.jpg','/images/uploads/tomato puree.jpg',44,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (45,'image/jpeg','heavy cream.jpg','/images/uploads/heavy cream.jpg',45,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (46,'image/jpeg','basmati rice.jpg','/images/uploads/basmati rice.jpg',46,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (47,'image/jpeg','mango.jpg','/images/uploads/mango.jpg',47,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (48,'image/jpeg','plain yogurt.jpg','/images/uploads/plain yogurt.jpg',48,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (49,'image/jpeg','milk.jpg','/images/uploads/milk.jpg',49,'2023-03-05 07:04:21','2023-03-05 23:04:22');
INSERT INTO `tbl_product_image` VALUES (50,'image/jpeg','cardamom powder.jpg','/images/uploads/cardamom powder.jpg',50,'2023-03-05 07:04:21','2023-03-05 23:04:22');
