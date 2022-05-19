DELIMITER $$

CREATE TRIGGER check_sender_or_receiver_when_adding_a_package
     BEFORE INSERT ON packages FOR EACH ROW
     BEGIN
          IF EXISTS(SELECT * FROM user WHERE user.iduser=NEW.user_iduser)  != 1 
          THEN
			SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'the id of the sender does not exist!';
		  ELSEIF EXISTS(SELECT * FROM user WHERE user.iduser=NEW.receiver_iduser) != 1
          THEN 
			SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'the id of the receiver does not exist!';
          END IF;
     END;
$$

DELIMITER ;

