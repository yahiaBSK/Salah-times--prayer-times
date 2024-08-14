import { useEffect, useRef, useState } from 'react';
import './MainStyle.css'
import SalahCard from './Salah card/SalahCard.jsx'
import fajr from '../assets/fajr.jpg'
import dhuhr from '../assets/dhuhr.jpg'
import asr from '../assets/asr.jpg'
import maghrib from '../assets/maghrib.jpg'
import isha from '../assets/isha.jpg'

function MainPage(){

  const [miladiDate, setMiladiDate] = useState("NULL");
  const [hijriDate, setHijriDate] = useState("NULL");
  const [time, setTime] = useState("00:00:00");
  const [salahTime, setSalahTime] = useState({Fajr: "00:00", Dhuhr: "00:00", Asr: "00:00", Maghrib: "00:00", Isha: "00:00"})
  const [remainingTime, setRemainingTime] = useState({Fajr: "00:00:00", Dhuhr: "00:00:00", Asr:"00:00:00", Maghrib:"00:00:00", Isha:"00:00:00"})
  const [color, setColor] = useState({Fajr: "white", Dhuhr: "white", Asr:"white", Maghrib:"white", Isha:"white"})
  const intervalId = useRef(null)
  const intervalId2 = useRef(null)
  const [data2, setData2] = useState([]);
  const selectedInfo = useRef({country: "", city: ""})

  useEffect(() => {
    getHijriDate();
    getMiladiDate();
    intervalId.current = setInterval(() => {
      getTime();
    }, 1000);
    getTimingByAPI();
    getCountriesFromAPI();
    return () => clearInterval(intervalId.current);
  }, []);
  
  useEffect(()=>{
    
    intervalId2.current = setInterval(() => {
      calcRemainingTime();
    }, 1000);
    setColorWarning();
    return () => clearInterval(intervalId2.current);
  }, [salahTime, remainingTime])

  useEffect(()=>{
    getCountries();
  }, [data2])


  const formatCalendar = {
      hijriFormat: "ar-DZ-u-ca-islamic",
      miladiFormat: "ar-DZ",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }

    function getHijriDate() {
      let date = new Intl.DateTimeFormat(formatCalendar.hijriFormat,formatCalendar).format(Date.now())
      return setHijriDate(date)
    }

    function getMiladiDate() {
      let date = new Intl.DateTimeFormat(formatCalendar.miladiFormat,formatCalendar).format(Date.now())
      return setMiladiDate(date)
    }

    function getTime(){
      let date = new Date()
      return setTime(time => time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
    }

    function getTimingByAPI(country, city){
      fetch(`https://api.aladhan.com/v1/timingsByCity/13-08-2024?city=${city}&country=${country}&method=3`)
      .then(Response => Response.json())
      .then(data => {
        let data2 = data.data.timings
        setSalahTime({Fajr: data2.Fajr, Dhuhr: data2.Dhuhr, Asr: data2.Asr, Maghrib: data2.Maghrib, Isha: data2.Isha})
      })
      .catch(err=> { 
        console.log(err)
      })
    }

    function calcRemainingTime(){
      function calcSteps(salah){
        let remainingHrs = ((salahTime[salah].slice(0,2)) - (new Date().getHours()))
        if (remainingHrs == "00") {
          remainingHrs = 23
        }
        let remainingMin = ((salahTime[salah].slice(3,5)) - (new Date().getMinutes()))
        let remainingSec = (60-(new Date().getSeconds()));
        if (remainingSec==60) {
          remainingSec = 0
        }
        let hrsPadding="", minPadding ="", secPadding=""

        if (remainingHrs < 0 && remainingMin < 0) {
          if (23+remainingHrs < 10) {
            hrsPadding = "0"
          }
          if (60+remainingMin < 10) {
            minPadding = "0"
          }
          if ((remainingSec) < 10) {
            secPadding = "0"
          }
          return `${hrsPadding}${23+remainingHrs}:${minPadding}${60+remainingMin}:${secPadding}${remainingSec}`
        }

        if (remainingHrs < 0 && remainingMin >= 0) {
          if (23+remainingHrs < 10) {
            hrsPadding = "0"
          }
          if (remainingMin < 10) {
            minPadding = "0"
          }
          if ((remainingSec) < 10) {
            secPadding = "0"
          }
          return `${hrsPadding}${23+remainingHrs}:${minPadding}${remainingMin}:${secPadding}${remainingSec}`
        }

        if (remainingHrs >= 0 && remainingMin < 0) {
          if (remainingHrs < 10) {
            hrsPadding = "0"
          }
          if (60+remainingMin < 10) {
            minPadding = "0"
          }
          if ((remainingSec) < 10) {
            secPadding = "0"
          }
          return `${hrsPadding}${remainingHrs-1}:${minPadding}${60+remainingMin}:${secPadding}${remainingSec}`
        }

        if (remainingHrs >= 0 && remainingMin >= 0) {
          if (remainingHrs < 10) {
            hrsPadding = "0"
          }
          if (remainingMin < 10) {
            minPadding = "0"
          }
          if ((remainingSec) < 10) {
            secPadding = "0"
          }
          return `${hrsPadding}${remainingHrs-1}:${minPadding}${remainingMin}:${secPadding}${remainingSec}`
        }

        else{
          return "ERROR CALC TIME !"
        }
      }

      setRemainingTime(rT => ({...rT,
        Fajr: calcSteps("Fajr"),
        Dhuhr: calcSteps("Dhuhr"),
        Asr: calcSteps("Asr"),
        Maghrib: calcSteps("Maghrib"),
        Isha: calcSteps("Isha")
      }))
    }

    function setColorWarning() {
      let salahArr = [
        { salahName: "Fajr", salahtime: remainingTime.Fajr.slice(0,2) },
        { salahName: "Dhuhr", salahtime: remainingTime.Dhuhr.slice(0,2) },
        { salahName: "Maghrib", salahtime: remainingTime.Maghrib.slice(0,2) },
        { salahName: "Asr", salahtime: remainingTime.Asr.slice(0,2) },
        { salahName: "Isha", salahtime: remainingTime.Isha.slice(0,2) }
      ]
      let salahArrMin = salahArr.reduce((intialValue, currentValue)=>{
        if(intialValue.salahtime<currentValue.salahtime){return intialValue}
        else{return currentValue}
      })
      setColor({[salahArrMin.salahName]: "#bd3131"})
    }
    
    function getCountriesFromAPI() {
      fetch(`https://countriesnow.space/api/v0.1/countries`)
      .then(Response => Response.json())
      .then(data => {
        let tempData = []
        for (let i = 0; i < data.data.length; i++) {
          let countriesAndCities = {
            name: data.data[i].country,
            cities: data.data[i].cities
          }
          tempData.push(countriesAndCities)
        }
        setData2(tempData)
      })
    }

    function getCountries() {
      let selectCountyElm = document.querySelector("#selectCountry")
      let selectCityElm = document.querySelector("#selectCity")
      for (let j = 0; j < data2.length; j++) {
        selectCountyElm.innerHTML += `<option value="${data2[j].name}">${data2[j].name}</option>`
      }
    }

    function getCities(event){
      let selectedValue = event.target.value
      selectedInfo.current.country = selectedValue
      let valueIndex = data2.findIndex((c)=>c.name === selectedValue)
      let selectCityElm = document.querySelector("#selectCity")
      selectCityElm.innerHTML = `<option value="city">city</option>`
      for (let d = 0; d < data2[valueIndex].cities.length; d++) {
        selectCityElm.innerHTML += `<option value="${data2[valueIndex].cities[d]}">${data2[valueIndex].cities[d]}</option>`
      }
    }
    function updateSalahTime(event){
      let selectedCity = event.target.value
      selectedInfo.current.city = selectedCity
      getTimingByAPI(selectedInfo.current.country, selectedInfo.current.city)
    }
  return(
    <>
    <div className='mainDiv'>
      <div className='titlesDiv'>
        <div className='rightDiv'>
          <p>{hijriDate}</p>
          <p>{miladiDate}</p>
        </div>
        <div className='centerDiv'>
          <p>مواقيت الصلاة</p>
          <p>{time}</p>
        </div>
        <div className='leftDiv selectLocationDiv'>
          <select name="" id="selectCountry"  onChange={getCities}>
            <option value="country">--country--</option>
            {/* Comes from selectCountry() */}
          </select>
          <select name="" id="selectCity" onChange={updateSalahTime}>
          <option value="city">--city--</option>
            {/* Comes from selectCountry() */}
          </select>
        </div>
      </div>
      <div className='salahCardsDiv'>
        <SalahCard image={fajr} salahName="الفجر" salahTime={salahTime.Fajr} remainingTime={remainingTime.Fajr} color={color.Fajr}/>
        <SalahCard image={dhuhr} salahName="الظهر" salahTime={salahTime.Dhuhr} remainingTime={remainingTime.Dhuhr} color={color.Dhuhr}/>
        <SalahCard image={asr} salahName="العصر" salahTime={salahTime.Asr} remainingTime={remainingTime.Asr} color={color.Asr}/>
        <SalahCard image={maghrib} salahName="المغرب" salahTime={salahTime.Maghrib} remainingTime={remainingTime.Maghrib} color={color.Maghrib}/>
        <SalahCard image={isha} salahName="العشاء" salahTime={salahTime.Isha} remainingTime={remainingTime.Isha} color={color.Isha}/>
      </div>
    </div>
    </>
  )
}
export default MainPage