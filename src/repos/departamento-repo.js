const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class DepartamentoRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM departamentos;');
        // result.rows // Thats the data we care about 
        return toCamelCase(rows);
        
    }

    static async findById(id) {
        // WARNING: BIG SECURITY ISSUE!
        const { rows } = await pool.query(`
            SELECT * FROM departamentos WHERE id_dpto = $1 LIMIT 1;
        `, [id]
        );
        
        return toCamelCase(rows)[0];
    }

    static async insert(nombre, ubicacion, presupuesto, poblacion) {
        const { rows } = await pool.query(`
            INSERT INTO departamentos (nombre, ubicacion, presupuesto, poblacion) VALUES ($1, $2, $3, $4) RETURNING *;
        `, [nombre, ubicacion, presupuesto, poblacion]
        );

        return toCamelCase(rows)[0];
    }

    static async update(id, nombre, ubicacion, presupuesto, poblacion) {
        const { rows } = await pool.query(`
            UPDATE departamentos SET nombre = $1, ubicacion = $2, presupuesto = $3, poblacion = $4 WHERE id_dpto = $5 RETURNING *;
        `, [nombre, ubicacion, presupuesto, poblacion, id]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(`
            DELETE FROM departamentos WHERE id_dpto = $1 RETURNING *;
        `, [id]
        );

        return toCamelCase(rows)[0];
    }
}

module.exports = DepartamentoRepo;