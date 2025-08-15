require("dotenv").config();
const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const speedTest = require("speedtest-net");

const influx = new InfluxDB({
  url: "http://influxdb:8086",
  token: process.env.INFLUXDB_TOKEN
});

const writeApi = influx.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET);
writeApi.useDefaultTags({ host: "network-monitor" });

async function runTest() {
  try {
    console.log("Running speed test...");
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    
    const point = new Point("network_speed")
      .floatField("download", result.download.bandwidth / 125000) // Mbps
      .floatField("upload", result.upload.bandwidth / 125000)     // Mbps
      .floatField("ping", result.ping.latency);                   // ms

    writeApi.writePoint(point);
    console.log("Data written:", result.download.bandwidth, result.upload.bandwidth);
  } catch (err) {
    console.error("Speed test error:", err.message);
  }
}

setInterval(runTest, process.env.SPEEDTEST_INTERVAL);
runTest();
