DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_type` boolean NOT NULL DEFAULT false,
  `user` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movie` int(11) NOT NULL,
  `comment_words` TEXT CHARACTER SET utf8 DEFAULT NULL,
  `audio` varchar(100) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`) REFERENCES `cSessionInfo` (`open_id`),
  FOREIGN KEY (`movie`) REFERENCES `movies` (`id`),
  UNIQUE (`user`, `movie`)
)ENGINE=InnoDB DEFAULT CHARSET utf8;

INSERT INTO `comment` (`user`, `movie`, `comment_words`) VALUES
('omQYZ4-MbwDQa3Fcf0aFJXTVrRIY', 12, '好想看啊啊~'),
('omQYZ4-MbwDQa3Fcf0aFJXTVrRIY', 11, '真的很好看哦~~~~');