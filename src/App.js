import style from './App.module.scss';

function App() {
  let clockList = {
    newYork: {
      city: "NEW YORK",
      timeZone: 'America/New_York',
      locales: 'en-us',
      date: '28 JAN. 2019',
      time: '02:46'
    },
    london: {
      city: "LONDON",
      timeZone: 'Britain/London',
      locales: 'en-gb',
      date: '28 JAN. 2019',
      time: '02:46'
    },
    bangkok: {
      city: "BANGKOK",
      timeZone: 'Thailand/Bangkok',
      locales: 'th-TH',
      date: '28 JAN. 2019',
      time: '02:46'
    },
    taiwan: {
      city: "TAIWAN",
      timeZone: 'America/New_York',
      locales: 'zh-tw',
      date: '28 JAN. 2019',
      time: '02:46'
    },
    sydney: {
      city: "SYDNEY",
      timeZone: 'Australia/Sydney',
      locales: 'en-au',
      date: '28 JAN. 2019',
      time: '02:46'
    }
  }

  const getUTCDate = () => {
    const clock = clockList.newYork
    // 取得當地時間
    // day/month/year, hour/min/sec AM/PM
    const date = new Date().toLocaleString(clock.locales, { timeZone: clock.timeZone }).split(',');
    const dateArray = date[0] ? date[0].split('/') : [];
    const timeArray = date[1] ? date[1].substring(0, date[1].length - 3).split(':') : [];
    // 轉成UTC時間
    const utc = new Date(Date.UTC(dateArray[2], dateArray[0], dateArray[1]));
    const newTime = Object.values(clockList).find(c => c.city === clock.city);
    newTime.date = date.date;
    newTime.time = date.time;
  }

  /**
   * 確認背景與文字顏色
   * @param {*} clock 單一時區資料
   * @returns 是否為黑色背景
   */
  const isBlackBeground = (clock) => {
    return clock === clockList.newYork || clock === clockList.sydney;
  }


  return (
    <div className={style.App}>
      <div className={style.container}>
        <div className={style.title}>
          WORLD CLOCK
          {getUTCDate()}
        </div>
        {
          Object.values(clockList)
            .map(clock =>
              <div
                key={clock.city}
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
