
CREATE TABLE IF NOT EXISTS Legislators (
	ID SERIAL NOT NULL PRIMARY KEY,
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
);

CREATE TABLE IF NOT EXISTS Bills (
	ID SERIAL NOT NULL PRIMARY KEY,
	title varchar(1000),
	sunlightid varchar(255),
	created_at varchar(255),
	updated_at varchar(255),
	chamber varchar(255),
	state varchar(255),
	session varchar(255),
	bill_id varchar(255)
);

CREATE TABLE IF NOT EXISTS SunlightLog (
	ID SERIAL NOT NULL PRIMARY KEY,
	dated varchar(255)
);
