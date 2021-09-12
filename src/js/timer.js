class CountdownTimer {
  constructor({ selector = "#timer-1", targetDate = Date.now() }) {
    this.targetDate = new Date(targetDate);

    this.timer = document.querySelector(`${selector}`);
    this.dateRef = this.timer.querySelector('[data-value="date"]');

    this.daysRef = this.timer.querySelector('[data-value="days"]');
    this.hoursRef = this.timer.querySelector('[data-value="hours"]');
    this.minsRef = this.timer.querySelector('[data-value="mins"]');
    this.secsRef = this.timer.querySelector('[data-value="secs"]');

    this.timerID = null;
  }
  getDifference() {
    return this.targetDate - Date.now();
  }
  renderTimer() {
    const time = this.getDifference();
    if (time < 0) return;

    /*
    * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
    */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    
    /*
    * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    * остатка % и делим его на количество миллисекунд в одном часе
    * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
    */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
    * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
    */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
    * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    * миллисекунд в одной секунде (1000)
    */
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.dateRef.textContent = this.targetDate.toDateString();
    this.daysRef.textContent = days;
    this.hoursRef.textContent = hours;
    this.minsRef.textContent = mins;
    this.secsRef.textContent = secs;
  }
  start() {
    this.timerID = setInterval(() => {
      this.renderTimer();
    }, 1000);
  }
  stop() {
    clearInterval(this.timerID);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: "Oct 24, 2021",
});

timer.start();