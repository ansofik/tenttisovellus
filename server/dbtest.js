const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

/* lisää uusi tentti */
const lisaaTentti = async () => {
  try {
    const query = "INSERT INTO tentit (nimi, pvm) VALUES ('Python perusteet', '2020-02-02'), ('C perusteet', '2021-01-01')"
    const res = await pool.query(query)
    console.log("added rows", res.rowCount)
  } catch (err) {
    console.log("virhe tentin lisaamisessa", err)
  }
}

/* lisaaTentti() */


/* poista tentti id:n perusteella */
const poistaTentti = async (id) => {
  try {
    const query = {
      text: 'DELETE FROM tentit WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(query)
    console.log(res.rowCount)
  } catch (err) {
    console.log("virhe tentin poistamisessa", err)
  }
}

/* poistaTentti(5) */


/* muuta tentin nimeä */
const muutaTentinNimea = async (id, uusiNimi) => {
  try {
    const query = {
      text: 'UPDATE tentit SET nimi = $1 WHERE id = $2',
      values: [uusiNimi, id]
    }
    const res = await pool.query(query)
    console.log(res.rowCount)
  } catch (err) {
    console.log("virhe tentin nimen muuttamisessa", err)
  }
}

/* muutaTentinNimea(2, 'SQL perusteet') */


/* hae kaikki tentit */
const haeTentit = async () => {
  try {
    const res = await pool.query('SELECT * FROM tentit')
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa", err)
  }
}

/* haeTentit() */


/* hae tentti id:n perusteella */
const haeTentti = async (id) => {
  try {
    const query = {
      text: 'SELECT * FROM tentit WHERE id = $1',
      values: [id]
    }
    const res = await pool.query(query)
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tentin hakemisessa", err)
  }
}

/* haeTentti(1) */


/* hae tentit nimen perusteella aakkosjärjestyksessä */
const haeTentitAakkosj = async () => {
  try {
    const res = await pool.query('SELECT * FROM tentit ORDER BY nimi')
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa aakkosjärjestyksessä", err)
  }
}

/* haeTentitAakkosj() */

