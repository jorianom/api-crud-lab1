/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE personas (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(45) NOT NULL,
            telefono INT,
            edad INT,
            sexo VARCHAR(45),
            vivienda_id INT, 
            cabeza_de_familia INT REFERENCES personas(id)
        );

        CREATE TABLE viviendas (
            id_viv SERIAL PRIMARY KEY,
            direccion VARCHAR(45),
            capacidad INT,
            niveles INT,
            propietario_id INT,
            municipio_id INT
        );

        CREATE TABLE municipios (
            id_mun SERIAL PRIMARY KEY,
            nombre VARCHAR(45) NOT NULL,
            area INT,
            presupuesto INT,
            departamento_id INT,
            gobernador_id INT
        );

        CREATE TABLE departamentos (
            id_dpto SERIAL PRIMARY KEY,
            nombre VARCHAR(45) NOT NULL,
            area INT,
            presupuesto INT,
            poblacion INT
        );

        ALTER TABLE personas
        ADD CONSTRAINT fk_vivienda_id
        FOREIGN KEY (vivienda_id) REFERENCES viviendas (id_viv);

        ALTER TABLE viviendas
        ADD CONSTRAINT fk_propietario_id
        FOREIGN KEY (propietario_id) REFERENCES personas (id);

        ALTER TABLE viviendas
        ADD CONSTRAINT fk_municipio_id
        FOREIGN KEY (municipio_id) REFERENCES municipios (id_mun);

        ALTER TABLE municipios
        ADD CONSTRAINT fk_departamento_id
        FOREIGN KEY (departamento_id) REFERENCES departamentos (id_dpto);

        ALTER TABLE municipios
        ADD CONSTRAINT fk_gobernador_id
        FOREIGN KEY (gobernador_id) REFERENCES personas (id);

    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE personas;
        DROP TABLE departamentos;
        DROP TABLE viviendas;
        DROP TABLE municipios;
    `);
};
