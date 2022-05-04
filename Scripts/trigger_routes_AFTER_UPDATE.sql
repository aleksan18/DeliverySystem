CREATE DEFINER=`root`@`localhost` TRIGGER `routes_AFTER_UPDATE` AFTER UPDATE ON `routes` FOR EACH ROW BEGIN
	IF !(NEW.end_date <=> OLD.end_date)
    THEN 
    UPDATE driver  SET driver.free=1  WHERE NEW.employees_idemployees = driver.idemployees;
	UPDATE vehicles set vehicles.free=1 WHERE NEW.vehicles_idvehicles = vehicles.idvehicles;
    END IF;
END