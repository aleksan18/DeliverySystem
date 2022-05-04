
DELIMITER $$
CREATE EVENT update_last_user_activity_and_delete_old_users
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
  UPDATE user
	SET last_activity_date = get_last_activity_date(user.iduser);
  DELETE FROM user WHERE user.last_activity_date < DATE_SUB(NOW(), INTERVAL 3 YEAR);
END$$
DELIMITER ;
  