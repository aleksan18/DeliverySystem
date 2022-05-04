CREATE DEFINER=`root`@`localhost` FUNCTION `calculateVehicleLoad`(
package_start_date datetime
) RETURNS int
    DETERMINISTIC
BEGIN
declare needed_vehicles float;
declare all_volume float;
select calculateVolume(packages_idpackages) into all_volume from deliveries
where package_start_date = start_date;
set needed_vehicles = all_volume/800 ;
RETURN needed_vehicles;
END