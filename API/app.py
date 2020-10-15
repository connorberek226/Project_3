# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import datetime as dt


# %%
engine = create_engine("sqlite:///covid19.sqlite")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Covid = Base.classes.df
session = Session(engine)


# %%
# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def welcome():
    return (
        f"Welcome to the sqlalchemy API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/[start_date format:yyyy-mm-dd]<br/>"
        f"/api/v1.0/[start_date format:yyyy-mm-dd]/[end_date format:yyyy-mm-dd]<br/>"
    )


# %%
@app.route("/api/v1.0/precipitation")
def precipitation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all Precipitation Data"""
    # Query all Precipitation
    results = session.query(Measurement.date,Measurement.prcp).                order_by(Measurement.date).all()

    session.close()


    # Convert list of tuples into normal list
    all_precipitation = list(np.ravel(results))
    
    # Convert the list to Dictionary
    all_precipitation = {all_precipitation[i]: all_precipitation[i + 1] for i in range(0, len(all_precipitation), 2)} 

    return jsonify(all_precipitation)


# %%
@app.route("/api/v1.0/stations")
def stations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all Stations"""
    # Query all Stations
    results = session.query(Station.station).                 order_by(Station.station).all()

    session.close()

    # Convert list of tuples into normal list
    all_stations = list(np.ravel(results))

    return jsonify(all_stations)


# %%
@app.route("/api/v1.0/tobs")
def tobs():
     # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all TOBs"""
    # Query all tobs

    results = session.query(Measurement.date,  Measurement.tobs).                filter(Measurement.date >= '2016-08-23').                    order_by(Measurement.date).all()

    session.close()

    # Convert list of tuples into normal list
    all_tobs = list(np.ravel(results))

    # Convert the list to Dictionary
    all_tobs = {all_tobs[i]: all_tobs[i + 1] for i in range(0, len(all_tobs), 2)} 


# %%

@app.route("/api/v1.0/temp/<start>")
def data_start_date(start_date):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of min, avg and max tobs for an specific start date"""
    # Query all tobs

    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).                filter(Measurement.date >= start_date).all()

    session.close()

    # Alternative 1
    # Convert list of tuples into normal list
    # start_date_tobs = list(np.ravel(results))
    
    # Create a dictionary from the row data and append to a list of start_date_tobs
    start_date_tobs = []
    for min, avg, max in results:
        start_date_tobs_dict = {}
        start_date_tobs_dict["min_temp"] = min
        start_date_tobs_dict["avg_temp"] = avg
        start_date_tobs_dict["max_temp"] = max
        start_date_tobs.append(start_date_tobs_dict) 
    
    
    
    return jsonify(start_date_tobs)


# %%
@app.route("/api/v1.0/temp/<start>/<end>")
def data_start_end_date(start_date, end_date):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of min, avg and max tobs for an specific start and end dates"""
    # Query all tobs

    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).                filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()

    session.close()

    # Alternative 1
    # Convert list of tuples into normal list
    # start_end_date_tobs = list(np.ravel(results))
    
    # Create a dictionary from the row data and append to a list of start_end_date_tobs
    start_end_date_tobs = []
    for min, avg, max in results:
        start_end_date_tobs_dict = {}
        start_end_date_tobs_dict["min_temp"] = min
        start_end_date_tobs_dict["avg_temp"] = avg
        start_end_date_tobs_dict["max_temp"] = max
        start_end_date_tobs.append(start_end_date_tobs_dict) 
    

    return jsonify(start_end_date_tobs)


# %%
if __name__ == '__main__':
    app.run(debug=True)


# %%



