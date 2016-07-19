
CREATE TABLE IF NOT EXISTS Legislators (
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	openSecretsID varchar(255),
	sunlightid varchar(255),
	birthday varchar(255),
	gender varchar(255),
	img varchar(255),
	party varchar(255),
	phone varchar(255),
	state varchar(255),
	twitter varchar(255),
	webform varchar(255),
	website varchar(255),
	youtube varchar(255)
)

CREATE TABLE IF NOT EXISTS Bills (
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	sunlightid varchar(255),
	created_at varchar(255),
	updated_at varchar(255),
	chamber varchar(255),
	state varchar(255),
	session varchar(255),
	bill_id varchar(255)
)

