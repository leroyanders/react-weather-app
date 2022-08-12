import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

function Weather(props: any) {
    const [type, setType] = useLocalStorage("type", "f");
    const location = props.data.locations[Object.keys(props.data.locations)[0]];
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    } as const;
    const date = new Date(location.values[0].datetimeStr).toLocaleDateString("en-US", options)

    function parseDate(date: string){
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        } as const;

        return new Date(date).toLocaleDateString("en-US", options)
    }

    function isToday(date: string) {
        const today = new Date();
        const today_from_steing = new Date(Date.parse(date));
        return today_from_steing.getDate() === today.getDate()
    }

    function switchType(e: any) {
        setType(e.target.getAttribute('data-type'))
    }

    // id	                Weather Conditions
    // snow	                Amount of snow is greater than zero
    // rain	                Amount of rainfall is greater than zero
    // fog	                Visibility is low (lower than one kilometer or mile)
    // wind	                Wind speed is high (greater than 30 kph or mph)
    // cloudy	            Cloud cover is greater than 90% cover
    // partly-cloudy-day	Cloud cover is greater than 20% cover during day time.
    // partly-cloudy-night	Cloud cover is greater than 20% cover during night time.
    // clear-day	        Cloud cover is less than 20% cover during day time
    // clear-night          Cloud cover is less than 20% cover during night time

    function getIcon(state: string, size:number){
        switch(state.toLowerCase()){
            case 'snow':
                return <img className={`mx-auto w-40`} src="/animated/snowy-1.svg" alt="snow"></img>
            case 'rain':
                return <img className={`mx-auto w-40`} src="/animated/rainy-1.svg" alt="rain"></img>
            case 'fog':
                return <img className={`mx-auto w-40`} src="/animated/cloudy.svg" alt="fog"></img>
            case 'wind':
                return <img className={`mx-auto w-40`} src="/animated/weather.svg" alt="wind"></img>
            case 'cloudy':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-day-1.svg" alt="cloud"></img>
            case 'partly-cloudy-day':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-day-1.svg" alt="partly-cloudy-day"></img>
            case 'partly-cloudy-night':
                return <img className={`mx-auto w-40`} src="/animated/cloudy-night-1.svg" alt="partly-cloudy-night"></img>
            case 'clear-day':
                return <img className={`mx-auto w-40`} src="/animated/day.svg" alt="clear-day"></img>
            case 'clear-night':
                return <img className={`mx-auto w-40`} src="/animated/night.svg" alt="clear-night"></img>
        }
    }

    return (
        <div className="weather-geolocation items-center">
            <div className="weather-data text-center mx-auto">
                <div className="weather-country text-center">
                    {getIcon(location.values[0].icon, 50)}
                    {location.address}
                    <p className="text-base mt-2 text-slate-400">{date}</p>
                </div>
                <div className="weather-database mx-auto mt-10 rounded-md text-gray-300 text-xl text-center px-5">
                    <div className="justify-between sm:container sm:mx-auto">
                        <div className="general flex justify-between mb-5">
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />  <line x1="10" y1="9" x2="14" y2="9" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Temp</h1>
                                    <p className="text-slate-400 text-base">
                                        { type === "c" ? ((location.values[0].temp - 32) * 5/9).toFixed(1) : Number.isInteger(location.values[0].temp) ? location.values[0].temp.toString() + '.0' : location.values[0].temp }°
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />  <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />  <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Wind</h1>
                                    <p className="text-slate-400 text-sm">
                                        {location.values[0].wspd}km/h
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M12 3l5 5a7 7 0 1 1 -10 0l5 -5" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Humidity</h1>
                                    <p className="text-slate-400 text-base">
                                        {location.values[0].humidity}%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="more flex justify-between">
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5h10l2 2l-2 2h-10a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />  <path d="M13 13h-7l-2 2l2 2h7a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1" />  <line x1="12" y1="22" x2="12" y2="17" />  <line x1="12" y1="13" x2="12" y2="9" />  <line x1="12" y1="5" x2="12" y2="3" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Wind direction</h1>
                                    <p className="text-slate-400 text-base">
                                        {location.values[0].wdir}
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Cloud Cover</h1>
                                    <p className="text-slate-400 text-base">
                                        {location.values[0].cloudcover}%
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />  <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Precipitation</h1>
                                    <p className="text-slate-400 text-base">
                                        {location.values[0].pop}%
                                    </p>
                                </div>
                            </div>
                            <div className="weather-tab mx-2 px-5 py-2 bg-white rounded-full flex w-full">
                                <div className="icon my-auto w-1/3 absolute mt-2">
                                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />  <rect x="9" y="3" width="6" height="4" rx="2" />  <path d="M9 14l2 2l4 -4" /></svg>
                                </div>
                                <div className="data w-2/3 m-auto">
                                    <h1 className="text-slate-500 text-base truncate">Condition</h1>
                                    <p className="text-slate-400 text-base">
                                        {location.values[0].conditions}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="weather-status mt-10 overflow-x-scroll rounded-2xl">
                <div className="flex justify-between">
                    {   
                        location.values.map((witem: any) => {
                            return (
                                <div className="weather-temperatures mt-0 bg-white p-10 rounded-2xl z-10 mx-2" key={witem.datetimeStr}>
                                    <p className="text-xl mt-0 text-gray-600">
                                        {
                                            isToday(witem.datetimeStr) ? "Today" : parseDate(witem.datetimeStr)
                                        }
                                    </p>
                                    <div className="flex justify-between">
                                        <div className="weather-statement m-auto w-1/3">
                                            {getIcon(witem.icon, 50)}
                                        </div>
                                        <div className="temp text-center m-auto w-2/3">
                                            <h1 className="weather-temp temp-num m-auto align-baseline mt-5 text-gray-600 text-center">
                                                { type === "c" ? ((witem.temp - 32) * 5/9).toFixed(1) : Number.isInteger(witem.temp) ? witem.temp.toString() + '.0' : witem.temp }
                                            </h1>
                                            <p className="text-sm text-gray-400 mt-5 text-bold">
                                                min: { type === "c" ? ((witem.mint - 32) * 5/9).toFixed(1) : Number.isInteger(witem.mint) ? witem.mint.toString() + '.0' : witem.temp } / max: { type === "c" ? ((witem.maxt - 32) * 5/9).toFixed(1) : Number.isInteger(witem.maxt) ? witem.maxt.toString() + '.0' : witem.maxt}
                                            </p>
                                        </div>
                                        <div className="temp-switcher text-gray-600">
                                            <h1 data-toggle className={`weather-temp m-4 ${type === "c" ? "active" : "notactive" } `} data-type="c" onClick={switchType}>°C</h1>
                                            <h1 data-toggle className={`weather-temp m-4 ${type === "f" ? "active" : "notactive" } `} data-type="f" onClick={switchType}>°F</h1>
                                        </div>
                                    </div>
                                    <div className="weather-database mx-auto mt-0 p-5 rounded-md text-gray-300 text-xl">
                                        <div className="flex justify-between">
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Temp</h1>
                                                <p className="text-slate-400 text-base">
                                                    { type === "c" ? ((witem.temp - 32) * 5/9).toFixed(1) : Number.isInteger(witem.temp) ? witem.temp.toString() + '.0' : witem.temp }°
                                                </p>
                                            </div>
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Wind</h1>
                                                <p className="text-slate-400 text-base">
                                                    {witem.wspd}km/h
                                                </p>
                                            </div>
                                            <div className="weather-tab w-1/3">
                                                <h1 className="text-slate-500">Humidity</h1>
                                                <p className="text-slate-400 text-base">
                                                    {witem.humidity}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather;