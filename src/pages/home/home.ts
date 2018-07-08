import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public date = moment()
  daysArr;

  startDate;
  endDate;

  constructor(public navCtrl: NavController) {
    this.daysArr = this.createCalendar(this.date)

  }

  createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map((n) => {
        return moment(firstDay).add(n, 'd')
      })

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days
  }  

  isReserved(day){
    if (!day) {
      return false;
    }
    return false
  }
  
  beforeToday(day){
    if (!day) {
      return false;
    }
    return moment().format('L') > day.format('L');
  }

  todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }  
  startEndCheck(day) {
    if (!day) {
      return false;
    }
    if(this.startDate||this.endDate) {
      return moment(this.startDate,'MM/DD/YYYY').isSame(day) || moment(this.endDate,'MM/DD/YYYY').isSame(day);
    }  
  }  

  public isSelected(day){
    if (!day) {
    return false;
    }
    if(this.startDate&&this.endDate) {
      return moment(day,'MM/DD/YYYY').isBetween(this.startDate,this.endDate);      
    }    
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }
  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public selectDate(day){
    let dayFormatted = day.format('MM/DD/YYYY');
    console.log(dayFormatted);
    
    if(this.startDate && this.endDate){
      this.startDate = this.endDate = null;  
      return  
    }
    if(!this.startDate){
      this.startDate = dayFormatted;
    } else {
      this.endDate = dayFormatted;
    }
    
  }




}
