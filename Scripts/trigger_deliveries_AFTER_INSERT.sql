CREATE DEFINER=`root`@`localhost` TRIGGER `deliveries_AFTER_INSERT` AFTER INSERT ON `deliveries` FOR EACH ROW BEGIN
update deliveries
set uid = uuid()
where iddeliveries = new.iddeliveries;
END