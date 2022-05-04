use postnord; 
DELIMITER $$

CREATE FUNCTION get_last_activity_date(
	user_id INT
) 
RETURNS datetime
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE last_activity_date DATETIME;
	SET last_activity_date = (
    SELECT deliveries.start_date
	FROM user
	JOIN packages ON user.iduser = packages.user_iduser
	JOIN deliveries ON packages.idpackages = deliveries.packages_idpackages
	WHERE user.iduser = user_id
	ORDER BY deliveries.start_date DESC
	LIMIT 1);
	RETURN (last_activity_date);
END$$
DELIMITER ;