import { useState } from 'react'
import { format } from 'date-fns'
import api from './services/api'

export const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const dateFormatted = format(new Date(), `eeee MMMM dd yyyy`)

  async function handleSearchLocation() {
    await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric `)
      .then(response => response.json())
      .then(data => {
        if (!data.main) {
          alert(data.message)
          setQuery('')
        } else {
          setWeather(data)
          setQuery('')
          console.log(data)
        }
      })
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'warm'
            : 'cold'
          : 'warm'
      }
    >
      <main className="flex flex-col min-h-screen  p-6">
        {/* SEARCH BAR */}
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            className="rounded appearance-none bg-transparent-500 border-none text-transparent-text w-full p-1 outline-none placeholder:italic placeholder:text-transparent-text duration-300 transition-all focus:scale-[1.02] focus:bg-transparent-300"
            placeholder="Insert City"
            value={query}
            onKeyDown={event =>
              event.key == 'Enter' ? handleSearchLocation() : ''
            }
            onChange={event => setQuery(event.target.value)}
          />
          <button
            onClick={handleSearchLocation}
            className="bg-brand-100 uppercase font-bold rounded px-4 py-2 duration-500 transition hover:bg-brand-"
          >
            Search
          </button>
        </div>
        {/* WEATHER INFO */}
        {typeof weather.sys == 'undefined' ? (
          <div className="flex flex-col mt-20 gap-6">
            <div className="flex flex-col  text-center text-shadow">
              <div className="text-xl font-light italic">{dateFormatted}</div>
            </div>
            <div className="flex flex-col gap-6 items-center text-brand-400 text-shadow">
              <div className="bg-transparent-500 text-[6rem] py-2 px-4 rounded font-extrabold shadow-md shadow-[rgba(0,0,0, 0.2)]">
                <div>
                  --°c
                  <div className="text-lg flex justify-around">
                    <span>MIN: -- °c</span>
                    <span>MAX: -- °c</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-20 gap-6">
            <div className="flex flex-col text-brand-400 text-center text-shadow">
              <div className="text-3xl font-medium">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="text-xl font-light italic">
                {dateFormatted.toLocaleUpperCase()}
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center text-brand-400 text-shadow">
              <div className="bg-transparent-500 text-[6rem] px-4 rounded font-extrabold shadow-md shadow-[rgba(0,0,0, 0.2)]">
                <div className="flex flex-col items-center pb-2">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <span className="leading-none mb-2">
                    {' '}
                    {Math.round(weather.main.temp)}°c
                  </span>
                  <div className="text-lg flex gap-4">
                    <span>MIN: {Math.round(weather.main.temp_min)}°c</span>
                    <span>MAX: {Math.round(weather.main.temp_max)}°c</span>
                  </div>
                </div>
              </div>
              <div className="text-5xl font-bold">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
