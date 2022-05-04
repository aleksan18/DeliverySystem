CREATE DEFINER=`root`@`localhost` PROCEDURE `route_count`(IN idvehicles int)
BEGIN
DECLARE countVehicles int;
SELECT COUNT(*) INTO countVehicles from routes where idvehicles= vehicles_idvehicles ;
select countVehicles limit 0,5;
END