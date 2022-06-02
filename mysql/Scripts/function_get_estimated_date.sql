DELIMITER $$

CREATE FUNCTION get_estimated_date(location_id_1 INT, location_id_2 INT, start_date DATE)
RETURNS DATE DETERMINISTIC
BEGIN
DECLARE location1_city_id, location1_country_id, location2_city_id, location2_country_id INT;
DECLARE estimated_date DATE; 

call get_city_id_and_country_id(location_id_1, location1_city_id, location1_country_id);
call get_city_id_and_country_id(location_id_2, location2_city_id, location2_country_id);

IF (location1_city_id = location2_city_id AND location1_country_id = location2_country_id) THEN 
-- start_location and end_location are in the same city and country, thus estimated date is (start_date + 1)
	SET estimated_date = DATE_ADD(start_date, INTERVAL 1 DAY);
ELSEIF (location1_city_id != location2_city_id AND location1_country_id = location2_country_id) THEN
-- start_location and end_location are in different cities, but same and country, thus estimated date is (start_date + 3)
    SET estimated_date = DATE_ADD(start_date, INTERVAL 3 DAY);
ELSEIF (location1_city_id != location2_city_id AND location1_country_id != location2_country_id) THEN
-- start_location and end_location are in different cities, but same and country, thus estimated date is (start_date + 7)
    SET estimated_date = DATE_ADD(start_date, INTERVAL 7 DAY);
END IF;
RETURN estimated_date;
END$$