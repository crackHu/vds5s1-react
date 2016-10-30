/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.6.24 : Database - phrv2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`phrv2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `phrv2`;

/*Table structure for table `phr_process` */

DROP TABLE IF EXISTS `phr_process`;

CREATE TABLE `phr_process` (
  `id` varchar(50) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `memberId` varchar(255) DEFAULT NULL,
  `additional` varchar(255) DEFAULT NULL,
  `process` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `phr_process` */

insert  into `phr_process`(`id`,`createDate`,`phone`,`memberId`,`additional`,`process`) values ('01bdd429-9469-11e6-a3b0-000c29d509d3','2016-10-17 20:55:43','梁伟华','null','null','0JCZLS'),('032bb344-92ad-11e6-a3b0-000c29d509d3','2016-10-15 15:57:28','梁伟华','null','null','0Login'),('06e304c3-96bb-11e6-b4e7-000c29d509d3','2016-10-20 19:47:50','梁伟华','null','null','0Login'),('0e25a7b4-950f-11e6-a3b0-000c29d509d3','2016-10-18 16:44:21','梁伟华','null','null','0GRDAS'),('13de2d9a-9784-11e6-b4e7-000c29d509d3','2016-10-21 19:47:00','梁伟华','null','null','0Login'),('13ea0aee-944a-11e6-a3b0-000c29d509d3','2016-10-17 17:14:19','梁伟华','null','null','0GRDAS'),('19e23a4d-969a-11e6-a3b0-000c29d509d3','2016-10-20 15:52:12','梁伟华','null','null','0Login'),('1c973c6f-91bd-11e6-a3b0-000c29d509d3','2016-10-14 11:20:11','梁伟华','null','null','0Login'),('1d484613-9514-11e6-a3b0-000c29d509d3','2016-10-18 17:20:34','梁伟华','null','null','0GXYS'),('1d9257bf-91bd-11e6-a3b0-000c29d509d3','2016-10-14 11:20:13','梁伟华','null','null','0Login'),('1dd9f75c-9781-11e6-b4e7-000c29d509d3','2016-10-21 19:25:49','梁伟华','null','null','0Login'),('1ea91dde-9784-11e6-b4e7-000c29d509d3','2016-10-21 19:47:19','梁伟华','null','null','0Login'),('26ab89e3-9143-11e6-a3b0-000c29d509d3','2016-10-13 20:47:10','lweihua','','','0Login'),('28c86406-9441-11e6-a3b0-000c29d509d3','2016-10-17 16:10:29','梁伟华','null','null','0GRDAS'),('2d0a05d8-92a6-11e6-a3b0-000c29d509d3','2016-10-15 15:08:32','梁伟华','null','null','0Login'),('2f20ed7d-91c0-11e6-a3b0-000c29d509d3','2016-10-14 11:42:11','梁伟华','null','null','0Login'),('3274fcae-92a6-11e6-a3b0-000c29d509d3','2016-10-15 15:08:41','梁伟华','null','null','0Login'),('33a6904d-944a-11e6-a3b0-000c29d509d3','2016-10-17 17:15:13','梁伟华','null','null','0GRDAS'),('33c1304a-9673-11e6-a3b0-000c29d509d3','2016-10-20 11:13:45','梁伟华','null','null','0Login'),('364e947b-9510-11e6-a3b0-000c29d509d3','2016-10-18 16:52:38','梁伟华','null','null','0GRDAS'),('3657f2ab-9441-11e6-a3b0-000c29d509d3','2016-10-17 16:10:52','梁伟华','null','null','0GRDAS'),('3825cc1e-92b5-11e6-a3b0-000c29d509d3','2016-10-15 16:56:13','梁伟华','null','null','0GRZLU'),('3925f4b7-9781-11e6-b4e7-000c29d509d3','2016-10-21 19:26:35','梁伟华','null','null','0Login'),('3dee975c-9441-11e6-a3b0-000c29d509d3','2016-10-17 16:11:04','梁伟华','null','null','0GRDAS'),('3ea41a53-9143-11e6-a3b0-000c29d509d3','2016-10-13 20:47:50','lweihua','','','0Login'),('3faa94b5-966d-11e6-a3b0-000c29d509d3','2016-10-20 10:31:08','梁伟华','null','null','0Login'),('41da2cb1-92b5-11e6-a3b0-000c29d509d3','2016-10-15 16:56:30','梁伟华','null','null','0GRZLU'),('42bfcdfb-914e-11e6-a3b0-000c29d509d3','2016-10-13 22:06:41','梁伟华','null','null','0GetGRBH'),('4ed4734e-92c0-11e6-a3b0-000c29d509d3','2016-10-15 18:15:36','梁伟华','null','null','0GRZLU'),('55141743-92be-11e6-a3b0-000c29d509d3','2016-10-15 18:01:27','梁伟华','null','null','0GRZLU'),('62e21d2b-9143-11e6-a3b0-000c29d509d3','2016-10-13 20:48:51','lweihua','null','null','0Login'),('65c72cff-9775-11e6-b4e7-000c29d509d3','2016-10-21 18:01:55','梁伟华','null','null','0Login'),('67efa37d-966c-11e6-a3b0-000c29d509d3','2016-10-20 10:25:06','梁伟华','null','null','0Login'),('688d4bca-92a8-11e6-a3b0-000c29d509d3','2016-10-15 15:24:31','梁伟华','null','null','0Login'),('689652d2-9775-11e6-b4e7-000c29d509d3','2016-10-21 18:02:00','梁伟华','null','null','0Login'),('6aad014c-951a-11e6-a3b0-000c29d509d3','2016-10-18 18:05:41','梁伟华','null','null','0'),('6b089d59-9775-11e6-b4e7-000c29d509d3','2016-10-21 18:02:04','梁伟华','null','null','0Login'),('70fe813d-9775-11e6-b4e7-000c29d509d3','2016-10-21 18:02:14','梁伟华','null','null','0Login'),('74f92759-9518-11e6-a3b0-000c29d509d3','2016-10-18 17:51:39','梁伟华','null','null','0TNBS'),('7d5098fd-944a-11e6-a3b0-000c29d509d3','2016-10-17 17:17:16','梁伟华','null','null','0GRDAS'),('80bf5d72-9513-11e6-a3b0-000c29d509d3','2016-10-18 17:16:11','梁伟华','null','null','0GRDAS'),('85e86f39-9516-11e6-a3b0-000c29d509d3','2016-10-18 17:37:48','梁伟华','null','null','0GRDAS'),('89640027-944a-11e6-a3b0-000c29d509d3','2016-10-17 17:17:36','梁伟华','null','null','0GRDAS'),('92e3dc55-92ab-11e6-a3b0-000c29d509d3','2016-10-15 15:47:11','梁伟华','null','null','0Login'),('9413d500-9775-11e6-b4e7-000c29d509d3','2016-10-21 18:03:13','梁伟华','null','null','0Login'),('9480ecf7-966d-11e6-a3b0-000c29d509d3','2016-10-20 10:33:31','梁伟华','null','null','0Login'),('99494a83-951d-11e6-a3b0-000c29d509d3','2016-10-18 18:28:27','梁伟华','null','null','0GRDAS'),('9a290a4c-92c1-11e6-a3b0-000c29d509d3','2016-10-15 18:24:52','梁伟华','null','null','0GRZLU'),('9b2c4c30-9820-11e6-b4e7-000c29d509d3','2016-10-22 14:27:29','梁伟华','null','null','0Login'),('9c02ab32-92bf-11e6-a3b0-000c29d509d3','2016-10-15 18:10:36','梁伟华','null','null','0GRZLU'),('9c1abd5c-944a-11e6-a3b0-000c29d509d3','2016-10-17 17:18:08','梁伟华','null','null','0Login'),('a08cca2b-92a5-11e6-a3b0-000c29d509d3','2016-10-15 15:04:37','梁伟华','null','null','0Login'),('a68d3989-9518-11e6-a3b0-000c29d509d3','2016-10-18 17:53:02','梁伟华','null','null','0'),('a6967809-92a5-11e6-a3b0-000c29d509d3','2016-10-15 15:04:47','梁伟华','null','null','0Login'),('ab7e8010-950e-11e6-a3b0-000c29d509d3','2016-10-18 16:41:35','梁伟华','null','null','0GRDAS'),('afe21c6e-9699-11e6-a3b0-000c29d509d3','2016-10-20 15:49:15','梁伟华','null','null','0Login'),('b0e43673-9796-11e6-b4e7-000c29d509d3','2016-10-21 22:00:15','梁伟华','null','null','0Login'),('b35e4417-9143-11e6-a3b0-000c29d509d3','2016-10-13 20:51:06','lweihua','null','null','0GetGRBH'),('b74f0185-950e-11e6-a3b0-000c29d509d3','2016-10-18 16:41:55','梁伟华','null','null','0GRDAS'),('c07bce9a-943f-11e6-a3b0-000c29d509d3','2016-10-17 16:00:24','梁伟华','null','null','0JKDAU'),('c0f5542d-943f-11e6-a3b0-000c29d509d3','2016-10-17 16:00:25','梁伟华','null','null','0GRDAS'),('c3a3849f-9517-11e6-a3b0-000c29d509d3','2016-10-18 17:46:41','梁伟华','null','null','0GRDAS'),('c6d75850-92bd-11e6-a3b0-000c29d509d3','2016-10-15 17:57:29','梁伟华','null','null','0GRZLU'),('c96ac253-9513-11e6-a3b0-000c29d509d3','2016-10-18 17:18:13','梁伟华','null','null','0GXYS'),('c9fe0485-92b4-11e6-a3b0-000c29d509d3','2016-10-15 16:53:09','梁伟华','null','null','0Login'),('ccb971c0-9517-11e6-a3b0-000c29d509d3','2016-10-18 17:46:57','梁伟华','null','null','0GRDAS'),('ce45aa3c-91bf-11e6-a3b0-000c29d509d3','2016-10-14 11:39:29','梁伟华','null','null','0Login'),('cec605a6-9511-11e6-a3b0-000c29d509d3','2016-10-18 17:04:03','梁伟华','null','null','0GRDAS'),('d0b1d11b-92b4-11e6-a3b0-000c29d509d3','2016-10-15 16:53:20','梁伟华','null','null','0Login'),('d593d9d1-928a-11e6-a3b0-000c29d509d3','2016-10-15 11:52:49','梁伟华','null','null','0Login'),('da5a19de-966c-11e6-a3b0-000c29d509d3','2016-10-20 10:28:18','梁伟华','null','null','0Login'),('dc097291-966d-11e6-a3b0-000c29d509d3','2016-10-20 10:35:31','梁伟华','null','null','0Login'),('de9e3599-96ba-11e6-b4e7-000c29d509d3','2016-10-20 19:46:42','梁伟华','null','null','0Login'),('e43fb6e8-9518-11e6-a3b0-000c29d509d3','2016-10-18 17:54:46','梁伟华','null','null','0'),('e8e7d4a9-9519-11e6-a3b0-000c29d509d3','2016-10-18 18:02:03','梁伟华','null','null','0'),('e9153a6f-9513-11e6-a3b0-000c29d509d3','2016-10-18 17:19:06','梁伟华','null','null','0GXYS'),('ec14076a-9762-11e6-b4e7-000c29d509d3','2016-10-21 15:49:40','梁伟华','null','null','0Login'),('ecbbea2c-966c-11e6-a3b0-000c29d509d3','2016-10-20 10:28:49','梁伟华','null','null','0Login'),('ede6d7d1-92db-11e6-a3b0-000c29d509d3','2016-10-15 21:33:19','梁伟华','null','null','0JKDAU'),('ef1be8c5-96ba-11e6-b4e7-000c29d509d3','2016-10-20 19:47:10','梁伟华','null','null','0Login'),('f51570bc-9143-11e6-a3b0-000c29d509d3','2016-10-13 20:52:56','lweihua','null','null','0GetGRBH'),('fc34f7df-92a6-11e6-a3b0-000c29d509d3','2016-10-15 15:14:20','梁伟华','null','null','0Login'),('fcf01278-951c-11e6-a3b0-000c29d509d3','2016-10-18 18:24:05','梁伟华','null','null','0GRDAS');

/*Table structure for table `phr_processanalysis` */

DROP TABLE IF EXISTS `phr_processanalysis`;

CREATE TABLE `phr_processanalysis` (
  `id` varchar(255) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `memberId` varchar(255) DEFAULT NULL,
  `process` varchar(255) DEFAULT NULL,
  `analysis` varchar(255) DEFAULT NULL,
  `errorCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `phr_processanalysis` */

