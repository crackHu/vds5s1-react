DELIMITER $$

USE `phrv2` $$

DROP PROCEDURE IF EXISTS `procJBZLSelect` $$

CREATE DEFINER = `root` @`localhost` PROCEDURE `procJBZLSelect` (IN pageNo INT, IN pageSize INT) 
BEGIN
  -- 查询档案列表
  IF(pageNo < 1) 
  THEN SET @start = 0 ;
  ELSE SET @start = (pageNo - 1) * pageSize ;
  END IF ;
  
  IF(pageSize < 1) 
  THEN SET @end = 10 ;
  ELSE SET @end = pageSize ;
  END IF ;
  
  SET @sql = 'SELECT * FROM phr_grda_jbzl order by grda_jdrq desc, grbh asc limit ?,?' ;
  PREPARE stmt FROM @sql ;
  EXECUTE stmt USING @start,
  @end ;
  DEALLOCATE PREPARE stmt ;
END $$

DELIMITER ;

