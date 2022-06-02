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
  (1, "FGG342", 800,1),
  (2, "ASF312", 1200,1),
  (4, "LKJ098", 100,1);

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

INSERT INTO postnord.user(type_of_user,firstname,secondname,companyname,email,phone,address,zip_city_city_idcity,zip_city_zipcode_idzipcode,duns) VALUES
  (1,"Illana","Colon","Nec Quam Curabitur Industries","bibendum@outlook.couk","(036247) 542513","Ap #321-4086 Ante Rd.",1,2,"663645585"),
  (1,"Ira","Nelson","Eu Metus Inc.","eleifend@google.org","(018) 63817966","123-1119 Mi. St.",1,2,"689655715"),
  (1,"Charissa","Rivas","Donec Est Incorporated","adipiscing.ligula@protonmail.ca","(0686) 13656217","P.O. Box 686, 6312 Adipiscing. Rd.",1,2,"103070737"),
  (1,"Brendan","Whitney","Volutpat Institute","non.bibendum.sed@yahoo.org","(0428) 75196853","655-3508 Sit St.",1,2,"962549849"),
  (1,"Leo","Vincent","Nulla Foundation","curabitur.egestas@yahoo.couk","(0155) 57355997","Ap #824-5162 Nunc Rd.",1,2,"732450511"),
  (1,"John","Mitchell","Et Ipsum Cursus Corp.","metus.sit.amet@icloud.couk","(035834) 869237","Ap #764-6103 Lacinia Avenue",1,2,"917715724"),
  (1,"Vielka","Cruz","Massa Suspendisse Incorporated","mauris.erat.eget@hotmail.ca","(038176) 512071","Ap #416-574 Sociis Street",1,2,"248821411"),
  (1,"Gretchen","Briggs","Nunc Sed Orci Institute","nisl.nulla.eu@aol.org","(035189) 067288","658-1617 Rutrum Road",1,2,"115282127"),
  (1,"Quentin","Fitzpatrick","Scelerisque Sed Limited","ipsum.porta@google.org","(075) 42871843","P.O. Box 868, 3742 Et Ave",1,2,"785893285"),
  (1,"Logan","Carr","In LLC","aliquam.erat.volutpat@outlook.net","(00377) 6613826","Ap #970-3159 Cursus Street",2,1,"655362775"),
  (1,"Herrod","Hale","Orci Inc.","sem.eget@hotmail.net","(066) 71788596","8509 Donec St.",2,1,"888205255"),
  (1,"Astra","Wong","Blandit Limited","magnis.dis@outlook.com","(082) 47713827","185-1652 Non, Ave",2,1,"716139384"),
  (1,"Eagan","Beach","Eget Odio Corp.","fusce.aliquam.enim@outlook.edu","(0600) 45510471","828-2585 Velit. Road",2,1,"653537749"),
  (1,"Lareina","Terrell","Ipsum Non Institute","blandit.mattis.cras@aol.couk","(076) 12829047","2850 Integer Street",2,1,"688354131"),
  (1,"Neve","Duke","Mauris Sapien Consulting","ac.facilisis@icloud.couk","(098) 04166369","8480 Vel, Avenue",2,1,"332783477"),
  (1,"Blake","Guzman","Lectus Convallis Industries","congue.turpis.in@yahoo.edu","(08386) 6857436","Ap #409-5384 Hendrerit Rd.",2,1,"731849459"),
  (1,"Brianna","Bauer","Id Mollis LLP","sit.amet.nulla@yahoo.net","(0520) 77199559","P.O. Box 433, 7199 Erat Rd.",2,1,"573872224"),
  (1,"Macey","Jones","Ipsum LLP","a@hotmail.edu","(034271) 753787","P.O. Box 232, 3875 Duis St.",2,1,"237988745"),
  (1,"Amir","Walter","Sodales PC","diam.luctus.lobortis@aol.net","(035709) 116497","887-1400 Rutrum St.",3,1,"312791777"),
  (1,"Yeo","Bowen","Feugiat Placerat Velit Corporation","dictum.eleifend.nunc@outlook.couk","(028) 52648152","321-2481 Tincidunt. Rd.",3,1,"614565692"),
  (1,"Garrett","Moody","Enim Sit Limited","commodo@yahoo.net","(024) 47830724","7296 Non, Road",3,1,"247542148"),
  (1,"Lila","Garcia","Amet Diam Eu Institute","natoque@google.couk","(053) 82815905","615-721 Semper St.",3,1,"842516418"),
  (1,"Rashad","Cantu","Lectus Associates","egestas.hendrerit.neque@hotmail.org","(0803) 71893081","Ap #941-6870 Sed Av.",3,1,"754390473"),
  (1,"Jarrod","Winters","Purus Foundation","lacinia@yahoo.ca","(0944) 68301535","Ap #964-7599 Nec Rd.",3,1,"923785342"),
  (1,"Lamar","Freeman","Massa Integer Vitae Foundation","augue.porttitor@outlook.edu","(055) 78425671","6122 Ipsum Av.",3,1,"220428504"),
  (1,"Wynter","Moon","Sem Inc.","sollicitudin.commodo@protonmail.edu","(0735) 01336834","Ap #279-1295 Pharetra Rd.",3,1,"833088360"),
  (1,"Judith","Alexander","Ut Pellentesque LLP","tristique.senectus.et@icloud.org","(0492) 32456342","P.O. Box 960, 9595 Ligula. St.",3,1,"147312258"),
  (1,"Ursula","Ferrell","Natoque Penatibus Et Institute","cras@yahoo.couk","(064) 55624649","Ap #416-4407 Auctor Rd.",3,1,"503515131"),
  (1,"Hasad","Shaw","Ac Metus Vitae Institute","nunc.in@hotmail.couk","(039540) 465572","P.O. Box 606, 8237 Ultrices. Av.",3,1,"563336760"),
  (1,"Rudyard","Decker","Vestibulum Nec Euismod Industries","aliquet.lobortis@protonmail.ca","(037716) 105586","404-8987 Curae St.",3,1,"887137685"),
  (1,"Mohammad","Mcdaniel","In Limited","nascetur.ridiculus.mus@protonmail.net","(078) 88518774","9846 Phasellus Av.",3,1,"843785477"),
  (1,"Adam","O'Neill","Justo Eu Arcu Industries","in.ornare@protonmail.net","(06671) 3757971","P.O. Box 403, 6700 Ligula. St.",3,1,"104809712"),
  (1,"Kiayada","Huffman","Donec Elementum PC","montes@google.couk","(0443) 18239656","P.O. Box 630, 2091 Vestibulum Av.",3,1,"642381371"),
  (1,"Tanek","Powers","Adipiscing Lacus Ut Inc.","ultricies.dignissim@outlook.ca","(02825) 3324115","P.O. Box 362, 3312 Eu, Avenue",3,1,"566357423"),
  (1,"Aspen","Day","Orci In Consequat Ltd","quis.lectus@hotmail.ca","(0087) 87685325","146-5610 Ante. Av.",2,1,"766622781"),
  (1,"Aladdin","Gallagher","Integer Institute","interdum.enim@protonmail.com","(0702) 45341617","706-2449 Donec Rd.",2,1,"711563815"),
  (1,"Joel","Bailey","Iaculis Lacus Inc.","molestie.sodales.mauris@google.couk","(0517) 23615846","232-6237 Ornare St.",2,1,"641103494"),
  (1,"Jerry","Burgess","Vestibulum Mauris Magna LLC","arcu.sed@outlook.edu","(037829) 848034","Ap #584-9132 Ipsum St.",2,1,"838541356"),
  (1,"Blaze","Mcguire","Erat Consulting","pede.suspendisse.dui@icloud.couk","(032043) 138856","616-7686 Scelerisque St.",1,2,"887915428"),
  (1,"Ulysses","Stout","Ipsum Inc.","vivamus.euismod.urna@outlook.com","(0862) 39767247","3586 Sollicitudin Av.",1,2,"677867836"),
  (1,"Pearl","Wise","Sed Eu Eros Ltd","morbi@hotmail.couk","(030523) 386747","781 Pede Road",1,2,"946857319");

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
  