/*Table structure for table `phr_processcode` */

DROP TABLE IF EXISTS `phr_processcode`;

CREATE TABLE `phr_processcode` (
  `id` varchar(50) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `significance` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `phr_processcode` */

insert  into `phr_processcode`(`id`,`createDate`,`code`,`significance`) values ('1','2016-10-13 19:36:07','JCZLS','【个人资料】个人资料查询失败'),('10','2016-10-13 20:09:22','TNBS','【个人档案】糖尿病保存'),('11','2016-10-13 20:09:31','TNBU','【个人档案】糖尿病更新'),('12','2016-10-13 20:12:18','LNRS','【个人档案】老年人保存'),('13','2016-10-13 20:12:37','LNRU','【个人档案】老年人更新'),('14','2016-10-13 20:16:25','GetGRBH','【个人资料】获取跟人编号'),('15','2016-10-13 20:18:38','Login','【登录】登录'),('2','2016-10-13 19:39:37','GRDAS','【个人档案】个人档案查询'),('3','2016-10-13 19:46:46','SelectByC','【个人档案】根据条件查询'),('4','2016-10-13 19:48:56','GRZLS','【个人档案】个人资料保存'),('5','2016-10-13 19:49:27','GRZLU','【个人档案】个人资料更新'),('6','2016-10-13 19:57:36','JKDAS','【个人档案】健康档案保存'),('7','2016-10-13 19:58:16','JKDAU','【个人档案】健康档案更新'),('8','2016-10-13 20:03:13','GXYS','【个人档案】高血压保存'),('9','2016-10-13 20:03:51','GXYU','【个人档案】高血压更新');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
