CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `get_all_deliveries_for_end_location` AS
    SELECT 
        `d`.`iddeliveries` AS `iddeliveries`,
        `d`.`packages_idpackages` AS `packages_idpackages`,
        `d`.`priority` AS `priority`,
        `d`.`payment_idpayment` AS `payment_idpayment`,
        `d`.`international` AS `international`,
        `d`.`start_location` AS `start_location`,
        `d`.`end_location` AS `end_location`,
        `d`.`message` AS `message`,
        `d`.`estimated_date` AS `estimated_date`,
        `d`.`start_date` AS `start_date`,
        `d`.`end_date` AS `end_date`,
        `d`.`uid` AS `uid`,
        `l`.`idlocation` AS `idlocation`,
        `l`.`typeoflocation_idtypeoflocation` AS `typeoflocation_idtypeoflocation`,
        `l`.`city_idcity` AS `city_idcity`,
        `l`.`address` AS `address`
    FROM
        (`deliveries` `d`
        JOIN `location` `l` ON ((`d`.`end_location` = `l`.`idlocation`)))