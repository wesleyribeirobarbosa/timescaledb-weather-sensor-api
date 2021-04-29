const Service = require('../service/service');

module.exports = (app) => {
    app.post('/api/import-dataset', async (req, res) => {
        res.send(await Service.importDataset(req.body));
    });

    app.post('/api/set-chunk-interval', async (req, res) => {
        res.send(await Service.setChunkInterval(req.body));
    });

    app.get('/api/average-temperature', async (req, res) => {
        res.send(await Service.getAVGTemperature());
    })

    app.get('/api/average-humidity', async (req, res) => {
        res.send(await Service.getAVGTemperature());
    })

    app.post('/api/time-bucket-avg-temperature', async (req, res) => {
        res.send(await Service.timeBucketAvgTemperature(req.body));
    })

    app.post('/api/time-bucket-max-temperature', async (req, res) => {
        res.send(await Service.timeBucketMaxTemperature(req.body));
    })

    app.post('/api/time-bucket-min-temperature', async (req, res) => {
        res.send(await Service.timeBucketMinTemperature(req.body));
    })

    app.post('/api/time-bucket-avg-humidity', async (req, res) => {
        res.send(await Service.timeBucketAvgHumidity(req.body));
    })

    app.post('/api/time-bucket-max-humidity', async (req, res) => {
        res.send(await Service.timeBucketMaxHumidity(req.body));
    })

    app.post('/api/time-bucket-min-humidity', async (req, res) => {
        res.send(await Service.timeBucketMinHumidity(req.body));
    })

    app.post('/api/temperature-histogram', async (req, res) => {
        res.send(await Service.deviceTemperatureHistogram(req.body));
    })

    app.post('/api/humidity-histogram', async (req, res) => {
        res.send(await Service.deviceHumidityHistogram(req.body));
    })
}
