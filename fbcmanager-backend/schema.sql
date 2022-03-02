
-- DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_p624vxq0vboah4lfpj88fq8gt` (`user_id`),
  CONSTRAINT `FK1fa36y2oqhao3wgg2rw1pi459` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `contactinfos`;

CREATE TABLE `contactinfos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_s9e63rngt8eqsgw6nriaj8c81` (`user_id`),
  CONSTRAINT `FKj98d3yt1te7an6scpxyuqndn5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `practises`;
CREATE TABLE `practises` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `maxParticipants` int DEFAULT NULL,
  `team` varchar(255) DEFAULT NULL,
  `timeEnd` time DEFAULT NULL,
  `timeStart` time DEFAULT NULL,
  `participants_id` bigint DEFAULT NULL,
  `trainer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqgk61bs7xmnmomr0w1l4o8fmx` (`participants_id`),
  KEY `FK9nib4sw4lwbnjx4sknf9rc5hr` (`trainer_id`),
  CONSTRAINT `FK9nib4sw4lwbnjx4sknf9rc5hr` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqgk61bs7xmnmomr0w1l4o8fmx` FOREIGN KEY (`participants_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `birthDate` date NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `isactive` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL,
  `usertype` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `users_practises`;
CREATE TABLE `users_practises` (
  `UserEntity_id` bigint NOT NULL,
  `practices_id` bigint NOT NULL,
  UNIQUE KEY `UK_81xppp1wnyxlll7nsgovsj7wo` (`practices_id`),
  KEY `FK3qkkwy9xp5xjmt9hjoolibyt9` (`UserEntity_id`),
  CONSTRAINT `FK3ncrdyp5fm2hq1q30dpcineca` FOREIGN KEY (`practices_id`) REFERENCES `practises` (`id`),
  CONSTRAINT `FK3qkkwy9xp5xjmt9hjoolibyt9` FOREIGN KEY (`UserEntity_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



