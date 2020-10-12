CREATE TABLE "States" (
    "2018" int   NOT NULL,
    "2019" int   NOT NULL,
    "GeoFips" int   NOT NULL,
    "state" VARCHAR(20) PRIMARY KEY NOT NULL,
    "LineCode" int   NOT NULL,
    "Description" VARCHAR(50) NOT NULL
);

CREATE TABLE "CovidData" (
    "date" date   NOT NULL,
    "state" VARCHAR(20)   NOT NULL,
    "fips" int   NOT NULL,
    "cases" int   NOT NULL,
    "deaths" int   NOT NULL
);

ALTER TABLE "CovidData" ADD CONSTRAINT "fk_CovidData_state" FOREIGN KEY("state")
REFERENCES "States" ("state");
