DELIMITER $$
CREATE PROCEDURE `packages_per_sorting_location`()
BEGIN
select end_location as "sorting location",count(end_location) as "packages"   from location l join routes r on idlocation=end_location where typeoflocation_idtypeoflocation=2 group by idlocation ;
END$$
DELIMITER ;