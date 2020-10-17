from flask import Flask, render_template, request, flash, redirect, url_for
import sqlite3
from itertools import groupby

def get_db_connection():
    conn = sqlite3.connect('covid19.db')
    conn.row_factory = sqlite3.Row
    return conn


app = Flask(__name__)
app.secret_key = 'development key'

@app.route('/')
def index():
    conn = get_db_connection()
    results = conn.execute('SELECT submission_date, state, new_case FROM covid19_cases WHERE submission_date > "2020-07-31 00:00:00.000"')
    
    return render_template('new-grid-p3.html', results=results.fetchall())


if __name__ == "__main__":
    app.run(debug=True)