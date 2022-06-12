-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema postnord
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `postnord` ;

-- -----------------------------------------------------
-- Schema postnord
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `postnord` DEFAULT CHARACTER SET utf8 ;
USE `postnord` ;

-- -----------------------------------------------------
-- Table `postnord`.`type_of_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`type_of_user` ;

CREATE TABLE IF NOT EXISTS `postnord`.`type_of_user` (
  `idtypeofuser` INT NOT NULL AUTO_INCREMENT,
  `type_of_user` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idtypeofuser`),
  UNIQUE INDEX `type_of_user_UNIQUE` (`type_of_user` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`zipcode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`zipcode` ;

CREATE TABLE IF NOT EXISTS `postnord`.`zipcode` (
  `idzipcode` INT NOT NULL AUTO_INCREMENT,
  `zipcode` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idzipcode`),
  UNIQUE INDEX `zipcode_UNIQUE` (`zipcode` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`country` ;

CREATE TABLE IF NOT EXISTS `postnord`.`country` (
  `idcountry` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`idcountry`),
  INDEX `SECONDARY` (`name` ASC) INVISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`city` ;

CREATE TABLE IF NOT EXISTS `postnord`.`city` (
  `idcity` INT NOT NULL AUTO_INCREMENT,
  `country_idcountry` INT NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idcity`),
  INDEX `fk_city_country1_idx` (`country_idcountry` ASC) VISIBLE,
  CONSTRAINT `fk_city_country1`
    FOREIGN KEY (`country_idcountry`)
    REFERENCES `postnord`.`country` (`idcountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`zip_city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`zip_city` ;

CREATE TABLE IF NOT EXISTS `postnord`.`zip_city` (
  `zipcode_idzipcode` INT NOT NULL,
  `city_idcity` INT NOT NULL,
  PRIMARY KEY (`zipcode_idzipcode`, `city_idcity`),
  INDEX `fk_zip_city_city1_idx` (`city_idcity` ASC) VISIBLE,
  CONSTRAINT `fk_zip_city_zipcode1`
    FOREIGN KEY (`zipcode_idzipcode`)
    REFERENCES `postnord`.`zipcode` (`idzipcode`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_zip_city_city1`
    FOREIGN KEY (`city_idcity`)
    REFERENCES `postnord`.`city` (`idcity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`user` ;

CREATE TABLE IF NOT EXISTS `postnord`.`user` (
  `idcustomer` INT NOT NULL AUTO_INCREMENT,
  `type_of_user` INT NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `secondname` VARCHAR(45) NOT NULL,
  `companyname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(16) NOT NULL,
  `address` VARCHAR(70) NOT NULL,
  `duns` VARCHAR(9) NULL,
  `zip_city_zipcode_idzipcode` INT NOT NULL,
  `zip_city_city_idcity` INT NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idcustomer`),
  INDEX `fk_customer_typeofreceiver_customer1_idx` (`type_of_user` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cvr_UNIQUE` (`duns` ASC) VISIBLE,
  INDEX `fk_user_zip_city1_idx` (`zip_city_zipcode_idzipcode` ASC, `zip_city_city_idcity` ASC) VISIBLE,
  CONSTRAINT `fk_customer_typeofreceiver_customer1`
    FOREIGN KEY (`type_of_user`)
    REFERENCES `postnord`.`type_of_user` (`idtypeofuser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_zip_city1`
    FOREIGN KEY (`zip_city_zipcode_idzipcode` , `zip_city_city_idcity`)
    REFERENCES `postnord`.`zip_city` (`zipcode_idzipcode` , `city_idcity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`packages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`packages` ;

CREATE TABLE IF NOT EXISTS `postnord`.`packages` (
  `idpackages` INT NOT NULL AUTO_INCREMENT,
  `user_iduser` INT NULL,
  `weight` FLOAT NOT NULL,
  `height` FLOAT NOT NULL,
  `width` FLOAT NOT NULL,
  `depth` FLOAT NOT NULL,
  `fragile` TINYINT NOT NULL,
  `electronics` TINYINT NOT NULL,
  `oddsized` TINYINT NOT NULL,
  `receiver_iduser` INT NULL,
  PRIMARY KEY (`idpackages`),
  INDEX `fk_packages_customer_idx` (`user_iduser` ASC) VISIBLE,
  INDEX `fk_packages_user1_idx` (`receiver_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_packages_customer`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `postnord`.`user` (`idcustomer`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_packages_user1`
    FOREIGN KEY (`receiver_iduser`)
    REFERENCES `postnord`.`user` (`idcustomer`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`typeofpayment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`typeofpayment` ;

CREATE TABLE IF NOT EXISTS `postnord`.`typeofpayment` (
  `idtypeofpayment` INT NOT NULL AUTO_INCREMENT,
  `typeofpayment` VARCHAR(6) NOT NULL,
  PRIMARY KEY (`idtypeofpayment`),
  UNIQUE INDEX `typeofpayment_UNIQUE` (`typeofpayment` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`payment` ;

CREATE TABLE IF NOT EXISTS `postnord`.`payment` (
  `idpayment` INT NOT NULL AUTO_INCREMENT,
  `typeofpayment_idtypeofpayment` INT NOT NULL,
  `amount` DECIMAL(6,2) NOT NULL,
  `payed` TINYINT NOT NULL,
  `prepaid` TINYINT NOT NULL,
  `transactionid` VARCHAR(20) NULL,
  `billing_address` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`idpayment`),
  INDEX `fk_payment_typeofpayment1_idx` (`typeofpayment_idtypeofpayment` ASC) VISIBLE,
  UNIQUE INDEX `transactionid_UNIQUE` (`transactionid` ASC) VISIBLE,
  CONSTRAINT `fk_payment_typeofpayment1`
    FOREIGN KEY (`typeofpayment_idtypeofpayment`)
    REFERENCES `postnord`.`typeofpayment` (`idtypeofpayment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`typeoflocation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`typeoflocation` ;

CREATE TABLE IF NOT EXISTS `postnord`.`typeoflocation` (
  `idtypeoflocation` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idtypeoflocation`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`location` ;

CREATE TABLE IF NOT EXISTS `postnord`.`location` (
  `idlocation` INT NOT NULL AUTO_INCREMENT,
  `typeoflocation_idtypeoflocation` INT NOT NULL,
  `address` VARCHAR(70) NOT NULL,
  `zip_city_zipcode_idzipcode` INT NOT NULL,
  `zip_city_city_idcity` INT NOT NULL,
  PRIMARY KEY (`idlocation`),
  INDEX `fk_location_typeoflocation1_idx` (`typeoflocation_idtypeoflocation` ASC) VISIBLE,
  INDEX `fk_location_zip_city1_idx` (`zip_city_zipcode_idzipcode` ASC, `zip_city_city_idcity` ASC) VISIBLE,
  CONSTRAINT `fk_location_typeoflocation1`
    FOREIGN KEY (`typeoflocation_idtypeoflocation`)
    REFERENCES `postnord`.`typeoflocation` (`idtypeoflocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_zip_city1`
    FOREIGN KEY (`zip_city_zipcode_idzipcode` , `zip_city_city_idcity`)
    REFERENCES `postnord`.`zip_city` (`zipcode_idzipcode` , `city_idcity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`deliveries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`deliveries` ;

CREATE TABLE IF NOT EXISTS `postnord`.`deliveries` (
  `iddeliveries` INT NOT NULL AUTO_INCREMENT,
  `packages_idpackages` INT NOT NULL,
  `priority` TINYINT NOT NULL,
  `payment_idpayment` INT NOT NULL,
  `international` TINYINT NOT NULL,
  `start_location` INT NOT NULL,
  `end_location` INT NOT NULL,
  `message` VARCHAR(150) NOT NULL,
  `estimated_date` DATETIME NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL,
  `uid` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`iddeliveries`),
  INDEX `fk_deliveries_packages1_idx` (`packages_idpackages` ASC) VISIBLE,
  INDEX `fk_deliveries_payment1_idx` (`payment_idpayment` ASC) VISIBLE,
  INDEX `fk_deliveries_location1_idx` (`start_location` ASC) VISIBLE,
  INDEX `fk_deliveries_location2_idx` (`end_location` ASC) VISIBLE,
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE,
  CONSTRAINT `fk_deliveries_packages1`
    FOREIGN KEY (`packages_idpackages`)
    REFERENCES `postnord`.`packages` (`idpackages`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_deliveries_payment1`
    FOREIGN KEY (`payment_idpayment`)
    REFERENCES `postnord`.`payment` (`idpayment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_deliveries_location1`
    FOREIGN KEY (`start_location`)
    REFERENCES `postnord`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_deliveries_location2`
    FOREIGN KEY (`end_location`)
    REFERENCES `postnord`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`driver`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`driver` ;

CREATE TABLE IF NOT EXISTS `postnord`.`driver` (
  `idemployees` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `secondname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(16) NOT NULL,
  `free` TINYINT NOT NULL,
  PRIMARY KEY (`idemployees`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`type_of_vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`type_of_vehicles` ;

CREATE TABLE IF NOT EXISTS `postnord`.`type_of_vehicles` (
  `idtype_of_vehicles` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idtype_of_vehicles`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`vehicles` ;

CREATE TABLE IF NOT EXISTS `postnord`.`vehicles` (
  `idvehicles` INT NOT NULL AUTO_INCREMENT,
  `type_of_vehicles_idtype_of_vehicles` INT NOT NULL,
  `identifier` VARCHAR(45) NOT NULL,
  `storage_size` INT NOT NULL,
  `free` TINYINT NOT NULL,
  PRIMARY KEY (`idvehicles`),
  INDEX `fk_vehicles_type_of_vehicles1_idx` (`type_of_vehicles_idtype_of_vehicles` ASC) VISIBLE,
  CONSTRAINT `fk_vehicles_type_of_vehicles1`
    FOREIGN KEY (`type_of_vehicles_idtype_of_vehicles`)
    REFERENCES `postnord`.`type_of_vehicles` (`idtype_of_vehicles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`typeofroute`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`typeofroute` ;

CREATE TABLE IF NOT EXISTS `postnord`.`typeofroute` (
  `idtypeofroute` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idtypeofroute`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postnord`.`routes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`routes` ;

CREATE TABLE IF NOT EXISTS `postnord`.`routes` (
  `idroutes` INT NOT NULL AUTO_INCREMENT,
  `vehicles_idvehicles` INT NOT NULL,
  `employees_idemployees` INT NOT NULL,
  `typeofroute_idtypeofroute` INT NOT NULL,
  `start_location` INT NOT NULL,
  `end_location` INT NOT NULL,
  `international` TINYINT NOT NULL,
  `deliveries_iddeliveries` INT NOT NULL,
  `route_order` INT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL,
  PRIMARY KEY (`idroutes`),
  INDEX `fk_routes_vehicles1_idx` (`vehicles_idvehicles` ASC) VISIBLE,
  INDEX `fk_routes_employees1_idx` (`employees_idemployees` ASC) VISIBLE,
  INDEX `fk_routes_typeofroute1_idx` (`typeofroute_idtypeofroute` ASC) VISIBLE,
  INDEX `fk_routes_location1_idx` (`start_location` ASC) VISIBLE,
  INDEX `fk_routes_location2_idx` (`end_location` ASC) VISIBLE,
  INDEX `fk_routes_deliveries1_idx` (`deliveries_iddeliveries` ASC) VISIBLE,
  CONSTRAINT `fk_routes_vehicles1`
    FOREIGN KEY (`vehicles_idvehicles`)
    REFERENCES `postnord`.`vehicles` (`idvehicles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_routes_employees1`
    FOREIGN KEY (`employees_idemployees`)
    REFERENCES `postnord`.`driver` (`idemployees`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_routes_typeofroute1`
    FOREIGN KEY (`typeofroute_idtypeofroute`)
    REFERENCES `postnord`.`typeofroute` (`idtypeofroute`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_routes_location1`
    FOREIGN KEY (`start_location`)
    REFERENCES `postnord`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_routes_location2`
    FOREIGN KEY (`end_location`)
    REFERENCES `postnord`.`location` (`idlocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_routes_deliveries1`
    FOREIGN KEY (`deliveries_iddeliveries`)
    REFERENCES `postnord`.`deliveries` (`iddeliveries`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `postnord`.`audit_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `postnord`.`audit_table` ;

CREATE TABLE IF NOT EXISTS `postnord`.`audit_table` (
  `idrow` INT NOT NULL,
  `action_type` ENUM("INSERT", "UPDATE", "DELETE") NOT NULL,
  `action_date` DATETIME NOT NULL,
  `action_created_by` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idrow`, `action_date`, `action_type`))
ENGINE = InnoDB;

USE `postnord`;

DELIMITER $$

USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`user_AFTER_INSERT` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idcustomer,"INSERT",now(),USER(),"USER TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`user_AFTER_UPDATE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`user_AFTER_UPDATE` AFTER UPDATE ON `user` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idcustomer,"UPDATE",now(),USER(),"USER TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`user_AFTER_DELETE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`user_AFTER_DELETE` AFTER DELETE ON `user` FOR EACH ROW
BEGIN
Insert into audit_table values(OLD.idcustomer,"DELETE",now(),USER(),"USER TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`payment_AFTER_INSERT` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`payment_AFTER_INSERT` AFTER INSERT ON `payment` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idpayment,"INSERT",now(),USER()," PAYMENT TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`payment_AFTER_UPDATE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`payment_AFTER_UPDATE` AFTER UPDATE ON `payment` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idpayment,"UPDATE",now(),USER()," PAYMENT TABLE");

END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`payment_AFTER_DELETE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`payment_AFTER_DELETE` AFTER DELETE ON `payment` FOR EACH ROW
BEGIN
Insert into audit_table values(OLD.idpayment,"DELETE",now(),USER()," PAYMENT TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`vehicles_AFTER_INSERT` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`vehicles_AFTER_INSERT` AFTER INSERT ON `vehicles` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idvehicles,"INSERT",now(),USER(),"VEHICLES TABLE");

END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`vehicles_AFTER_UPDATE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`vehicles_AFTER_UPDATE` AFTER UPDATE ON `vehicles` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idvehicles,"UPDATE",now(),USER(),"VEHICLES TABLE");

END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`vehicles_AFTER_DELETE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`vehicles_AFTER_DELETE` AFTER DELETE ON `vehicles` FOR EACH ROW
BEGIN
Insert into audit_table values(OLD.idvehicles,"DELETE",now(),USER(),"VEHICLES TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`routes_AFTER_INSERT` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`routes_AFTER_INSERT` AFTER INSERT ON `routes` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idroutes,"INSERT",now(),USER(),"ROUTES TABLE");

END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`routes_AFTER_UPDATE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`routes_AFTER_UPDATE` AFTER UPDATE ON `routes` FOR EACH ROW
BEGIN
Insert into audit_table values(NEW.idroutes,"UPDATE",now(),USER(),"ROUTES TABLE");
END$$


USE `postnord`$$
DROP TRIGGER IF EXISTS `postnord`.`routes_AFTER_DELETE` $$
USE `postnord`$$
CREATE DEFINER = CURRENT_USER TRIGGER `postnord`.`routes_AFTER_DELETE` AFTER DELETE ON `routes` FOR EACH ROW
BEGIN
Insert into audit_table values(OLD.idroutes,"DELETE",now(),USER(),"ROUTES TABLE");
END$$


DELIMITER ;
SET SQL_MODE = '';
DROP USER IF EXISTS viewer1;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'viewer1' IDENTIFIED BY 'viewer123';

GRANT SELECT ON TABLE postnord.* TO 'viewer1';
SET SQL_MODE = '';
DROP USER IF EXISTS developer;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'developer' IDENTIFIED BY 'developer123';

GRANT CREATE, EVENT, REFERENCES, GRANT OPTION ON postnord.* TO 'developer';
GRANT CREATE, GRANT OPTION, REFERENCES, ALTER, DELETE, INDEX, INSERT, SELECT, UPDATE, TRIGGER ON TABLE postnord.* TO 'developer';
SET SQL_MODE = '';
DROP USER IF EXISTS backend;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'backend' IDENTIFIED BY 'backend123';

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE postnord.* TO 'backend';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
USE postnord;

INSERT INTO country(name) VALUES
  ("Denmark"),
  ("Sweden"),
  ("Norway"),
  ("United Kingdom");

INSERT INTO city(country_idcountry, name) VALUES
  (1, "Copenhagen"),
  (1, "Frederiksberg"),
  (3, "Lillestrom");

INSERT INTO zipcode(zipcode) VALUES
  ("2000"),
  ("2100"),
  ("2200"),
  ("2300");

INSERT INTO zip_city(zipcode_idzipcode, city_idcity) VALUES
  (2, 1),
  (3, 1),
  (4, 1),
  (1, 2),
  (1, 3);

INSERT INTO driver(firstname, secondname, email, phone,free) VALUES
  ("Henrik", "Andersen", "henrik_a@work.com", "+4588557744",1),
  ("Christina", "Larsen", "christina_l@work.com", "+4577899665",1);

INSERT INTO type_of_vehicles(type) VALUES
  ("mini van"),
  ("van"),
  ("bike"),
  ("truck");

INSERT INTO vehicles(type_of_vehicles_idtype_of_vehicles, identifier, storage_size,free) VALUES
  (1, "FGG342", 800,0),
  (2, "ASF312", 1200,0),
  (4, "LKJ098", 100,0);

INSERT INTO typeoflocation(type) VALUES
  ("handling"), -- when the customer gives the package
  ("sorting"),
  ("pick-up"); -- when the customer picks-up the papckage; drop-off?

INSERT INTO  location(`typeoflocation_idtypeoflocation`,`zip_city_city_idcity`,`zip_city_zipcode_idzipcode`,`address`) VALUES
  -- handling locations start
  (1,2, 1,"Kronprinsensvej 52"), -- change city_id to city_zip_id
  (1,2, 1,"Joakim Larsens Vej 14"),
  (1,2, 1,"Hoffmeyersvej 31"),
  (1,2, 1,"Troels-Lunds Vej 15"),
  (1,2, 1,"Engvej 116"),
  -- handling locations end
  -- sorting locations start
  (2,1,2,"Ramundsvej 9"),
  (2,1,2,"Amagerfælledvej 73"),
  (2,1,2,"Kurlandsgade 23"),
  (2,1,2,"Guldbergsgade 96"),
  (2,1,2,"Rådmandsgade 70"),
  -- sorting locations end
  -- pick-up locations start
  (3,1,3,"Tåsingegade 26"),
  (3,1,3,"Østerbrogade 148"),
  (3,1,3,"Røde Mellemvej 22"),
  (3,1,3,"Hjulmagerstien 16"),
  (3,1,3,"Bregnegangen 46");
  -- pick-up locations end
  

INSERT INTO type_of_user(type_of_user) VALUES 
  ("sender"),
  ("receiver");

INSERT INTO postnord.user(type_of_user,firstname,secondname,companyname,email,phone,address,zip_city_city_idcity,zip_city_zipcode_idzipcode,duns,password) VALUES
  (1,"Illana","Colon","Nec Quam Curabitur Industries","bibendum@outlook.couk","(036247) 542513","Ap #321-4086 Ante Rd.",1,2,"663645585","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Ira","Nelson","Eu Metus Inc.","eleifend@google.org","(018) 63817966","123-1119 Mi. St.",1,2,"689655715","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Charissa","Rivas","Donec Est Incorporated","adipiscing.ligula@protonmail.ca","(0686) 13656217","P.O. Box 686, 6312 Adipiscing. Rd.",1,2,"103070737","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Brendan","Whitney","Volutpat Institute","non.bibendum.sed@yahoo.org","(0428) 75196853","655-3508 Sit St.",1,2,"962549849","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Leo","Vincent","Nulla Foundation","curabitur.egestas@yahoo.couk","(0155) 57355997","Ap #824-5162 Nunc Rd.",1,2,"732450511","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"John","Mitchell","Et Ipsum Cursus Corp.","metus.sit.amet@icloud.couk","(035834) 869237","Ap #764-6103 Lacinia Avenue",1,2,"917715724","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Vielka","Cruz","Massa Suspendisse Incorporated","mauris.erat.eget@hotmail.ca","(038176) 512071","Ap #416-574 Sociis Street",1,2,"248821411","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Gretchen","Briggs","Nunc Sed Orci Institute","nisl.nulla.eu@aol.org","(035189) 067288","658-1617 Rutrum Road",1,2,"115282127","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Quentin","Fitzpatrick","Scelerisque Sed Limited","ipsum.porta@google.org","(075) 42871843","P.O. Box 868, 3742 Et Ave",1,2,"785893285","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Logan","Carr","In LLC","aliquam.erat.volutpat@outlook.net","(00377) 6613826","Ap #970-3159 Cursus Street",2,1,"655362775","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Herrod","Hale","Orci Inc.","sem.eget@hotmail.net","(066) 71788596","8509 Donec St.",2,1,"888205255","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Astra","Wong","Blandit Limited","magnis.dis@outlook.com","(082) 47713827","185-1652 Non, Ave",2,1,"716139384","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Eagan","Beach","Eget Odio Corp.","fusce.aliquam.enim@outlook.edu","(0600) 45510471","828-2585 Velit. Road",2,1,"653537749","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Lareina","Terrell","Ipsum Non Institute","blandit.mattis.cras@aol.couk","(076) 12829047","2850 Integer Street",2,1,"688354131","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Neve","Duke","Mauris Sapien Consulting","ac.facilisis@icloud.couk","(098) 04166369","8480 Vel, Avenue",2,1,"332783477","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Blake","Guzman","Lectus Convallis Industries","congue.turpis.in@yahoo.edu","(08386) 6857436","Ap #409-5384 Hendrerit Rd.",2,1,"731849459","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Brianna","Bauer","Id Mollis LLP","sit.amet.nulla@yahoo.net","(0520) 77199559","P.O. Box 433, 7199 Erat Rd.",2,1,"573872224","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Macey","Jones","Ipsum LLP","a@hotmail.edu","(034271) 753787","P.O. Box 232, 3875 Duis St.",2,1,"237988745","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Amir","Walter","Sodales PC","diam.luctus.lobortis@aol.net","(035709) 116497","887-1400 Rutrum St.",3,1,"312791777","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Yeo","Bowen","Feugiat Placerat Velit Corporation","dictum.eleifend.nunc@outlook.couk","(028) 52648152","321-2481 Tincidunt. Rd.",3,1,"614565692","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Garrett","Moody","Enim Sit Limited","commodo@yahoo.net","(024) 47830724","7296 Non, Road",3,1,"247542148","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Lila","Garcia","Amet Diam Eu Institute","natoque@google.couk","(053) 82815905","615-721 Semper St.",3,1,"842516418","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Rashad","Cantu","Lectus Associates","egestas.hendrerit.neque@hotmail.org","(0803) 71893081","Ap #941-6870 Sed Av.",3,1,"754390473","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Jarrod","Winters","Purus Foundation","lacinia@yahoo.ca","(0944) 68301535","Ap #964-7599 Nec Rd.",3,1,"923785342","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Lamar","Freeman","Massa Integer Vitae Foundation","augue.porttitor@outlook.edu","(055) 78425671","6122 Ipsum Av.",3,1,"220428504","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Wynter","Moon","Sem Inc.","sollicitudin.commodo@protonmail.edu","(0735) 01336834","Ap #279-1295 Pharetra Rd.",3,1,"833088360","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Judith","Alexander","Ut Pellentesque LLP","tristique.senectus.et@icloud.org","(0492) 32456342","P.O. Box 960, 9595 Ligula. St.",3,1,"147312258","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Ursula","Ferrell","Natoque Penatibus Et Institute","cras@yahoo.couk","(064) 55624649","Ap #416-4407 Auctor Rd.",3,1,"503515131","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Hasad","Shaw","Ac Metus Vitae Institute","nunc.in@hotmail.couk","(039540) 465572","P.O. Box 606, 8237 Ultrices. Av.",3,1,"563336760","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Rudyard","Decker","Vestibulum Nec Euismod Industries","aliquet.lobortis@protonmail.ca","(037716) 105586","404-8987 Curae St.",3,1,"887137685","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Mohammad","Mcdaniel","In Limited","nascetur.ridiculus.mus@protonmail.net","(078) 88518774","9846 Phasellus Av.",3,1,"843785477","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Adam","O'Neill","Justo Eu Arcu Industries","in.ornare@protonmail.net","(06671) 3757971","P.O. Box 403, 6700 Ligula. St.",3,1,"104809712","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Kiayada","Huffman","Donec Elementum PC","montes@google.couk","(0443) 18239656","P.O. Box 630, 2091 Vestibulum Av.",3,1,"642381371","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Tanek","Powers","Adipiscing Lacus Ut Inc.","ultricies.dignissim@outlook.ca","(02825) 3324115","P.O. Box 362, 3312 Eu, Avenue",3,1,"566357423","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Aspen","Day","Orci In Consequat Ltd","quis.lectus@hotmail.ca","(0087) 87685325","146-5610 Ante. Av.",2,1,"766622781","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Aladdin","Gallagher","Integer Institute","interdum.enim@protonmail.com","(0702) 45341617","706-2449 Donec Rd.",2,1,"711563815","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Joel","Bailey","Iaculis Lacus Inc.","molestie.sodales.mauris@google.couk","(0517) 23615846","232-6237 Ornare St.",2,1,"641103494","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Jerry","Burgess","Vestibulum Mauris Magna LLC","arcu.sed@outlook.edu","(037829) 848034","Ap #584-9132 Ipsum St.",2,1,"838541356","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Blaze","Mcguire","Erat Consulting","pede.suspendisse.dui@icloud.couk","(032043) 138856","616-7686 Scelerisque St.",1,2,"887915428","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Ulysses","Stout","Ipsum Inc.","vivamus.euismod.urna@outlook.com","(0862) 39767247","3586 Sollicitudin Av.",1,2,"677867836","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS"),
  (1,"Pearl","Wise","Sed Eu Eros Ltd","morbi@hotmail.couk","(030523) 386747","781 Pede Road",1,2,"946857319","$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS");

INSERT INTO packages(`user_iduser`,`weight`,`height`,`width`,`depth`,`fragile`,`electronics`,`oddsized`,`receiver_iduser`) VALUES
  (1,2.01,1.01,3.01,1.01,"0","0","0",2),
  (1,5.00,0.25,1.15,0.50,"1","1","0",3),
  (2,6.00,0.50,3.00,1.00,"1","0","1",5),
  (4,7.00,1.00,2.00,1.00,"1","1","1",8);
  
INSERT INTO typeofpayment(typeofpayment) VALUES
  ("cash"),
  ("card"),
  ("paypal");
  
INSERT INTO payment(`typeofpayment_idtypeofpayment`,`amount`,`payed`,`prepaid`,`transactionid`,`billing_address`) VALUES
  (2,5292.01,"0","1","BAlX31kFK7",3),
  (2,8579.01,"1","0","MWkE81zPG5",2),
  (2,699.01,"1","1","HCcW62hGM4",3),
  (3,9901.01,"1","1","VVxU67yXC6",3),
  (3,6598.01,"0","1","ELoP59fFY4",4),
  (2,2967.01,"1","0","VMxM60sKW1",2),
  (1,8149.01,"0","0","XLjR70nPB7",4),
  (2,5828.01,"0","0","MGxU69wHH1",3),
  (2,9362.01,"1","1","UTmP26yWF9",3),
  (2,8920.01,"0","0","JRcS06cCP3",4);

INSERT INTO deliveries(`packages_idpackages`,`priority`,`payment_idpayment`,`international`,`start_location`,`end_location`,`message`,`estimated_date`,`start_date`,`end_date`,`uid`) VALUES
  (1,"0",1,"0",1,11,"placerat, augue. Sed molestie. Sed","2021-07-19 03:30:07","2021-07-18 02:51:52","2021-07-20 22:14:59","D332CD90-8A43"),
  (2,"0",2,"0",2,12,"hi, how is going","2021-07-21 03:30:07","2021-07-19 02:51:52","2021-07-21 22:14:59", "A232CD11-8309"),
  (3,"1",3,"0",3,13,"","2021-07-26 03:30:07", "2021-07-24 03:30:07", "2021-07-27 03:30:07", "M232CD11-8309"),
  (4,"1",4,"0",4,14,"blabla","2020-08-23 03:30:07","2020-08-20 03:30:07","2020-08-23 03:30:07", "T732CD11-8309");

INSERT INTO typeofroute(type) VALUES
  ("internal"),
  ("final"),
  ("return"),
  ("initial");

INSERT INTO routes(`vehicles_idvehicles`,`employees_idemployees`,`typeofroute_idtypeofroute`,`start_location`,`end_location`,`international`,`deliveries_iddeliveries`,`route_order`,`start_date`,`end_date`) VALUES
  (2,1,4,1,6,"0",1,1,"2021-02-24 13:24:00","2021-02-25 13:24:00"),
  (1,2,1,6,7,"1",1,2,"2021-02-24 14:24:00","2021-02-25 14:24:00"),
  (2,1,2,7,11,"1",1,3,"2021-02-24 16:24:00","2021-02-25 20:24:00"),
  (3,2,4,2,8,"0",2,1,"2021-07-21 03:30:07","2021-09-21 02:51:52"),
  (3,2,2,8,12,"0",2,1,"2021-07-21 03:30:07","2021-09-21 02:51:52"),
  (2,2,4,3,9,"0",3,1,"2021-07-24 03:30:07","2021-07-27 03:30:07"),
  (2,2,2,9,13,"0",3,1,"2021-07-24 03:30:07","2021-07-27 03:30:07"),
  (3,2,4,4,9,"0",4,1,"2020-08-20 03:30:07","2020-08-23 03:30:07"),
  (3,2,2,9,14,"0",4,1,"2020-08-20 03:30:07","2020-08-23 03:30:07");
 -- (2,2,2,2,2,"0",1,1,"2022-02-24 13:24:00","2022-02-25 13:24:00","2022-02-25 13:24:00"),
 -- (2,1,1,1,2,"1",1,2,"2022-02-24 13:24:00","2022-02-25 13:24:00","2022-02-25 13:24:00");
  

-- end attached script 'script'
