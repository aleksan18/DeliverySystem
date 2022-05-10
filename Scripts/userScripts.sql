Select host, user from mysql.user;
Create user 'aleksander'@'localhost' identified by 'password';
Grant all on postnord.* to 'aleksander'@'localhost';
Grant create, update on postnord.* to 'aleksander'@'localhost'

