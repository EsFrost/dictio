-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2023 at 09:56 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dictionary`
--

-- --------------------------------------------------------

--
-- Table structure for table `dictio`
--

CREATE TABLE `dictio` (
  `id` varchar(36) NOT NULL,
  `word` mediumtext NOT NULL,
  `translate` mediumtext NOT NULL,
  `chapter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dictio`
--

INSERT INTO `dictio` (`id`, `word`, `translate`, `chapter`) VALUES
('08fb2a76-780f-436d-99bf-4a6c69e84467', 'chap', 'one', 1),
('180f53e6-b60c-426f-b853-d09f09c0b10f', 'koropi', 'jamaisjamais', 1),
('58744317-e27c-4b66-84ee-755553314686', 'markarit', 'rita', 3),
('587a4cf9-5256-44e3-ac4c-107a293ae962', 'one', 'one', 1),
('94014a67-76f1-452f-9912-3deb0fded811', 'two', 'two', 1),
('c1efedbe-b45d-4af3-91f3-7ee10ac904c0', 'three', 'three', 1),
('de60477b-2516-45f9-8070-184b61457288', 'test', 'hgfkg', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dictio`
--
ALTER TABLE `dictio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `word` (`word`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
