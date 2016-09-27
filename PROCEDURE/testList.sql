DELIMITER $$

USE `phrv2`$$

DROP PROCEDURE IF EXISTS `testList`$$

CREATE DEFINER = `root` @`localhost` PROCEDURE `testList` (
  IN xb VARCHAR (100),
  IN num INT,
  IN size INT
) 
BEGIN
  SELECT 
    * 
  FROM
    phr_grda_jbzl 
  WHERE grda_xb = xb 
  LIMIT num, size ;
END $$

DELIMITER ;