
CREATE TABLE IF NOT EXISTS Legislators (
	ID SERIAL NOT NULL PRIMARY KEY,
	openSecretsID varchar(255),
	sunlightid varchar(255),
	birthday varchar(255),
	gender varchar(1),
	chamber varchar(255),
	img varchar(255),
	name varchar(255),
	party varchar(255),
	phone varchar(255),
	state varchar(2),
	twitter varchar(255),
	webform varchar(255),
	website varchar(255),
	youtube varchar(255)
);

CREATE TABLE IF NOT EXISTS Bills (
	ID SERIAL NOT NULL PRIMARY KEY,
	title varchar(2000),
	sunlightid varchar(255),
	created_at varchar(255),
	updated_at varchar(255),
	chamber varchar(255),
	state varchar(2),
	session varchar(255),
	bill_id varchar(255)
);

CREATE TABLE IF NOT EXISTS SunlightLog (
	ID SERIAL NOT NULL PRIMARY KEY,
	dated varchar(255)
);

CREATE TABLE IF NOT EXISTS Votes (
	ID SERIAL NOT NULL PRIMARY KEY,
	legID SERIAL references Legislators(ID),
	billID SERIAL references Bills(ID),
	vote boolean
)