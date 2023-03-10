import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Home() {

  const apiKey = "d07e32b835efee4dfa9537f0fdc33b31"
  const location = "vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    setData(response);
    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((w, i) => {
      console.log(parseInt(w.dt_txt.substr(8,2),10))
      let num = parseInt(w.dt_txt.substr(8,2),10)

      if(num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num)
        console.log("here")
        console.log(response.data.list[i])

        var month = '';
        var icon = '';

        if(w.dt_txt.substr(5,2) == 1) {
          month = 'January';
        } else if (w.dt_txt.substr(5,2) == 2) {
          month = 'February'
        } else if (w.dt_txt.substr(5,2) == 3) {
          month = 'March'
        } else if (w.dt_txt.substr(5,2) == 4) {
          month = 'April'
        } else if (w.dt_txt.substr(5,2) == 5) {
          month = 'May'
        } else if (w.dt_txt.substr(5,2) == 6) {
          month = 'June'
        } else if (w.dt_txt.substr(5,2) == 7) {
          month = 'July'
        } else if (w.dt_txt.substr(5,2) == 8) {
          month = 'August'
        } else if (w.dt_txt.substr(5,2) == 9) {
          month = 'September'
        } else if (w.dt_txt.substr(5,2) == 10) {
          month = 'October'
        } else if (w.dt_txt.substr(5,2) == 11) {
          month = 'November'
        } else if (w.dt_txt.substr(5,2) == 12) {
          month = 'December'
        } 

        if(w.weather[0].main == 'Clouds') {
          icon = '/icons/broken-clouds.svg'
        } else if (w.weather[0].main == 'Clear') {
          icon = '/icons/clear-sky.svg'
        } else if (w.weather[0].main == 'Atmosphere') {
          icon = '/icons/mist.svg'
        } else if (w.weather[0].main == 'Rain') {
          icon = '/icons/shower-rain.svg'
        } else if (w.weather[0].main == 'Snow') {
          icon = '/icons/snow.svg'
        } else if (w.weather[0].main == 'Thunderstorm') {
          icon = '/icons/thunderstorm.svg'
        }

        var now = new Date(w.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var day = days[now.getDay()];

        return (
          <div key={i} className={styles.card}>
            <Image 
              src={icon}
              alt={icon}
              width={180}
              height={180}
              priority
            />
            <h3>{day} {w.dt_txt.substr(8,2)} {month}, {w.dt_txt.substr(0,4)}</h3>
            <p>{w.weather[0].main}</p>
            <p>{w.main.temp.toFixed(1)}??C</p>
            </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }



  useEffect(() => {
    if (!grabWeather.current) {
      fetchWeather();
      grabWeather.current = true;
    }
  }, [data])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  

  return (
    <>
      <Head>
        <title>Weather App: 6 Day Forcast</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div> 
        <p>5 day weather forcast for {location}
        <br />
        Last updated: {date}</p>
        </div>
        <div>
          <a 
            href=''
          >
            By {" "}
            Terrence
          </a>
        </div>
        </div>
        <div className={styles.center}>
          <Image 
            src="/weather-forecast-logo.png"
            alt="Weather Forcast Logo"
            width={300}
            height={100}
            priority
          />

        </div>
        <div className={styles.grid}>
          {data}
          </div>
      </main>
    </>
  )
}
