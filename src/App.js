import { useEffect, useState } from 'react';
import style from './App.module.scss';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [clockList, setClockList] = useState([
    {
      city: "NEW YORK",
      timeZone: 'America/New_York',
    },
    {
      city: "LONDON",
      timeZone: 'Europe/London',
    },
    {
      city: "BANGKOK",
      timeZone: 'Asia/Bangkok',
    },
    {
      city: "TAIWAN",
      timeZone: 'Asia/Taipei',
    },
    {
      city: "SYDNEY",
      timeZone: 'Australia/Sydney',
    }
  ]);

  const getDate = (clockData) => {
    const option = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: ''
    }

    const dataList = [];
    Object.values(clockData).forEach(data => {
      const newData = {};
      option.timeZone = data.timeZone;

      // 取得當地時間 e.g., Feb 23, 2022, 05:28 AMs
      const currentDate = new Date().toLocaleString("en-us", option).split(', ');
      const dateArray = currentDate[0].split(' ');
      const time = currentDate[2] ? currentDate[2].substring(0, 5) : '';

      newData.city = data.city;
      newData.timeZone = data.timeZone;
      newData.date = `${dateArray[1]} ${dateArray[0]}. ${currentDate[1]}`;
      newData.time = `${time}`;
      dataList.push(newData);
    })

    setClockList(dataList);
  }

  /**
   * 確認背景與文字顏色
   * @param {*} clock 單一時區資料
   * @returns 是否為黑色背景
   */
  const isBlackBeground = (clock) => {
    return clock === clockList.newYork || clock === clockList.sydney;
  }


  useEffect(() => {
    setInterval((() => getDate(clockList)), 1000);
  }, []);

  return (
    <div className={style.App}>
      <div className={style.container}>
        <div className={style.title}>
          WORLD CLOCK
        </div>
        {
          Object.values(clockList)
            .map(clock =>
              <div
                key={uuidv4()}
                className={isBlackBeground(clock)
                  ? style.blackBackground
                  : style.whiteBackground} >
                <div className={style.date}>
                  {clock.city}
                  <p>{clock.date}</p>
                </div>
                <div className={style.time}>
                  {clock.time}
                </div>
              </div>
            )
        }
      </div>
    </div >
  );
}

export default App;
