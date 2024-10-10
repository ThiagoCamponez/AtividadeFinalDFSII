CREATE DATABASE  IF NOT EXISTS `vagastop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `vagastop`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: vagastop
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidato_vaga`
--

DROP TABLE IF EXISTS `candidato_vaga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidato_vaga` (
  `cand_cpf` varchar(14) NOT NULL,
  `vaga_codigo` int(11) NOT NULL,
  `data_inscricao` date NOT NULL,
  `horario_inscricao` time NOT NULL,
  PRIMARY KEY (`cand_cpf`,`vaga_codigo`),
  KEY `fk_vaga_codigo` (`vaga_codigo`),
  CONSTRAINT `fk_cand_cpf` FOREIGN KEY (`cand_cpf`) REFERENCES `candidato` (`cand_cpf`),
  CONSTRAINT `fk_vaga_codigo` FOREIGN KEY (`vaga_codigo`) REFERENCES `vaga` (`vaga_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidato_vaga`
--

LOCK TABLES `candidato_vaga` WRITE;
/*!40000 ALTER TABLE `candidato_vaga` DISABLE KEYS */;
INSERT INTO `candidato_vaga` VALUES ('080.370.779-75',13,'2024-10-10','10:28:17'),('085.415.235-95',13,'2024-10-10','10:49:35'),('098.452.634-15',11,'2024-10-10','10:49:15');
/*!40000 ALTER TABLE `candidato_vaga` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 10:51:07
