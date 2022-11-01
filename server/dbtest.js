const { query } = require('express')
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

// lisää uusi tentti
const lisaaTentti = async (nimi, pvm, voimassa) => {
  try {
    const query = {
      text: 'INSERT INTO tentit (nimi, pvm, voimassa) VALUES ($1, $2, $3)',
      values: [nimi, pvm, voimassa]
    }
    const res = await pool.query(query)
    console.log("added rows", res.rowCount)
  } catch (err) {
    console.log("virhe tentin lisaamisessa", err)
  }
}

//lisaaTentti('Python perusteet', '2020-02-02', false)


// poista tentti id:n perusteella
const poistaTentti = async (id) => {
  try {
    const queryText = 'DELETE FROM tentit WHERE id = $1'
    const res = await pool.query(queryText, [id])
    console.log(res.rowCount)
  } catch (err) {
    console.log("virhe tentin poistamisessa indeksin perusteella", err)
  }
}

//poistaTentti(5)


// muuta tentin nimeä
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

//muutaTentinNimea(2, 'SQL perusteet')


// hae kaikki tentit
const haeTentit = async () => {
  try {
    const res = await pool.query('SELECT * FROM tentit')
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa", err)
  }
}

//haeTentit()

// hae tentti id:n perusteella
const haeTentti = async (id) => {
  try {
    const queryText = 'SELECT * FROM tentit WHERE id = $1'
    const res = await pool.query(queryText, [id])
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tentin hakemisessa", err)
  }
}

//haeTentti(1)


// hae tentit nimen perusteella aakkosjärjestyksessä 
const haeTentitAakkosj = async () => {
  try {
    const res = await pool.query('SELECT * FROM tentit ORDER BY nimi')
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa aakkosjärjestyksessä", err)
  }
}

//haeTentitAakkosj()


// Hae tentit, joiden indeksi on listalla
const haeTentitId = async (idList) => {
  try {
    let str = ''
    for (let i = 1; i <= idList.length; i++) {
      str += ' $' + i + ','
    }
    str = str.trim().slice(0, -1)
    const queryText = 'SELECT * FROM tentit WHERE id IN (' + str + ')'
    console.log(queryText)
    const res = await pool.query(queryText, idList)
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa", err)
  }
}

//haeTentitId([1,2,3])


// Hae tentit, joiden päivämäärä on ennen annettua päivämäärää
const haeTentitEnnenPvm = async (pvm) => {
  try {
     const queryText = 'SELECT * FROM tentit WHERE pvm < $1'
     const res = await pool.query(queryText, [pvm])
     console.log(res.rows)
  } catch (err) {
    console.log(err)
  }
}

//haeTentitEnnenPvm('2022-10-12')


// Hae tentit, jotka ovat voimassa 
const haeTentitVoimassa = async () => {
  try {
    const queryText = 'SELECT * FROM tentit WHERE voimassa = true'
    const res = await pool.query(queryText)
    console.log(res.rows)
  } catch (err) {
    console.log("virhe tenttien hakemisessa", err)
  }
}

//haeTentitVoimassa()
