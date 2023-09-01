const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class PersonaRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM personas;');
        // result.rows // Thats the data we care about 
        return toCamelCase(rows);
        
    }

    static async findById(id) {
        // WARNING: BIG SECURITY ISSUE!
        const { rows } = await pool.query(`
            SELECT * FROM personas WHERE id = $1 LIMIT 1;
        `, [id]
        );
        
        return toCamelCase(rows)[0];
    }

    static async insert(nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia) {
        const { rows } = await pool.query(`
            INSERT INTO personas (nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `, [nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia]
        );

        return toCamelCase(rows)[0];
    }

    static async update(id, nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia) {
        const { rows } = await pool.query(`
            UPDATE personas SET nombre = $1, telefono = $2, edad = $3, sexo = $4, vivienda_id = $5, cabeza_de_familia = $6 WHERE id = $7 RETURNING *;
        `, [nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia, id]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(`
            DELETE FROM personas WHERE id = $1 RETURNING *;
        `, [id]
        );

        return toCamelCase(rows)[0];
    }
}

module.exports = PersonaRepo;