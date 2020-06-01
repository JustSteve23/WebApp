-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 01, 2020 alle 17:22
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4b_LuxuryCars`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `automobili`
--

CREATE TABLE `automobili` (
  `id` int(11) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modello` varchar(255) NOT NULL,
  `cilindrata` int(11) NOT NULL,
  `potenza` int(11) NOT NULL,
  `peso` float NOT NULL,
  `lunghezza` int(11) NOT NULL,
  `larghezza` int(11) NOT NULL,
  `tipoMotore` varchar(255) NOT NULL,
  `annoProduzione` int(11) NOT NULL,
  `prezzo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `automobili`
--

INSERT INTO `automobili` (`id`, `marca`, `modello`, `cilindrata`, `potenza`, `peso`, `lunghezza`, `larghezza`, `tipoMotore`, `annoProduzione`, `prezzo`) VALUES
(1, 'Ferrari', 'SF-90 Stradale', 3990, 780, 1570, 4710, 1972, 'V8 4,0 litri', 2020, 450000),
(2, 'Ford', 'GT40', 4195, 355, 864, 4026, 1778, 'V8 4,2 litri', 1966, 8000000),
(3, 'Koenigsegg', 'Regera', 5065, 1500, 1420, 4560, 2050, 'V8 5,0 litri', 2016, 2000000),
(4, 'Lamborghini', 'Aventador', 6498, 700, 1575, 4780, 2030, 'V12 6,5 litri', 2016, 330000),
(5, 'Porsche', '911 turbo s', 3745, 650, 1640, 4535, 1900, 'Boxer 3,8 litri', 2020, 250000),
(6, 'Ferrari', 'F40', 2936, 478, 1235, 4350, 1970, 'V8 ', 1990, 1000000),
(7, 'Ferrari', '280 GTO', 2953, 300, 950, 4400, 1674, 'V12', 1962, 5000000),
(8, 'Audi', 'R8', 5204, 610, 1630, 4430, 1940, 'V10 5,2 litri', 2017, 200000),
(9, 'Mercedes', 'GR R', 3982, 585, 1575, 4551, 2007, 'V8 4,0 litri', 2020, 190000),
(10, 'Bugatti', 'Divo', 7993, 1500, 1995, 4641, 2018, 'W16 8,0 litri', 2018, 5000000),
(11, 'Aston Martin', 'DBS Superleggera', 5204, 725, 1845, 4710, 1970, 'V12 5,2 litri', 2018, 300000),
(12, 'McLaren', '720s', 3994, 717, 1322, 4540, 1930, 'V8 4,0 litri', 2018, 250000),
(13, 'Ferrari', 'F8 triturbo', 3902, 720, 1555, 4610, 1980, 'V8 3,9 litri', 2019, 260000),
(14, 'Chevrolet', 'Corvette ZR1', 6162, 755, 1603, 4460, 1930, 'V8 6,2 litri', 2017, 140000),
(15, 'Lamborghini', 'Miura', 3929, 375, 1298, 4359, 1760, 'V12', 1966, 3000000),
(16, 'Ferrari', 'LaFerrari', 6262, 963, 1255, 4702, 1992, 'V12 Hybrid', 2018, 1860000),
(17, 'Ferrari', 'Enzo', 5998, 660, 1365, 4702, 2035, 'V12', 2002, 2800000),
(18, 'Ford', 'Shelby Mustang GT500', 5162, 771, 1916, 4831, 1946, 'V8', 2020, 70000),
(19, 'Bentley', 'Continental GT', 5950, 635, 2144, 4850, 1966, 'W12', 2018, 200000),
(20, 'Alfa Romeo', '8C Competizione', 4691, 450, 1585, 4381, 1894, 'V8', 2008, 285000),
(21, 'Lotus', 'Exige S3', 3456, 350, 1251, 4084, 1802, 'V6', 2018, 80000),
(22, 'Pagani Zonda', 'Huayra', 5980, 730, 1425, 4610, 2040, 'V12', 2017, 1288000),
(23, 'Ferrari', 'Testarossa', 4943, 391, 1506, 4480, 1980, 'V12', 1984, 150000),
(24, 'Mercedes-Benz', 'CLK GTR', 5987, 612, 1005, 4900, 1950, 'V12', 1997, 1995980),
(25, 'McLaren', 'Senna', 3994, 800, 1309, 4744, 2153, 'V8', 2019, 945500),
(26, 'Lamborghini', 'Sesto Elemento', 5204, 570, 999, 4580, 2045, 'V10', 2011, 3000000),
(27, 'Porsche', 'Taycan', 0, 762, 2270, 4963, 1966, 'Elettrico', 2019, 190000),
(28, 'Lexus', 'LFA', 4805, 559, 1555, 4505, 1895, 'V10', 2010, 300000),
(29, 'Aston Martin', 'One 77', 7312, 760, 1630, 4601, 2000, 'V12', 2011, 1460000),
(30, 'Ferrari', 'Roma', 3855, 620, 1472, 4656, 1974, 'V8', 2020, 200000),
(31, 'Lamborghini', 'Diablo GT', 5707, 575, 1460, 4460, 2040, 'V12', 1985, 510000),
(32, 'Ford', 'GT', 5900, 656, 1385, 4763, 2004, 'V6', 2016, 550000),
(33, 'Aston Martin', 'Valkyrie', 6032, 1160, 1000, 4500, 2000, 'V12', 2019, 3000000),
(34, 'Ferrari', 'FXX-K EVO', 6262, 1050, 1165, 4896, 2051, 'V12', 2015, 4000000);

-- --------------------------------------------------------

--
-- Struttura della tabella `clienti`
--

CREATE TABLE `clienti` (
  `username` varchar(255) NOT NULL,
  `nominativo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `clienti`
--

INSERT INTO `clienti` (`username`, `nominativo`, `password`, `email`) VALUES
('Chiara74', 'Chiara Ambrogio', '96216b1b1a816f6692a34250e0f8896d', 'chiara.ambrogio@gmail.com'),
('fenice75', 'Diego Belliardo', 'fb4e34463f9be0d3c55868cd5261ba1b', 'diego.belly.75@gmail.com'),
('JustSteve23', 'Stefano Grosso', '8eaeaf2ca7d64c01a313a8bec95a7395', 's.grosso.0918@vallauri.edu'),
('Test', 'test test', '098f6bcd4621d373cade4e832627b4f6', 'test.test@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `preferiti`
--

CREATE TABLE `preferiti` (
  `email` varchar(255) NOT NULL,
  `idAuto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `preferiti`
--

INSERT INTO `preferiti` (`email`, `idAuto`) VALUES
('chiara.ambrogio@gmail.com', 4),
('chiara.ambrogio@gmail.com', 3),
('chiara.ambrogio@gmail.com', 12),
('chiara.ambrogio@gmail.com', 8),
('s.grosso.0918@vallauri.edu', 3),
('s.grosso.0918@vallauri.edu', 22),
('s.grosso.0918@vallauri.edu', 2);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `automobili`
--
ALTER TABLE `automobili`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
