DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` NOT NULL AUTO_INCREMENT,
  `comment_type` boolean NOT NULL DEFAULT false,
  `user` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movie` int NOT NULL,
  `comment_words` TEXT CHARACTER SET utf8 DEFAULT NULL,
  `audio` varchar(100) DEFAULT NULL,
  `duration` tinyint DEFAULT NULL,
  `nickName` varchar(100) NOT NULL,
  `avatarUrl` varchar(200) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`) REFERENCES `cSessionInfo` (`open_id`),
  FOREIGN KEY (`movie`) REFERENCES `movies` (`id`),
  UNIQUE (`user`, `movie`)
)ENGINE=InnoDB DEFAULT CHARSET utf8;

INSERT INTO `comment` (`user`, `movie`, `comment_words`, `nickName`, `avatarUrl`) VALUES
('omQYZ4-MbwDQa3Fcf0aFJXTVrRIY', 12, '好想看啊啊~', '倪昊', 'https://wx.qlogo.cn/mmopen/vi_32/CG1mxErnf89WB3S77KARfvUmsfgG5jmibFU3c4dTJO0ZLCebTEoQVsA6MumFVGIhJVgUZ5JuWCSnsIYIbGdrxeg/132'),
('omQYZ4-MbwDQa3Fcf0aFJXTVrRIY', 11, '真的很好看哦~~~~', '倪昊', 'https://wx.qlogo.cn/mmopen/vi_32/CG1mxErnf89WB3S77KARfvUmsfgG5jmibFU3c4dTJO0ZLCebTEoQVsA6MumFVGIhJVgUZ5JuWCSnsIYIbGdrxeg/132'),);