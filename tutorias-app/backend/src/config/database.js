const fs   = require('fs');
const path = require('path');

const DATA_DIR = process.env.NODE_ENV === 'test'
  ? path.join(__dirname, '../../data-test')
  : path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ─── FUNCIONES INTERNAS ─────────────────────────────────────────────────────

function readTable(tabla) {
  const filePath = path.join(DATA_DIR, `${tabla}.json`);
  if (!fs.existsSync(filePath)) return [];
  const contenido = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(contenido);
}
function writeTable(tabla, datos) {
  const filePath = path.join(DATA_DIR, `${tabla}.json`);
  fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), 'utf-8');
}

// ─── API PÚBLICA ─────────────────────────────────────────────────────────────

function findAll(tabla) {
  return readTable(tabla);
}

function findById(tabla, id) {
  const datos = readTable(tabla);
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].id === id) return datos[i];
  }
  return null;
}

function insert(tabla, registro) {
  const datos = readTable(tabla);

  let maxId = 0;
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].id > maxId) maxId = datos[i].id;
  }

  const nuevoRegistro = { id: maxId + 1, ...registro };
  datos.push(nuevoRegistro);
  writeTable(tabla, datos);
  return nuevoRegistro;
}

function update(tabla, id, updates) {
  const datos = readTable(tabla);
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].id === id) {
      datos[i] = { ...datos[i], ...updates };
      writeTable(tabla, datos);
      return datos[i];
    }
  }
  return null;
}

function clear(tabla) {
  writeTable(tabla, []);
}

function remove(tabla, id) {
  const datos = readTable(tabla);
  const nuevos = datos.filter(r => r.id !== id);
  if (nuevos.length === datos.length) return false;
  writeTable(tabla, nuevos);
  return true;
}

module.exports = { findAll, findById, insert, update, clear, remove, writeTable, readTable };
