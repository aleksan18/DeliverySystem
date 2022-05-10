DELIMITER $$
CREATE PROCEDURE `packages_per_sorting_location`()
BEGIN
SELECT end_location as "sorting location", count(end_location) as "packages"   
FROM location l 
JOIN routes r ON idlocation=end_location 
WHERE typeoflocation_idtypeoflocation=2 
GROUP BY idlocation ;
END$$
DELIMITER ;