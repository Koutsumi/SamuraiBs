import {el} from './elements'
import header from '../../support/components/header/index'

class DashPage{

   constructor(){
        this.header = header
   }

   calendarShouldBeVisible(){
      cy.get(el.calendar)
         .should('be.visible')
   }

   selectDay(appointmentDate){

      let today = new Date()
      let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

      if(today.getDate() === lastDayOfMonth.getDate()){
         cy.log('Estamos no último dia do mes')
         cy.get(el.nextMonthButton)
            .should('be.visible')
               .click()
         cy.log(appointmentDate.getMonth())

         let monthName 
         switch (appointmentDate.getMonth()) {
            case 0:
               monthName = 'Janeiro'
               break;
         
               case 1:
                  monthName = 'Fevereiro'
                  break;

               case 2:
                  monthName = 'Março'
                  break;

               case 3:
                  monthName = 'Abril'
                  break;

               case 4:
                  monthName = 'Maio'
                  break;

               case 5:
                  monthName = 'Junho'
                  break;

               case 6:
                  monthName = 'Julho'
                  break;

               case 7:
                  monthName = 'Agosto'
                  break;

               case 8:
                  monthName = 'Setembro'
                  break;

               case 9:
                  monthName = 'Outubro'
                  break;

               case 10:
                  monthName = 'Novembro'
                  break;
               
               case 11:
                  monthName = 'Dezembro'
                  break;
         }
         cy.contains(el.getMonthName, monthName)
      } else{
         cy.log('Este não é o último dia no mês')
         cy.log(appointmentDate.getMonth())
      }

      cy.log(today.toString())
      cy.log(lastDayOfMonth.toString())
      const target = new RegExp('^' + appointmentDate.getDate() + '$','g')
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