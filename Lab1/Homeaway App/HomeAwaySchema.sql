-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.35-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for homeaway
CREATE DATABASE IF NOT EXISTS `homeaway` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `homeaway`;

-- Dumping structure for table homeaway.bookingdetails
CREATE TABLE IF NOT EXISTS `bookingdetails` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `pricePerNight` double NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `priceTotal` double NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  KEY `owner_id` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Contains booking details of properties';

-- Data exporting was unselected.
-- Dumping structure for table homeaway.propertydetails
CREATE TABLE IF NOT EXISTS `propertydetails` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `numSleep` int(11) NOT NULL,
  `numBath` int(11) NOT NULL,
  `numBed` int(11) NOT NULL,
  `minStay` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `photoURL` varchar(200) NOT NULL,
  PRIMARY KEY (`property_id`),
  KEY `owner_id` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Details about the property';

-- Data exporting was unselected.
-- Dumping structure for table homeaway.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(50) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `phone_num` varchar(50) NOT NULL,
  `hometown` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `languages` varchar(50) DEFAULT NULL,
  `aboutMe` varchar(150) DEFAULT NULL,
  `joined_date` date NOT NULL,
  `photoURL` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Details about the user- owner & traveler.';

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
