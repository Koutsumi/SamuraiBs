import {el} from './elements'
import header from '../../support/components/header/index'


class DashPage{

   constructor(){
        this.header = header
   }

   calendarShouldBeVisible(){
      cy.get(el.calendar, {timeout: 7000})
         .should('be.visible')
   }

   selectDay(day){
      const target = new RegExp('^' + day + '$','g')
      cy.contains(el.dayAvailable, target)
         .click()
   }

   appointmentShouldBe(custumer, hour){
      cy.contains('div', custumer.name)
         .should('be.visible')
         .parent()
         .contains(el.boxHour, hour)
         .should('be.visible')
   }

}

export default new DashPage()