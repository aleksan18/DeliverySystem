DELIMITER $$
CREATE FUNCTION `calculateAmount`(
	idpackage int
) RETURNS float
    DETERMINISTIC
BEGIN
DECLARE check_package int; DECLARE amount_return float; declare width float; declare fragile tinyint; 
declare electronics tinyint; declare oddsized tinyint; declare height float; declare depth float;
declare weight float; DECLARE weight_calc float; DECLARE volume_calc float; DECLARE volume float;
SELECT 
packages.weight,packages.height,packages.depth,packages.width,packages.fragile,packages.electronics,packages.oddsized 
into weight,height,depth,width,fragile,electronics,oddsized 
from packages where idpackage=idpackages;
SELECT COUNT(*) into check_package from packages where idpackage = idpackages;
IF check_package= 0 THEN
	RETURN check_package;
END IF;
IF check_package > 0 THEN
	SET volume = height*width*depth;
	IF weight < 3 THEN SET  weight_calc= 0;
	ELSEIF weight < 5 THEN SET weight_calc = 0.5;
	ELSEIF weight > 5 THEN SET weight_calc = 1;
	END IF;
	IF volume < 800 THEN SET  volume_calc= 0;
    ELSEIF volume < 12500 THEN SET volume_calc = 0.5;
    ELSEIF volume > 12500 THEN SET volume_calc = 1;
    END IF;
	SET amount_return = 35 +(weight_calc+volume_calc+fragile+electronics+oddsized)*35;
	RETURN amount_return;
END IF;
END$$
DELIMITER ;