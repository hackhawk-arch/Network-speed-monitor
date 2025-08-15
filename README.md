---

# 📡 Network Speed Monitor

A Docker-based network speed monitoring system using **Grafana**, **InfluxDB**, and **Speedtest CLI**.
It periodically records your internet speed (download, upload, ping) and visualizes the data on a Grafana dashboard.

---

## 🚀 Features

* Automatic speed tests at set intervals
* Data stored in **InfluxDB**
* Real-time visualization with **Grafana**
* Fully containerized using **Docker Compose**
* Customizable dashboard

---

## 🛠️ Requirements

* Docker & Docker Compose installed
* Git installed

---

## 📂 Project Structure

```
Network-speed-monitor/
│── docker-compose.yml
│── speedtest.sh
│── grafana/
│   └── dashboard.json
│── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/hackhawk-arch/Network-speed-monitor.git
cd Network-speed-monitor
```

### 2️⃣ Start the containers

```bash
docker-compose up -d
```

This will start:

* **InfluxDB** on `localhost:8086`
* **Grafana** on `localhost:3000`

---

## 📊 Configure Grafana

1. Open Grafana → [http://localhost:3000](http://localhost:3000)
   Default login:

   * **User:** `admin`
   * **Password:** `admin`

2. Add **InfluxDB** as a data source:

   * URL: `http://influxdb:8086`
   * Bucket: `network_data`
   * Organization: `your_org`
   * Token: `<your_generated_token>`

3. Import the dashboard:

   * Go to **Dashboards → Import**
   * Upload `grafana/dashboard.json`

---

## 🔄 How it Works

The `speedtest.sh` script runs periodically inside the container, performs a speed test, and sends results to InfluxDB. Grafana reads the data and displays it on the dashboard.

---

## 🛑 Stopping the Service

```bash
docker-compose down
```

---

## 📌 Notes

* You can change test frequency in the `speedtest.sh` script
* Ensure your InfluxDB bucket name matches `"network_data"`
* Use Grafana alerts to get notifications for slow speeds

---

## 📜 License

MIT License

---
