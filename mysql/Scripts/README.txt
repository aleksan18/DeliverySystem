	To install the db to a testing enviroment:
	1.Open the dbmodel in mysqlworkbench
	2.Run forward engineer onto your localhost
	Make sure the following are clicked:
	2.1 Generate insert statements
	2.2 Disable FK checks
	2.3 DROP objects before each create
	2.4 generate drop schema
	2.5 include model attached scripts
	
	3. After open the databases that was created and open the scripts
	4. Execute the scripts starting with the test_data scripts as it holds
	the data for testing.
	5. After run the rest of the scripts in no particular order.
	
	Second way:
	1. Another way is to open the deployment_script and run it
	2. After that the test_data script to populate the db
	3. After run the rest of the scripts in no particular order.