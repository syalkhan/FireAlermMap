# Product Engineer

## Background

In this exercise, we would like you to build a small web application that serves information about forest fire alerts, based on VIIRS active fire data from NASA (seen [here](https://gfw.global/37fHX1F) on Global Forest Watch). You should expect to spend about 3-4 hours on this exercise. We are not looking for a tightly buttoned-up solution - this is, after all, just an exercise - but your code should be well-structured, reasonably commented, and fulfill all of the requirements listed below.

## The Data

You can find a CSV with the raw data for the alerts here: https://s3.amazonaws.com/test-analysis-data/viirs.csv

The dataset includes a number of different attributes:

- `latitude` and `longitude` - the coordinates of where the fire occurred.
- `alert__date` - the date of the alert in `mm/dd/yyyy` format.
- `alert__time` - the time of the alert in `hhmm` format.
- `is__<type>` - a set of boolean attributes indicating whether the fire occurred in a particular type of land area. For example, `is__umd_primary_forest` indicates whether or not the fire occurred in primary forest as defined by the University of Maryland's [primary forest dataset](https://gfw.global/3aExrTv).

For your convenience, we've provided a starter `docker-compose.yml` file that will run a PostgreSQL database instance containing the alert data inside a Docker container. The docker-compose.yml file contains info on the connection parameters for the database.

## Design Requirements

Your application should connect to the provided database, retrieve the VIIRS data, and display it on a map.  It is up to you how you would like to visualize the data; you could follow the example of Global Forest Watch, or visualize the data in a manner of your choosing.

After the basic requirements have been met, please think of an additional feature to add to the application.  This could be a way to interact with the data, such as filtering or grouping the data in some way, or you could add an additional dataset that might be interesting to compare to the active fire dataset, or any other feature you think of.

Implement this feature, and include a brief description of the feature and why it might be useful.

## Technical Requirements

In your implementation, you must:

- Use NodeJS and React for your application.  We recommend using NextJS to setup quickly, and react-map-gl for the mapping functionality, but you can use another preferred approach if desired.
- Include some form of documentation on how to run the app.  You can expand docker-compose.yml so the app can be run simply with `docker-compose up`, but if you take a different approach please document the full process to run your app.

To use the PostgreSQL database, assuming you have Docker installed, simply run `docker-compose up` from this directory. Docker will inject the fire alerts data into a table called `nasa_viirs_fire_alerts` and expose the database at `localhost:5432`. The database has PostGIS installed, and so the table will also include a column named `point` holding the coordinate geometry.

This is just a test problem, so no need to implement authentication, integration test suites, or other production requirements. However, if you move forward to a final round interview, many of the questions we ask will be focused on how you would productionize this application, so please spend time thinking beforehand about the questions below.

# Follow Up Questions

If you continue to the final round interview, we'll go over your solution as a team and ask some additional questions. Please think about the following questions beforehand. Note that these are just representative questions. The particular questions we ask will depend on the details of your solution.

- How would you productionize this application? Specifically, we're interested in what infrastructure choices you'd make and how you would test, deploy, scale, and monitor your solution.
- What if you wanted to make this application resilient to large spikes in traffic? What choices would you make differently?
- Imagine if we wanted to scale the volume of data from thousands to millions of alert points. How would you scale up this application to support that volume of data while maintaining real-time interactivity?

# Submission

Clone this repo and make a pull request with your solution. In your submission, please edit this README and include instructions below on how to set up and run your solution locally. If you use a data store other than the Docker-based PostgreSQL database, remember to include instructions on how to set up and seed that data store with the alert data.

# Your Instructions Below

[ADD INSTRUCTIONS HERE]
