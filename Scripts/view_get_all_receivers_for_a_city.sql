CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `get_all_receivers_for_a_city` AS
    SELECT 
        `u`.`idcustomer` AS `idcustomer`,
        `u`.`type_of_user` AS `type_of_user`,
        `u`.`firstname` AS `firstname`,
        `u`.`secondname` AS `secondname`,
        `u`.`companyname` AS `companyname`,
        `u`.`email` AS `email`,
        `u`.`phone` AS `phone`,
        `u`.`address` AS `address`,
        `u`.`city_idcity` AS `city_idcity`,
        `u`.`duns` AS `duns`,
        `c`.`idcity` AS `idcity`,
        `c`.`country_idcountry` AS `country_idcountry`,
        `c`.`name` AS `name`
    FROM
        (`user` `u`
        JOIN `city` `c` ON ((`u`.`city_idcity` = `c`.`idcity`)))
    WHERE
        (`u`.`type_of_user` = 2)