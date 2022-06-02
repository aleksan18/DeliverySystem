DELIMITER $$
CREATE PROCEDURE get_city_id_and_country_id(IN location_id INT, OUT city_id INT, OUT country_id INT)
BEGIN
	SELECT l.zip_city_city_idcity, c.country_idcountry INTO city_id, country_id from postnord.location l 
		JOIN postnord.zip_city zc ON l.zip_city_zipcode_idzipcode = zc.zipcode_idzipcode AND l.zip_city_city_idcity = zc.city_idcity
		JOIN city c ON c.idcity = l.zip_city_city_idcity
		WHERE l.idlocation = location_id;
        
END$$
DELIMITER ;