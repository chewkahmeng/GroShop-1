CREATE TABLE `tbl_employee` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `created_dt` datetime NOT NULL,
  `last_modified_by` varchar(45) NOT NULL,
  `last_modified_dt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci