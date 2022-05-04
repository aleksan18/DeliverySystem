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
  `city_idcity` INT NOT NULL,
  `duns` VARCHAR(9) NULL,
  PRIMARY KEY (`idcustomer`),
  INDEX `fk_customer_typeofreceiver_customer1_idx` (`type_of_user` ASC) VISIBLE,
  INDEX `fk_customer_city1_idx` (`city_idcity` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cvr_UNIQUE` (`duns` ASC) VISIBLE,
  CONSTRAINT `fk_customer_typeofreceiver_customer1`
    FOREIGN KEY (`type_of_user`)
    REFERENCES `postnord`.`type_of_user` (`idtypeofuser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_city1`
    FOREIGN KEY (`city_idcity`)
    REFERENCES `postnord`.`city` (`idcity`)
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
  `city_idcity` INT NOT NULL,
  `address` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`idlocation`),
  INDEX `fk_location_typeoflocation1_idx` (`typeoflocation_idtypeoflocation` ASC) VISIBLE,
  INDEX `fk_location_city1_idx` (`city_idcity` ASC) VISIBLE,
  CONSTRAINT `fk_location_typeoflocation1`
    FOREIGN KEY (`typeoflocation_idtypeoflocation`)
    REFERENCES `postnord`.`typeoflocation` (`idtypeoflocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_city1`
    FOREIGN KEY (`city_idcity`)
    REFERENCES `postnord`.`city` (`idcity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `billing_address` INT NOT NULL,
  PRIMARY KEY (`idpayment`),
  INDEX `fk_payment_typeofpayment1_idx` (`typeofpayment_idtypeofpayment` ASC) VISIBLE,
  UNIQUE INDEX `transactionid_UNIQUE` (`transactionid` ASC) VISIBLE,
  INDEX `fk_payment_location1_idx` (`billing_address` ASC) VISIBLE,
  CONSTRAINT `fk_payment_typeofpayment1`
    FOREIGN KEY (`typeofpayment_idtypeofpayment`)
    REFERENCES `postnord`.`typeofpayment` (`idtypeofpayment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_location1`
    FOREIGN KEY (`billing_address`)
    REFERENCES `postnord`.`location` (`idlocation`)
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
  `end_date` DATETIME NOT NULL,
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
  `end_date` DATETIME NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
