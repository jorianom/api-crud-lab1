const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class ViviendaRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM viviendas;');
        // result.rows // Thats the data we care about 
        return toCamelCase(rows);
        
    }

    static async findById(id) {
        // WARNING: BIG SECURITY ISSUE!
        const { rows } = await pool.query(`
            SELECT * FROM viviendas WHERE id_viv = $1 LIMIT 1;
        `, [id]
        );
        
        return toCamelCase(rows)[0];
    }

    static async insert(direccion, capacidad, niveles, propiertario_id, municipio_id) {
        const { rows } = await pool.query(`
            INSERT INTO viviendas (direccion, capacidad, niveles, propietario_id, municipio_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `, [direccion, capacidad, niveles, propiertario_id, municipio_id]
        );

        return toCamelCase(rows)[0];
    }

    static async update(id, direccion, capacidad, niveles, propietario_id, municipio_id) {
        const { rows } = await pool.query(`
            UPDATE viviendas SET direccion = $1, capacidad = $2, niveles = $3, propiertario_id = $4, municipio_id = $5 WHERE id_viv = $6 RETURNING *;
        `, [direccion, capacidad, niveles, propietario_id, municipio_id, id]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(`
            DELETE FROM viviendas WHERE id_viv = $1 RETURNING *;
        `, [id]
        );

        return toCamelCase(rows)[0];
    }
}

module.exports = ViviendaRepo;