DELIMITER $$

USE `phrv2`$$

DROP PROCEDURE IF EXISTS `testProp`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `testProp`(IN xb VARCHAR(100), OUT bh VARCHAR(100))
BEGIN
  SELECT grbh INTO bh FROM phr_grda_jbzl WHERE grda_xm=xb;
END$$

DELIMITER ;