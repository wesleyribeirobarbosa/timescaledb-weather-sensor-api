require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DBNAME}`, {
    dialect: 'postgres',
    protocol: 'postgres'
});

let Conditions = sequelize.define('conditions', {
    time: Sequelize.DATE,
    device_id: Sequelize.STRING,
    temperature: Sequelize.DOUBLE,
    humidity: Sequelize.DOUBLE
});

exports.initDatabase = function() {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

exports.insertRows = async function(allRows) {
    for (const row of allRows) {

        const time = Date.parse(row.time);
        const device_id = row.device_id;
        const temperature = parseFloat(row.temperature);
        const humidity = parseFloat(row.humidity);

        try {
            await Conditions.create({
                time, device_id, temperature, humidity
            });
            console.log(`Inserted item: ${time}`);
        } catch (e) {
            console.log('Error inserting data!', e);
        }
    }
}

exports.getTimeBucket = async function(start,end) {
    try {
        const [results, metadata] = await sequelize.query("SELECT AVG(temperature) FROM conditions");
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.getAVGTemperature = async function() {
    try {
        const [results, metadata] = await sequelize.query("SELECT AVG(temperature) FROM conditions");
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.getAVGHumidity = async function() {
    try {
        const [results, metadata] = await sequelize.query("SELECT AVG(humidity) FROM conditions");
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.setChunkInterval = async function(interval) {
    try {
        const [results, metadata] = await sequelize.query(`SELECT set_chunk_time_interval('conditions', INTERVAL '${interval}')`);
        return `Chunk time interval configured to ${interval}!`;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketAvgTemperature = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, avg(temperature)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketMaxTemperature = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, max(temperature)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketMinTemperature = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, min(temperature)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketAvgHumidity = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, avg(humidity)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketMaxHumidity = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, max(humidity)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.timeBucketMinHumidity = async function(bucket_size) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT time_bucket('${bucket_size}', time) + '${bucket_size}' AS final_bucket_time, min(humidity)
            FROM conditions
            GROUP BY final_bucket_time
            ORDER BY final_bucket_time ASC;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.deviceTemperatureHistogram = async function(nBuckets, minLimit, maxLimit) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT device_id,
            histogram(temperature, ${minLimit}, ${maxLimit}, ${nBuckets})
            FROM conditions
            GROUP BY device_id
            ORDER BY device_id;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}

exports.deviceHumidityHistogram = async function(nBuckets, minLimit, maxLimit) {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT device_id,
            histogram(humidity, ${minLimit}, ${maxLimit}, ${nBuckets})
            FROM conditions
            GROUP BY device_id
            ORDER BY device_id;`);
        return results;
    } catch (e) {
        console.log('Error!', e);
        return e;
    }
}
