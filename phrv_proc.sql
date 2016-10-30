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

/* Procedure structure for procedure `phrSyNlbfbSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `phrSyNlbfbSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `phrSyNlbfbSelect`()
begin 
	set @strSql = concat("select count(grbh) as one from phr_grda_jbzl where ifnull(zfbj , 0) = 0 and 
													TIMESTAMPDIFF(YEAR , grda_csrq , sysdate())< 16 order by grda_csrq DESC");
	prepare strSql from @strSql;
	execute strSql ;
	deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `phrSyzjxgSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `phrSyzjxgSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `phrSyzjxgSelect`(in page int , in rows int)
begin 
	set @page = page;
  set @rows = rows;
	if @page < 2 
	then set @total = 0;
	else set @total =  @page * @rows ;
	end if;

	set @strSql = concat("select j.grbh , j.id , j.grda_xm , j.grda_xb , concat(j.grda_xzz_smc,j.grda_xzz_qxmc,j.grda_xzz_jdzmc
													,j.grda_xzz_jwcmc,grda_xzz_ljmc,j.grda_xzz_qt) as address , j.grda_brdh , j.grda_lxrdh , a.label
											 from phr_grda_jbzl j left join 
												 ( select l.label , l.grbh , l.last_update_time as last_update_time, x.last_update_time as last_update_time1 from phr_jbzd_label l 
												left join phr_grda_xg x on l.grbh = x.grbh 
													and ifnull(x.zfbj , 0) = 0 and ifnull(l.zfbj , 0) = 0 ) a on a.grbh = j.grbh
											where ifnull( j.zfbj , 0 ) = 0 and 
												( DATEDIFF(sysdate() , a.last_update_time) < 8 or DATEDIFF(sysdate() , a.last_update_time1) < 8 ) 
											group by a.last_update_time limit " , @total , " , " ,  @rows);
	prepare strSql from @strSql;
	execute strSql ;
	deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `phrSyzjxzSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `phrSyzjxzSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `phrSyzjxzSelect`(in page int , in rows int)
begin 
	set @page = page;
  set @rows = rows;
	if @page < 2 
	then set @total = 0;
	else set @total =  @page * @rows ;
	end if;

	set @strSql = concat("select j.grbh , j.id , j.grda_xm , j.grda_xb , concat(j.grda_xzz_smc,j.grda_xzz_qxmc,j.grda_xzz_jdzmc
													,j.grda_xzz_jwcmc,grda_xzz_ljmc,j.grda_xzz_qt) as address , j.grda_brdh , j.grda_lxrdh , a.label
											 from phr_grda_jbzl j left join 
												 ( select l.label , l.grbh , l.creat_time as creat_time, x.creat_time as creat_time1 from phr_jbzd_label l 
												left join phr_grda_xg x on l.grbh = x.grbh 
													and ifnull(x.zfbj , 0) = 0 and ifnull(l.zfbj , 0) = 0 ) a on a.grbh = j.grbh
											where ifnull( j.zfbj , 0 ) = 0 and 
												( DATEDIFF(sysdate() , a.creat_time) < 8 or DATEDIFF(sysdate() , a.creat_time1) < 8 ) 
											group by a.creat_time limit " , @total , " , " ,  @rows);
	prepare strSql from @strSql;
	execute strSql ;
	deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proAllGrdaGrbhSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proAllGrdaGrbhSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proAllGrdaGrbhSelect`(in grbh varchar(50))
begin 
	set @grbh = grbh ;
	SET @strSql1 = "SELECT grbh from phr_grda_jbzl where  grbh =  '";
	set @total = concat(@strSql1 , @grbh , "' group by grda_lrrq");
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `procJbzlJWCMCSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `procJbzlJWCMCSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `procJbzlJWCMCSelect`(in jdzmc varchar(20))
begin
	SELECT  distinct grda_hkdz_jwcmc from phr_grda_jbzl where grda_hkdz_jdzmc = jdzmc and grda_hkdz_jwcmc!='';
end */$$
DELIMITER ;

/* Procedure structure for procedure `procJbzlListSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `procJbzlListSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `procJbzlListSelect`(in size int)
begin 
   select grbh , grda_xm , grda_xb , grda_csrq , grda_sfzhm , grda_hkdz_jdzmc , grda_hkdz_jwcmc , grda_hkdz_ljmc , grda_hklx , grda_brdh , grda_jtdh  
			from phr_grda_jbzl group by grda_lrrq desc limit  0 , size ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `procJbzlLJMCSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `procJbzlLJMCSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `procJbzlLJMCSelect`(in jwcmc varchar(20))
begin
	SELECT  distinct grda_hkdz_ljmc from phr_grda_jbzl where grda_hkdz_jwcmc = jwcmc and grda_hkdz_ljmc!='';
end */$$
DELIMITER ;

