/*
Created: 17/02/2020
Modified: 17/02/2020
Model: PostgreSQL 10
Database: PostgreSQL 10
*/


-- Create tables section -------------------------------------------------

-- Table asignaturas

CREATE TABLE "asignaturas"(
 "asig_id" Serial NOT NULL,
 "asig_codigo_port" Text NOT NULL,
 "asig_nombre" Text NOT NULL,
 "sem_id" Integer
)
WITH (
 autovacuum_enabled=true)
;

-- Create indexes for table asignaturas

CREATE INDEX "fk_sem_asig" ON "asignaturas" ("sem_id")
;

-- Add keys for table asignaturas

ALTER TABLE "asignaturas" ADD CONSTRAINT "PK_asignaturas" PRIMARY KEY ("asig_id")
;

ALTER TABLE "asignaturas" ADD CONSTRAINT "asig_port_cod" UNIQUE ("asig_codigo_port")
;

-- Table semestre

CREATE TABLE "semestre"(
 "sem_id" Serial NOT NULL,
 "sem_nombre" Text NOT NULL,
 "sem_par_nombre" Character varying(1) NOT NULL,
 "car_id" Integer,
 "per_id" Integer
)
WITH (
 autovacuum_enabled=true)
;

-- Create indexes for table semestre

CREATE INDEX "fk_car_sem" ON "semestre" ("car_id")
;

CREATE INDEX "fk_per_sem" ON "semestre" ("per_id")
;

-- Add keys for table semestre

ALTER TABLE "semestre" ADD CONSTRAINT "PK_semestre" PRIMARY KEY ("sem_id")
;

-- Table det_persona_asignaturas

CREATE TABLE "det_persona_asignaturas"(
 "det_per_asig_id" Serial NOT NULL,
 "per_id" Integer NOT NULL,
 "asig_id" Integer NOT NULL
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table det_persona_asignaturas

ALTER TABLE "det_persona_asignaturas" ADD CONSTRAINT "PK_det_persona_asignaturas" PRIMARY KEY ("per_id","asig_id","det_per_asig_id")
;

-- Table persona

CREATE TABLE "persona"(
 "per_id" Serial NOT NULL,
 "per_cedula" Character varying(10) NOT NULL,
 "per_nombres" Text NOT NULL,
 "per_apellidos" Text NOT NULL,
 "per_correo" Text NOT NULL,
 "per_contraseña" Text NOT NULL,
 "per_tipo" Text NOT NULL,
 "per_titulo" Text
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table persona

ALTER TABLE "persona" ADD CONSTRAINT "PK_persona" PRIMARY KEY ("per_id")
;

ALTER TABLE "persona" ADD CONSTRAINT "per_cedula" UNIQUE ("per_cedula")
;

ALTER TABLE "persona" ADD CONSTRAINT "per_correo" UNIQUE ("per_correo")
;

-- Table facultades

CREATE TABLE "facultades"(
 "fac_id" Serial NOT NULL,
 "fac_nombre" Text NOT NULL,
 "fac_abreviatura" Text NOT NULL
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table facultades

ALTER TABLE "facultades" ADD CONSTRAINT "PK_facultades" PRIMARY KEY ("fac_id")
;

-- Table carreras

CREATE TABLE "carreras"(
 "car_id" Serial NOT NULL,
 "car_nombre" Text NOT NULL,
 "fac_id" Integer
)
WITH (
 autovacuum_enabled=true)
;

-- Create indexes for table carreras

CREATE INDEX "fk_fac_car" ON "carreras" ("fac_id")
;

-- Add keys for table carreras

ALTER TABLE "carreras" ADD CONSTRAINT "PK_carreras" PRIMARY KEY ("car_id")
;

-- Table periodo

CREATE TABLE "periodo"(
 "peri_id" Serial NOT NULL,
 "peri_nombre" Text NOT NULL,
 "peri_fecha_inicio" Date NOT NULL,
 "peri_fecha_fin" Date NOT NULL
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table periodo

ALTER TABLE "periodo" ADD CONSTRAINT "PK_periodo" PRIMARY KEY ("peri_id")
;

-- Table horarios

CREATE TABLE "horarios"(
 "hor_id" Serial NOT NULL,
 "hor_dia" Text NOT NULL,
 "hor_fecha_ini" Date NOT NULL,
 "hor_fecha_fin" Date NOT NULL,
 "asig_id" Integer
)
WITH (
 autovacuum_enabled=true)
;

-- Create indexes for table horarios

CREATE INDEX "fk_asig_hor" ON "horarios" ("asig_id")
;

-- Add keys for table horarios

ALTER TABLE "horarios" ADD CONSTRAINT "PK_horarios" PRIMARY KEY ("hor_id")
;
-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE "horarios" ADD CONSTRAINT "fk_asig_hor" FOREIGN KEY ("asig_id") REFERENCES "asignaturas" ("asig_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "semestre" ADD CONSTRAINT "fk_per_sem" FOREIGN KEY ("per_id") REFERENCES "periodo" ("peri_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "det_persona_asignaturas" ADD CONSTRAINT "fk_asig_det_per" FOREIGN KEY ("asig_id") REFERENCES "asignaturas" ("asig_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "semestre" ADD CONSTRAINT "fk_car_sem" FOREIGN KEY ("car_id") REFERENCES "carreras" ("car_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "asignaturas" ADD CONSTRAINT "fk_sem_asig" FOREIGN KEY ("sem_id") REFERENCES "semestre" ("sem_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "det_persona_asignaturas" ADD CONSTRAINT "fk_per_det_asig" FOREIGN KEY ("per_id") REFERENCES "persona" ("per_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "carreras" ADD CONSTRAINT "fk_fac_car" FOREIGN KEY ("fac_id") REFERENCES "facultades" ("fac_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;
