const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class MunicipioRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM municipios;');
        // result.rows // Thats the data we care about 
        return toCamelCase(rows);
        
    }

    static async findById(id) {
        // WARNING: BIG SECURITY ISSUE!
        const { rows } = await pool.query(`
            SELECT * FROM municipios WHERE id_mun = $1 LIMIT 1;
        `, [id]
        );
        
        return toCamelCase(rows)[0];
    }

    static async insert(nombre, area, presupuesto, departamento_id, gobernador_id) {
        const { rows } = await pool.query(`
            INSERT INTO municipios (nombre, area, presupuesto, departamento_id, gobernador_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `, [nombre, area, presupuesto, departamento_id, gobernador_id]
        );

        return toCamelCase(rows)[0];
    }

    static async update(id, nombre , area, presupuesto, departamento_id, gobernador_id) {
        const { rows } = await pool.query(`
            UPDATE municipios SET nombre = $1, area = $2, presupuesto = $3, departamento_id = $4, gobernador_id = $5 WHERE id_mun = $6 RETURNING *;
        `, [nombre, area, presupuesto, departamento_id, gobernador_id, id]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(`
            DELETE FROM municipios WHERE id_mun = $1 RETURNING *;
        `, [id]
        );

        return toCamelCase(rows)[0];
    }
}

module.exports = MunicipioRepo;