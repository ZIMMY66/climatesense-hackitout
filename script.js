async function upload(){

const file = document.getElementById("fileInput").files[0]

const formData = new FormData()

formData.append("file", file)

await fetch("http://127.0.0.1:5000/upload", {
method: "POST",
body: formData
})

alert("Dataset uploaded successfully")

}


async function loadData(){

const res = await fetch("http://127.0.0.1:5000/data")
const data = await res.json()

console.log("Data received:", data)

const years = data.map(d => d.year)
const temps = data.map(d => d.temperature)

const canvas = document.getElementById("chart")
const ctx = canvas.getContext("2d")

new Chart(ctx, {
type: "line",
data: {
labels: years,
datasets: [{
label: "Temperature",
data: temps,
borderColor: "cyan",
backgroundColor: "rgba(0,255,255,0.2)",
borderWidth: 3
}]
},
options:{
responsive:true,
plugins:{
legend:{
labels:{
color:"white"
}
}
},
scales:{
x:{
ticks:{color:"white"}
},
y:{
ticks:{color:"white"}
}
}
}
})

}


async function detect(){

const res = await fetch("http://127.0.0.1:5000/analyze")
const anomaly = await res.json()

document.getElementById("result").innerHTML = `
<h3>AI Climate Insight</h3>
⚠ Heatwave anomaly detected in year ${anomaly.year}. <br>
Temperature reached ${anomaly.temperature}°C which exceeds historical trend.
`

}