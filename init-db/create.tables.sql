CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Vehicles (
	uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	rendszam VARCHAR(20) NOT NULL,
	tulajdonos VARCHAR(200) NOT NULL,
	forgalmi_ervenyes VARCHAR(10) NOT NULL,
	adatok TEXT[] NOT NULL	
);

CREATE INDEX idx_vehicles_rendszam ON Vehicles(rendszam);
CREATE INDEX idx_vehicles_tulajdonos ON Vehicles(tulajdonos);