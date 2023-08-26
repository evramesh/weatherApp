let themesList = [{
    id: "clear sky",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209409/weather-report-3356_pzaihh.png"
}, {
    id: "few clouds",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/weather-report-3339_yelvlh.png"
},
{
    id: "shower rain",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/weather-report-3353_bjlyow.png"
},
{
    id: 'rain',
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/weather-report-3354_axyvud.png"
},
{
    id: "thunderstorm",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/weather-report-3340_txg7wx.png"
},
{
    id: "snow",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/snowflake-png-28504_bhwql0.png"
},
{
    id: "haze",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691209405/pngwing.com_1_e6vgyo.png"
},
{
    id: "broken clouds",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691210397/pngwing.com_2_ycj3qd.png"
},
{
    id: "scattered clouds",
    png: "https://res.cloudinary.com/dcr2fwzyk/image/upload/v1691210746/cloud_ogkw0y.png"
}
]


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
let userBtn = document.getElementById("findBtn")
let userInput = document.getElementById("userInput")
let Show = document.getElementById("showOut")
let conEl = document.getElementById("content")

conEl.classList.add("nov")

let Tem = document.createElement("h1")
let loca = document.createElement("h1")
let windSpe = document.createElement("p")
let humadity = document.createElement("p")
let condition = document.createElement("p")
let like = document.createElement('p')
let date = document.createElement("p")
let Img = document.createElement("img")
let SubCon = document.createElement("div")


userInput.addEventListener("keypress", function(Event) {
if (Event.key === "Enter") {
    let user1 = {
        locate: userInput.value
    }
    arrangingData(user1)
}
})



function findDate() {
let now = new Date()
let yearOf = (now.getFullYear())
let monthOf = monthNames[(now.getMonth())]
let dayOf = (now.getDate())
date.textContent = `${dayOf}/${monthOf}/${yearOf}`
date.classList.add("clr")
Show.appendChild(date)
}



function modifyData(data) {
conEl.classList.remove("nov")
findDate()
const search = themesList.filter(each => each.id.includes(data.weather[0].description))
const finding = (search.length === 1) ? search : [themesList[8]]
console.log(finding)


loca.textContent = data.name
Tem.textContent = `${(data.main.temp-273.15).toFixed()}°C`
Img.src = finding[0].png
SubCon.appendChild(Tem)
SubCon.appendChild(Img)
condition.textContent = data.weather[0].description
humadity.textContent = `Humidity : ${data.main.humidity}%`
windSpe.textContent = `Wind Speed : ${data.wind.speed}Km/H`
let feels = (data.main.feels_like.toFixed()).slice(0, 2)
like.textContent = `Feels Like : ${feels}°`




loca.classList.add("clr")
SubCon.classList.add("sub-container")
Tem.classList.add("temparature")
condition.classList.add("clr")
humadity.classList.add("clr")
windSpe.classList.add("clr")
like.classList.add("clr")
Img.classList.add("img")

Show.appendChild(loca)
Show.appendChild(SubCon)
Show.appendChild(condition)
Show.appendChild(humadity)
Show.appendChild(windSpe)
Show.appendChild(like)

}

function arrangingData(user) {
let userData;

if (user.locate === "") {
    userData = "Hyderabad"
} else {
    userData = user.locate
}
let optional = {
    method: "GET"
}


let url = `https://api.openweathermap.org/data/2.5/weather?q=${userData}&appid=2777a593dd4cc1e4572b0389d34930b6`;
fetch(url, optional)
    .then(function(response) {
        return response.json()
    })
    .then(function(jsonData) {
        modifyData(jsonData)
    })
}

const user = {
locate: ""
}
arrangingData(user)
userBtn.addEventListener("click", function() {
let user = {
    locate: userInput.value
}
arrangingData(user)


})