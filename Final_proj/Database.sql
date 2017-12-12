DROP TABLE IF EXISTS `Device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Device` (
  `deviceid` varchar(10) NOT NULL,
  `version` varchar(45) NOT NULL,
  `sort` varchar(45) NOT NULL,
  `activated` tinyint(1) NOT NULL,
  `ipv4` varchar(45) DEFAULT NULL,
  `describe` varchar(45) DEFAULT NULL,
  `function` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`deviceid`),
   KEY `FK_owner` (`owner`),
  CONSTRAINT `FK_owner` FOREIGN KEY (`owner`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `SearchedDevice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SearchedDevice` (
  `deviceid` varchar(10) NOT NULL,
  `version` varchar(45) NOT NULL,
  `sort` varchar(45) NOT NULL,
  `ipv4` varchar(45) DEFAULT NULL,
  `describe` varchar(45) DEFAULT NULL,
  `function` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`deviceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;