CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `get_all_payed_deliveries` AS
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
        `p`.`idpayment` AS `idpayment`,
        `p`.`typeofpayment_idtypeofpayment` AS `typeofpayment_idtypeofpayment`,
        `p`.`amount` AS `amount`,
        `p`.`payed` AS `payed`,
        `p`.`prepaid` AS `prepaid`,
        `p`.`transactionid` AS `transactionid`,
        `p`.`billing_address` AS `billing_address`
    FROM
        (`deliveries` `d`
        JOIN `payment` `p` ON ((`d`.`payment_idpayment` = `p`.`idpayment`)))