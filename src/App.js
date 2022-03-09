import { useEffect, useState } from 'react';
import style from './App.module.scss';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [clockList, setClockList] = useState({
    newYork: {
      city: "NEW YORK",
      timeZone: 'America/New_York',
      date: '',
      time: ''
    },
    london: {
      city: "LONDON",
      timeZone: 'Europe/London',
      date: '',
      time: ''
    },
    bangkok: {
      city: "BANGKOK",
      timeZone: 'Asia/Bangkok',
      date: '',
      time: ''
    },
    taiwan: {
      city: "TAIWAN",
      timeZone: 'Asia/Taipei',
      date: '',
      time: ''
    },
    sydney: {
      city: "SYDNEY",
      timeZone: 'Australia/Sydney',
      date: '',
      time: ''
    }
  });

  const getDate = (clockData) => {
    const dataList = clockData;
    const option = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: ''
    }

    Object.values(dataList).forEach(data => {

      option.timeZone = data.timeZone;

      // 取得當地時間 e.g., Feb 23, 2022, 05:28 AMs
      const currentDate = new Date().toLocaleString("en-us", option).split(', ');
      const newData = data;
      const dateArray = currentDate[0].split(' ');
      const time = currentDate[2] ? currentDate[2].substring(0, 5) : '';

      data.date = `${dateArray[1]} ${dateArray[0]} ${currentDate[1]}`;
      data.time = `${time}`;
      // Object.assign(newClockData, newData);
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