/* Procedure structure for procedure `procJBZLSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `procJBZLSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `procJBZLSelect`(IN pageNo INT, IN pageSize INT)
BEGIN
-- 查询档案列表
  IF(pageNo < 1) 
  THEN SET @start = 0 ;
  ELSE SET @start = (pageNo - 1) * pageSize ;
  END IF ;
  SET @end = pageSize ;
  SET @sql = 'SELECT * FROM phr_grda_jbzl limit ?,?' ;
  PREPARE stmt FROM @sql ;
  EXECUTE stmt USING @start,
  @end ;
  DEALLOCATE PREPARE stmt ;
END */$$
DELIMITER ;

/* Procedure structure for procedure `proGrbhJwcmSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrbhJwcmSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrbhJwcmSelect`(in jwcm varchar(50))
begin 
  set @jwcm = jwcm;
	set @strSql = concat("select code , s_sort from sys_dict where name=" , @jwcm ); 
	prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;

end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrbmJwcmSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrbmJwcmSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrbmJwcmSelect`(in address varchar(50) )
begin 
  set @address = address;
	set @strSql = concat("select grbh from phr_grda_jbzl where concat(grda_xzz_smc , grda_xzz_qxmc , grda_xzz_jdzmc , grda_xzz_jwcmc , grda_xzz_ljmc , grda_xzz_qt) = " , @address ); 
	prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;

end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrbnSortSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrbnSortSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrbnSortSelect`(in address varchar(50) )
begin 
  set @address = address;
	set @strSql = concat("select grbh from phr_grda_jbzl where concat(grda_xzz_smc , grda_xzz_qxmc , grda_xzz_jdzmc , grda_xzz_jwcmc , grda_xzz_ljmc , grda_xzz_qt) = " , @address ); 
	prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;

end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaByIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaByIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaByIdSelect`(in tableName varchar(100) , in id varchar(50)  )
begin 
	set @id = id ;
  set @tableName = tableName ;
	set @total = concat('SELECT  * from ' , @tableName ,  ' where id = ' ,  @id );
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGrbhSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGrbhSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGrbhSelect`(in id varchar(50))
begin 
	set @id = id ;
	SET @strSql1 = "SELECT  * from phr_grda_jbzl where ifnull(zfbj,0)= 0 and id = '";
	set @total = concat(@strSql1 , @id , "'");
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGrIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGrIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGrIdSelect`(in id varchar(1000))
begin 
	set @id = id ;
	SET @strSql = 'SELECT  * from phr_grda_jbzl where id = ';
  set @total = concat(@strSql , @id);
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGxyByIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGxyByIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGxyByIdSelect`( in tableNmae varchar(500) , in id varchar(50))
begin
	set @id = id;
  set @tableNmae = tableNmae;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and id = '" ,  @id , "' ");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGxyByTimeSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGxyByTimeSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGxyByTimeSelect`( in tableNmae varchar(500) , in grbh varchar(50) , in xh varchar(500))
begin
	set @grbh = grbh;
  set @tableNmae = tableNmae;
  set @xh = xh;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "' and xh = '" , @xh , "'");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGxySelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGxySelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGxySelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select * from phr_jbzd_gxy_sfb2 where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "'");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaGxyXhSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaGxyXhSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaGxyXhSelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select xh from phr_jbzd_gxy_sfb2 where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "' group by xh desc");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJbzlSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJbzlSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJbzlSelect`(in grbh varchar(50) )
begin 
	#select j.id , j.grbh , j.grda_jtbh , j.grda_xm , j.grda_xb , j.grda_csrq  from  phr_grda_jbzl j where 
	set @grbh = grbh ;
	SET @strSql1 = "select * from  phr_grda_jbzl j where  ifnull(zfbj , 0) = 0  and grbh = '";
	set @total = concat(@strSql1 , @grbh , "'");
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJkdaByIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJkdaByIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJkdaByIdSelect`( in tableNmae varchar(500) , in id varchar(50))
begin
	set @id = id;
  set @tableNmae = tableNmae;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and id = '" ,  @id , "' ");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJkdaByTimeSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJkdaByTimeSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJkdaByTimeSelect`( in tableNmae varchar(500) , in grbh varchar(50) , in times varchar(500))
begin
	set @grbh = grbh;
  set @tableNmae = tableNmae;
  set @times = times;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "' and date_format(grda_tjrq, '%Y-%m-%d') = '" , @times , "'");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJkdaSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJkdaSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJkdaSelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select * from phr_grda_jkzk where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "'");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJwsSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJwsSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJwsSelect`(in grbh varchar(50) )
begin 
	#select j.id , j.grbh , j.grda_jtbh , j.grda_xm , j.grda_xb , j.grda_csrq  from  phr_grda_jbzl j where 
	set @grbh = grbh ;
	SET @strSql1 = "select id , grbh , lb , jbmc , qzne , bz from phr_grda_jws where ifnull(zfbj , 0) = 0 and grbh = '";
	set @total = concat(@strSql1 , @grbh , "'");
	prepare strSql from @total;
	execute strSql ;
	deallocate prepare strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaJzsSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaJzsSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaJzsSelect`(in grbh varchar(50))
begin 
	set @parms = grbh;
	set @strSql1 = "select * from	phr_grda_jzs where ifnull(zfbj , 0) = 0 and grbh = '";
  set @total = concat(@strSql1 , @parms , "' "  );
	prepare str from @total;
  execute str ;
	deallocate prepare str;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaLbByConditionSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaLbByConditionSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaLbByConditionSelect`( in conditions varchar(1000) ,  in page int , in rows int )
begin 
	set @beginNum = ( page - 1 ) * rows;
  set @conditions = conditions;
  set @strSql = CONCAT( 'select id , grbh , grda_xm , grda_xb , grda_csrq , grda_sfzhm , grda_hkdz_jdzmc , grda_hkdz_jwcmc , grda_hkdz_ljmc , grda_hklx ,
        grda_brdh , grda_jtdh , grda_lxrxm , grda_lxrdh , grda_jdrq , grda_dazt  from phr_grda_jbzl ' , @conditions ,  'order by grda_lrrq
				limit ' , @beginNum , ' , ' , rows  );
	prepare strSql from  @strSql ;
	execute strSql;
  deallocate prepare  strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaLbSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaLbSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaLbSelect`( in page int , in rows int )
begin 
	set @beginNum = ( page - 1 ) * rows;
  set @strSql = CONCAT( 'select id , grbh , grda_xm , grda_xb , grda_csrq , grda_sfzhm , grda_hkdz_jdzmc , grda_hkdz_jwcmc , grda_hkdz_ljmc , grda_hklx ,
        grda_brdh , grda_jtdh , grda_lxrxm , grda_lxrdh , grda_jdrq , grda_dazt  from phr_grda_jbzl order by grda_lrrq desc, grbh asc
				limit ' , @beginNum , ' , ' , rows );
	prepare strSql from  @strSql ;
	execute strSql;
  deallocate prepare  strSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaLnrByIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaLnrByIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaLnrByIdSelect`( in tableNmae varchar(500) , in id varchar(50))
begin
	set @id = id;
  set @tableNmae = tableNmae;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and id = '" ,  @id , "' ");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaLnrSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaLnrSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaLnrSelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select * from phr_jbzd_lnr_sfb where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "'");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaTnbByIdSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaTnbByIdSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaTnbByIdSelect`( in tableNmae varchar(500) , in id varchar(50))
begin
	set @id = id;
  set @tableNmae = tableNmae;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and id = '" ,  @id , "' ");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaTnbByTimeSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaTnbByTimeSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaTnbByTimeSelect`( in tableNmae varchar(500) , in grbh varchar(50) , in xh varchar(500))
begin
	set @grbh = grbh;
  set @tableNmae = tableNmae;
  set @xh = xh;
	set @strSql = concat("select * from " , @tableNmae , " where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "' and xh = '" , @xh , "'");
  prepare strSql from @strSql;
  execute strSql ; 
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaTnbSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaTnbSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaTnbSelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select * from phr_jbzd_tnb_sfjl2 where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "'");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proGrdaTnbXhSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proGrdaTnbXhSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proGrdaTnbXhSelect`( in grbh varchar(50))
begin
	set @grbh = grbh;
	set @strSql = concat("select xh from phr_jbzd_tnb_sfjl2 where ifnull(zfbj , 0) = 0 and grbh = '" ,  @grbh , "' group by xh desc");
  prepare strSql from @strSql;
  execute strSql ;
  deallocate prepare strSql;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proLoginSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proLoginSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proLoginSelect`( in loginName varchar(50) , in loginPassword varchar(50) )
begin
	set @loginName = loginName;
	if( null = LoginPassword || "" = LoginPassword )
	then set @loginPassword = "";
	else set @loginPassword = loginPassword;
	end if ;
	set @sql = 'select ru.id as uid , ru.userName as userName , role.name as roleName , dept.name as deptName from rs_usr ru 
								left join rs_roleusr rr on rr.usr_id = ru.id 
								left join rs_role role on role.id = rr.role_id
                left join rs_deptusr rd on rd.usr_id = ru.id 
								left join rs_dept dept on dept.id = rd.dept_id
                where psswrd = ? and loginName = ?';
	prepare stringSql from @sql;
	execute stringSql using @loginPassword , @loginName ; 
	deallocate prepare stringSql ;
end */$$
DELIMITER ;

/* Procedure structure for procedure `proNameSelect` */

/*!50003 DROP PROCEDURE IF EXISTS  `proNameSelect` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `proNameSelect`(in loginName varchar(50) )
begin 
	if ( null = loginName || "" = loginName )
	then set @loginName = "" ;
	else set @loginName = loginName ;
	end if ;
  set @sql = ' select loginName from rs_usr where loginName = ? ';
	prepare stringSql from @sql;
	execute stringSql USING @loginName ;
	deallocate prepare stringSql;
end */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
