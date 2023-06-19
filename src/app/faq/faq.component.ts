import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  accordionCtrl1:boolean=false;
  accordionCtrl2:boolean=false;
  accordionCtrl3:boolean=false;
  accordionCtrl4:boolean=false;
  accordionCtrl5:boolean=false;
  accordionCtrl6:boolean=false;
  accordionCtrl7:boolean=false;
  accordionCtrl8:boolean=false;
  accordionCtrl9:boolean=false;

  collapse(a:number){
    //(this.accordionCtrl1 || this.accordionCtrl2) ? console.log("Funciona") : console.log("supongo que tambien funciona?");
    switch(a){
      case 1: this.accordionCtrl1 = !this.accordionCtrl1; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 2: this.accordionCtrl2 = !this.accordionCtrl2; (this.accordionCtrl1 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl1 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 3: this.accordionCtrl3 = !this.accordionCtrl3; (this.accordionCtrl2 || this.accordionCtrl1 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl1 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 4: this.accordionCtrl4 = !this.accordionCtrl4; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl1 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl1 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 5: this.accordionCtrl5 = !this.accordionCtrl5; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl1 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl1 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 6: this.accordionCtrl6 = !this.accordionCtrl6; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl1 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl1 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 7: this.accordionCtrl7 = !this.accordionCtrl7; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl1 || this.accordionCtrl8 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl1 = this.accordionCtrl8 = this.accordionCtrl9 = false : true ; break;
      case 8: this.accordionCtrl8 = !this.accordionCtrl8; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl1 || this.accordionCtrl9) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl1 = this.accordionCtrl9 = false : true ; break;
      case 8: this.accordionCtrl9 = !this.accordionCtrl9; (this.accordionCtrl2 || this.accordionCtrl3 || this.accordionCtrl4 || this.accordionCtrl5 || this.accordionCtrl6 || this.accordionCtrl7 || this.accordionCtrl8 || this.accordionCtrl1) ? this.accordionCtrl2 = this.accordionCtrl3 = this.accordionCtrl4 = this.accordionCtrl5 = this.accordionCtrl6 = this.accordionCtrl7 = this.accordionCtrl8 = this.accordionCtrl1 = false : true ; break;
    }
    /*if(a == 1){
      console.log("1");
      if(this.accordionCtrl2 == true){
        console.log("Switch");
        this.accordionCtrl1 = !this.accordionCtrl1;
        this.accordionCtrl2 = !this.accordionCtrl2;
      }else{
        console.log("Close");
        this.accordionCtrl1 = !this.accordionCtrl1;
      }
    }else if(a == 2){
      console.log("2");
      if(this.accordionCtrl1 == true){
        console.log("Switch");
        this.accordionCtrl1 = !this.accordionCtrl1;
        this.accordionCtrl2 = !this.accordionCtrl2;
      }else{
        console.log("Close");
        this.accordionCtrl2 = !this.accordionCtrl2;
      }
    }*/
  }
}
