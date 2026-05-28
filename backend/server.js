const express = require('express');

const cors = require('cors');

const { Pool } = require('pg');

const app = express();

app.use(cors());

app.use(express.json());

const pool = new Pool({
  user: 'postgres',

  host: 'localhost',

  database: 'essalud_capacitacion',

  password: 'Postgres2026!',

  port: 5432,
});

/* =========================================
   OBTENER TRABAJADORES
========================================= */

app.get('/trabajadores', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM trabajadores ORDER BY id ASC');

    res.json(resultado.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Error al obtener trabajadores',
    });
  }
});

/* =========================================
   AGREGAR NUEVO TRABAJADOR
========================================= */

app.post('/trabajadores', async (req, res) => {
  const { nombre, curso, estado } = req.body;

  try {
    const resultado = await pool.query(
      `
      INSERT INTO trabajadores(nombre, curso, estado)

      VALUES($1, $2, $3)

      RETURNING *
      `,

      [nombre, curso, estado],
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Error al insertar trabajador',
    });
  }
});

/* =========================================
   EDITAR TRABAJADOR
========================================= */

app.put('/trabajadores/:id', async (req, res) => {
  const { id } = req.params;

  const { nombre, curso, estado } = req.body;

  try {
    const resultado = await pool.query(
      `
      UPDATE trabajadores

      SET nombre = $1,
          curso = $2,
          estado = $3

      WHERE id = $4

      RETURNING *
      `,

      [nombre, curso, estado, id],
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Error al editar trabajador',
    });
  }
});

/* =========================================
   SERVIDOR
========================================= */

app.listen(3000, () => {
  console.log('Servidor funcionando en puerto 3000');
});
