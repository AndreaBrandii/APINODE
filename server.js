const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Andrea',
  password: 'SQLPassword',
  database: 'palabras'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para insertar una palabra
app.post('/palabras', (req, res) => {
  const { palabra } = req.body;
  const query = 'INSERT INTO palabras_table (palabra) VALUES (?)';

  db.query(query, [palabra], (err, result) => {
    if (err) {
      console.error('Error al insertar la palabra:', err);
      return res.status(500).send('Error al insertar la palabra');
    }

    res.status(200).send('Palabra insertada correctamente');
  });
});


// Ruta para obtener todas las palabras
app.get('/palabras', (req, res) => {
  const query = 'SELECT * FROM palabras_table';

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para modificar una palabra por su ID
app.put('/palabras/:id', (req, res) => {
  const { id } = req.params;
  const { palabra } = req.body;
  const query = 'UPDATE palabras_table SET palabra = ? WHERE id = ?';

  db.query(query, [palabra, id], (err, result) => {
    if (err) throw err;
    res.send('Palabra modificada correctamente');
  });
});

// Ruta para eliminar una palabra por su ID
app.delete('/palabras/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM palabras_table WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Palabra eliminada correctamente');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
