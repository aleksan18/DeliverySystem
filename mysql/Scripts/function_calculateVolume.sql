CREATE DEFINER=`root`@`localhost` FUNCTION `calculateVolume`(
idpackage int 
) RETURNS float
    DETERMINISTIC
BEGIN
declare volume float;
declare packageHeight float;
declare packageDepth float;
declare packageWidth float;
select height,depth,width
into packageHeight,packageDepth,packageWidth
from packages
where idpackage = idpackages;
SET volume = packageHeight*packageWidth*packageDepth;
RETURN volume;
END