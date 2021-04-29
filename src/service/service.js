const csv = require('csv-parser')
const fs = require('fs')
const Database = require('../repository/database');
const results = [];

exports.importDataset = function({path}) {
    fs.createReadStream(path)
        .pipe(csv(['time','device_id','temperature','humidity']))
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            Database.insertRows(results);
        });
    return "Importing started!";
}

exports.getAVGTemperature = function() {
    return Database.getAVGTemperature();
}

exports.getAVGHumidity = function() {
    return Database.getAVGHumidity();
}

exports.setChunkInterval = function({interval}) {
    return Database.setChunkInterval(interval);
}

exports.timeBucketAvgTemperature = function({bucket_size}){
    return Database.timeBucketAvgTemperature(bucket_size);
}

exports.timeBucketMaxTemperature = function({bucket_size}){
    return Database.timeBucketMaxTemperature(bucket_size);
}

exports.timeBucketMinTemperature = function({bucket_size}){
    return Database.timeBucketMinTemperature(bucket_size);
}

exports.timeBucketAvgHumidity = function({bucket_size}){
    return Database.timeBucketAvgHumidity(bucket_size);
}

exports.timeBucketMaxHumidity = function({bucket_size}){
    return Database.timeBucketMaxHumidity(bucket_size);
}

exports.timeBucketMinHumidity = function({bucket_size}){
    return Database.timeBucketMinHumidity(bucket_size);
}

exports.deviceTemperatureHistogram = function({nBuckets, minLimit, maxLimit}){
    return Database.deviceTemperatureHistogram(nBuckets, minLimit, maxLimit);
}

exports.deviceHumidityHistogram = function({nBuckets, minLimit, maxLimit}){
    return Database.deviceHumidityHistogram(nBuckets, minLimit, maxLimit);
}