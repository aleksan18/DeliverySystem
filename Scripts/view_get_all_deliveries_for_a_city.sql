CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `get_all deliveries_for_a_city` AS
    SELECT 
        `get_all_deliveries_for_end_location`.`iddeliveries` AS `iddeliveries`,
        `get_all_deliveries_for_end_location`.`packages_idpackages` AS `packages_idpackages`,
        `get_all_deliveries_for_end_location`.`priority` AS `priority`,
        `get_all_deliveries_for_end_location`.`payment_idpayment` AS `payment_idpayment`,
        `get_all_deliveries_for_end_location`.`international` AS `international`,
        `get_all_deliveries_for_end_location`.`start_location` AS `start_location`,
        `get_all_deliveries_for_end_location`.`end_location` AS `end_location`,
        `get_all_deliveries_for_end_location`.`message` AS `message`,
        `get_all_deliveries_for_end_location`.`estimated_date` AS `estimated_date`,
        `get_all_deliveries_for_end_location`.`start_date` AS `start_date`,
        `get_all_deliveries_for_end_location`.`end_date` AS `end_date`,
        `get_all_deliveries_for_end_location`.`uid` AS `uid`,
        `get_all_deliveries_for_end_location`.`idlocation` AS `idlocation`,
        `get_all_deliveries_for_end_location`.`typeoflocation_idtypeoflocation` AS `typeoflocation_idtypeoflocation`,
        `get_all_deliveries_for_end_location`.`city_idcity` AS `city_idcity`,
        `get_all_deliveries_for_end_location`.`address` AS `address`,
        `city`.`idcity` AS `idcity`
    FROM
        (`get_all_deliveries_for_end_location`
        JOIN `city`)
    WHERE
        (`get_all_deliveries_for_end_location`.`city_idcity` = `city`.`idcity`)