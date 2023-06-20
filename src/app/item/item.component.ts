import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements /*DoCheck, AfterContentChecked,*/ AfterViewChecked{
  @Input() nombrePlato: any;
  @Input() modalF: boolean = false;
  @ViewChild('openModalButton', {static: false}) openModalButton!: ElementRef;
  
  ngAfterViewChecked(){
    if(this.modalF){
      console.log("Se esta repitiendo multiples veces por alguna razon")
      this.openModalButton.nativeElement.dispatchEvent(new MouseEvent('click'));
    }
  }
}
