CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `get_all_deliveries_on_type_of_payment` AS
    SELECT 
        `pd`.`iddeliveries` AS `iddeliveries`,
        `pd`.`packages_idpackages` AS `packages_idpackages`,
        `pd`.`priority` AS `priority`,
        `pd`.`payment_idpayment` AS `payment_idpayment`,
        `pd`.`international` AS `international`,
        `pd`.`start_location` AS `start_location`,
        `pd`.`end_location` AS `end_location`,
        `pd`.`message` AS `message`,
        `pd`.`estimated_date` AS `estimated_date`,
        `pd`.`start_date` AS `start_date`,
        `pd`.`end_date` AS `end_date`,
        `pd`.`uid` AS `uid`,
        `pd`.`idpayment` AS `idpayment`,
        `pd`.`typeofpayment_idtypeofpayment` AS `typeofpayment_idtypeofpayment`,
        `pd`.`amount` AS `amount`,
        `pd`.`payed` AS `payed`,
        `pd`.`prepaid` AS `prepaid`,
        `pd`.`transactionid` AS `transactionid`,
        `pd`.`billing_address` AS `billing_address`,
        `type_p`.`idtypeofpayment` AS `idtypeofpayment`,
        `type_p`.`typeofpayment` AS `typeofpayment`
    FROM
        (`get_all_payed_deliveries` `pd`
        JOIN `typeofpayment` `type_p` ON ((`pd`.`typeofpayment_idtypeofpayment` = `type_p`.`idtypeofpayment`)))