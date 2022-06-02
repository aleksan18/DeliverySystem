// User Nodes
// CREATE (u:User {first_name: '', last_name: '', email: '', phone: ''})
CREATE (u1:User {first_name: 'George', last_name: 'Randers', email: 'george.randers@gmail.com', phone: '+44 7925 544261'}) //1

CREATE (u2:User {first_name: 'Ben', last_name: 'Quail', email: 'ben.quail@gmail.com', phone: '+44 4125 881602'}) //2

// Delivery
// date : YYYY-MM-DD
// CREATE (d:Delivery {priority: '', international: '', message: '', start_date: '', estimated_date: ''}) 
CREATE (d1:Delivery {priority: '0', international: '1', message: 'none', start_date: '2022-05-16', estimated_date: '2022-06-01', archived: '0', identifier: 'UKDKA14XY412'}) //1

CREATE (d2:Delivery {priority: '0', international: '1', message: 'none', start_date: '2022-05-16', estimated_date: '2022-06-02', archived: '0', identifier: 'UKDKA87IO422'}) //2

// Package
// weight : kg, height: cm, width: cm, depth: cm
// CREATE (p:Package {weight: '', height: '', width: '', depth: '', fragile: '', batteries: '', message: '', identifier: ''})
CREATE (p1:Package {weight: '5.306', height: '28', width: '25', depth: '24', fragile: '1', batteries: '1', message: 'wireless speaker', identifier: 'UKDKA14XY412-1'}) //1

CREATE (p2:Package {weight: '2.000', height: '60', width: '39', depth: '19', fragile: '0', batteries: '0', message: 'merch', identifier: 'UKDKA87IO422-1'}) //2

// Route
CREATE (rinit1:Route {type: 'initial', identifier: 'INUKDKA14XY412'}) 
CREATE (rfin1:Route {type: 'final', identifier: 'FIUKDKA14XY412'}) 
CREATE (rintr1:Route {type: 'internal', identifier: 'INTUKDKA14XY412'}) 

CREATE (rinit2:Route {type: 'initial', identifier: 'INUKDKA87IO422'}) 
CREATE (rfin2:Route {type: 'final', identifier: 'FIUKDKA87IO422'}) 
CREATE (rintr2:Route {type: 'internal', identifier: 'INTUKDKA87IO422'}) 


// Location
// CREATE (l:Location {country: '', city: '', zip: '', address: '', note: ''})
CREATE (l11:Location {country: 'UK', city: 'Manchester', zip: 'M14 4DX', address: '32 Heald Pl', note: 'UK MN Residential'})
CREATE (l12:Location {country: 'UK', city: 'Manchester', zip: 'M90 1QX', address: 'Manchester Airport', note: 'UK Manchester Airport'})
CREATE (l13:Location {country: 'DK', city: 'Kastrup', zip: '2770', address: 'Lufthavnsboulevarden 6', note: 'DK Copenhagen Airport'})
CREATE (l14:Location {country: 'DK', city: 'Copenhagen', zip: '1577', address: 'Arni Magnussons Gade 2', note: 'DK Copenhagen Tivoli Hotel'})

CREATE (l21:Location {country: 'UK', city: 'Manchester', zip: 'M1 3HN', address: '37 Chorlton St.', note: 'UK MN Residential'})
CREATE (l24:Location {country: 'DK', city: 'Copenhagen', zip: '1609', address: 'Axeltorv 2', note: 'DK Copenhagen Axel Towers'}) 

// Driver
// CREATE (dv:Driver {first_name: '', last_name: '', email: '', phone: '', free: ''})
CREATE (dv1:Driver {first_name: 'Henrik', last_name: 'Pederson', email: 'hepe412@work.com', phone: '+45 87 19 54 77', free: '1'})
CREATE (dv2:Driver {first_name: 'Florentin', last_name: 'Cireasa', email: 'foci1987@work.com', phone: '+45 63 22 74 09', free: '1'})

// Vehicle
// CREATE (v:Vehicle {type: '', identifier: '', storage: '', free: ''})
CREATE (v1:Vehicle {type: 'mini van', identifier: 'FGG342', storage: '800', free: '1'})
CREATE (v2:Vehicle {type: 'mini van', identifier: 'FGA188', storage: '800', free: '1'})
CREATE (v3:Vehicle {type: 'bike', identifier: 'A114', storage: '150', free: '1'})


// RELATIONSHIPS

// 1

// USER - DELIVERY
MATCH (u:User), (d:Delivery)
WHERE u.email = 'george.randers@gmail.com' AND d.identifier = 'UKDKA14XY412'
CREATE (u)-[r:ORDERED{date: '', amount: '1399', transaction_id: ''}]->(d)
SET r.date = '2022-05-16'
SET r.transaction_id = 'UKDK15A7451XY'
RETURN u, d, r

// DELIVERY - PACKAGE
MATCH (d:Delivery), (p:Package)
WHERE d.identifier = 'UKDKA14XY412' AND p.identifier = 'UKDKA14XY412-1'
CREATE (d)-[r:CONTAINS]->(p)
RETURN d, p, r

// DELIVERY - INITIAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA14XY412' AND ro.identifier = 'INUKDKA14XY412'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// DELIVERY - FINAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA14XY412' AND ro.identifier = 'FIUKDKA14XY412'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// DELIVERY - INTERNAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA14XY412' AND ro.identifier = 'INTUKDKA14XY412'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// INITIAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INUKDKA14XY412' AND l.address = '32 Heald Pl'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// INITIAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INUKDKA14XY412' AND l.note = 'UK Manchester Airport'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r

// INTERNAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INTUKDKA14XY412' AND l.note = 'UK Manchester Airport'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// INTERNAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INTUKDKA14XY412' AND l.note = 'DK Copenhagen Airport'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r

// FINAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'FIUKDKA14XY412' AND l.note = 'DK Copenhagen Airport'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// FINAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'FIUKDKA14XY412' AND l.note = 'DK Copenhagen Tivoli Hotel'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r

// 2 

// USER - DELIVERY
MATCH (u:User), (d:Delivery)
WHERE u.email = 'ben.quail@gmail.com' AND d.identifier = 'UKDKA87IO422'
CREATE (u)-[r:ORDERED{date: '', amount: '1399', transaction_id: ''}]->(d)
SET r.date = '2022-05-16'
SET r.transaction_id = 'UKDKAVFFIO422'
RETURN u, d, r

// DELIVERY - PACKAGE
MATCH (d:Delivery), (p:Package)
WHERE d.identifier = 'UKDKA87IO422' AND p.identifier = 'UKDKA87IO422-1'
CREATE (d)-[r:CONTAINS]->(p)
RETURN d, p, r

// // DELIVERY TO ROUTES

// DELIVERY - INITIAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA87IO422' AND ro.identifier = 'INUKDKA87IO422'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// DELIVERY - FINAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA87IO422' AND ro.identifier = 'FIUKDKA87IO422'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// DELIVERY - INTERNAL ROUTE
MATCH (d:Delivery), (ro:Route)
WHERE d.identifier = 'UKDKA87IO422' AND ro.identifier = 'INTUKDKA87IO422'
CREATE (d)-[r:HAS]->(ro)
RETURN d, ro, r

// // ROUTES TO LOCATIONS

// INITIAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INUKDKA87IO422' AND l.address = '37 Chorlton St.'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// INITIAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INUKDKA87IO422' AND l.note = 'UK Manchester Airport'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r

// INTERNAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INTUKDKA87IO422' AND l.note = 'UK Manchester Airport'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// INTERNAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'INTUKDKA87IO422' AND l.note = 'DK Copenhagen Airport'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r

// FINAL ROUTE TO START LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'FIUKDKA87IO422' AND l.note = 'DK Copenhagen Airport'
CREATE (ro)-[r:START_LOCATION]->(l)
RETURN ro, l, r

// FINAL ROUTE TO END LOCATION
MATCH (ro:Route), (l:Location)
WHERE ro.identifier = 'FIUKDKA87IO422' AND l.note = 'DK Copenhagen Axel Towers'
CREATE (ro)-[r:END_LOCATION]->(l)
RETURN ro, l, r


// // WAREHOUSE
CREATE (w:Warehouse{name:'DK Copenhagen Warehouse'}) 
RETURN w

// WAREHOUSE TO DRIVERS

MATCH (w:Warehouse), (d:Driver)
WHERE w.name = 'DK Copenhagen Warehouse' AND d.email = 'hepe412@work.com'
CREATE (w)-[r:HAS]->(d)
RETURN w,r,d

MATCH (w:Warehouse), (d:Driver)
WHERE w.name = 'DK Copenhagen Warehouse' AND d.email = 'foci1987@work.com'
CREATE (w)-[r:HAS]->(d)
RETURN w,r,d

// WAREHOUSE TO VEHICLES

MATCH (w:Warehouse), (v:Vehicle)
WHERE w.name = 'DK Copenhagen Warehouse' AND v.identifier = 'FGG342'
CREATE (w)-[r:HAS]->(v)
RETURN w,r,v

MATCH (w:Warehouse), (v:Vehicle)
WHERE w.name = 'DK Copenhagen Warehouse' AND v.identifier = 'A114'
CREATE (w)-[r:HAS]->(v)
RETURN w,r,v

MATCH (w:Warehouse), (v:Vehicle)
WHERE w.name = 'DK Copenhagen Warehouse' AND v.identifier = 'FGA188'
CREATE (w)-[r:HAS]->(v)
RETURN w,r,v

// // DRIVERS TO VEHICLES
MATCH (d:Driver), (v:Vehicle)
WHERE d.email = 'hepe412@work.com' AND v.identifier = 'FGA188'
CREATE (d)-[r:TAKES{date:'2022-06-01'}]->(v)
RETURN d,r,v

MATCH (d:Driver), (v:Vehicle)
WHERE d.email = 'foci1987@work.com' AND v.identifier = 'FGG342'
CREATE (d)-[r:TAKES{date:'2022-06-02'}]->(v)
RETURN d,r,v

// // DRIVERS TO ROUTES

MATCH (d:Driver), (ro:Route)
WHERE d.email = 'foci1987@work.com' AND ro.identifier = 'FIUKDKA87IO422'
CREATE (d)-[r:TAKES{date:'2022-06-02'}]->(ro)
RETURN d,r,ro

MATCH (d:Driver), (ro:Route)
WHERE d.email = 'hepe412@work.com' AND ro.identifier = 'FIUKDKA14XY412'
CREATE (d)-[r:TAKES{date:'2022-06-01'}]->(ro)
RETURN d,r,ro

