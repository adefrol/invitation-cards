// @ts-nocheck

import React, { SyntheticEvent, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { blob, json } from 'stream/consumers'
import { log } from 'console'
import { saveAs } from 'file-saver'
import axios from 'axios'

function App() {


  const [dateDay, setDateDay] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [group, setGroup] = useState("4ИС-20  4КСК-20")
  const [timeMinute, setTimeMinute] = useState("")
  const [timeHour, setTimeHour] = useState("")
  const [names, setNames] = useState([])

  const json = JSON.stringify(
    {
      group : group,
      time_hour: timeHour,
      time_minutes: timeMinute,
      date_day : dateDay,
      date_month : dateMonth,
      names : { ...names }
    }
  )
  async function fetch() {
    axios.post('http://localhost/image-editor/', json, {
      headers: {
        "Content-Type": 'application/json'
      },
      responseType: 'blob',
    }).then(res => {
      console.log(res)
      saveAs(res.data, "aboba.zip")
    })
  }

  function extractDate(event : SyntheticEvent) {
    const str : string = event.target.value
    var month = str.slice(5, 7);
    if(month == 2) {
      setDateMonth("февраля")
    }
    if(month == 3) {
      setDateMonth("марта")
    }

    setDateDay(str.slice(8,10).replace(/^0+/, ''))
  } 

  function extractTime(event : SyntheticEvent) {
    const str : string = event.target.value
    setTimeHour(str.slice(0,2))
    setTimeMinute(str.slice(3,5))
  }

  function extractNames(event: SyntheticEvent) {
    const str : string = event.target.value
    let array = str.split(", ");
    array = array.map(element => {
      return element.toUpperCase()
    });
    setNames(array)
  }


  return (
    <>
      {/*       <form action='http://localhost/image-editor/' method="POST">
         <button type="submit">emani rot</button>
         <input type="text" name="text" id="text" />
         <input type="hidden" name="text" id="text" value={json} />
      </form> */}
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
              СПИСОК ИМЁН ЧЕРЕЗ ЗАПЯТУЮ!!!
            </label>
            <textarea onChange={(e) => extractNames(e)} class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="ТОЛЬКО ТАК - Иванов Иван, Васильев Василий, Андреев Андрей, Олегов Олег, Алексеев Алексей" />
            <p class="text-red text-xs italic">Please fill out this field.</p>
          </div>
        </div>
       
        <div class="-mx-3 md:flex mb-2">
          
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
               ДЛЯ ГРУПП
            </label>
            <div class="relative">
              <select className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state" onChange={(e) => setGroup(e.target.value)}>
                <option>4ИС-20 4КСК-20</option>
                <option>4ТЭС-20 4ТИТО-20</option>
              </select>
              <div class="pointer-events-none absolute bottom-4 left-[150px] flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
              ДАТА
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="date" onChange={(e) => extractDate(e)} placeholder="90210" />
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
              ВРЕМЯ
            </label>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="time" onChange={(e) => extractTime(e)} placeholder="90210" />
          </div>
        </div>
        <button onClick={() => fetch()}>отправить</button>
      </div>
    </>
  )
}

export default App
