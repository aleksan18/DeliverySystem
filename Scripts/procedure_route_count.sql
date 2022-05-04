DELIMITER $$
CREATE PROCEDURE `route_count`(IN idvehicles int)
BEGIN
    DECLARE countVehicles int;
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    START TRANSACTION;
        
    SELECT COUNT(*) INTO countVehicles from routes where idvehicles= vehicles_idvehicles ;
    select countVehicles limit 0,5;
    IF sql_error = FALSE THEN 
        COMMIT;
    ELSE 
        ROLLBACK;
    END IF;
END$$
DELIMITER ;


