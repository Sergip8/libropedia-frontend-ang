import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  output,
  Output,
  SimpleChanges,
} from "@angular/core";
import { SelectData, SelectValues } from "./selectModel";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-selectcheck",
  standalone: true,
  imports: [NgClass],
  template: `
    <div [class]="'relative w-full '+data.default.replaceAll(' ', '') ">
      @if (data.showLabel) {
        <label class=" block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">Seleccione {{data?.default}}</label>

      }
      <button
        [ngClass]="setValue =='' ? 'text-gray-400': 'text-black'"
        class="w-full  justify-between font-normal text-sm  dark:text-white ps-4  py-2 items-center bg-white dark:bg-gray-800 h-9 flex pe-2 focus:outline-none border-1 border-black"
        (click)="toggleDropdown()"
      >
      @if (data.type == "multiple") {
        {{selectedList.length >0 ? setListValues(): data.default }}
      }
      @if (data.type == "single") {
        {{selectedItem != "" ? setSingleValue() : data.default }}
      }
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-3 h-4 ml-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <div
        [ngClass]="{
          'transition ease-out duration-300 transform opacity-100 scale-100': isDropdownOpen,
          'transition ease-in duration-75 transform opacity-0 scale-0': !isDropdownOpen
        }"
        class="absolute mt-1 w-48 bg-white shadow-lg z-10"
      >
      <div>
        @if (data.search) {
          <input (input)="search($event)" type="text" class="w-full px-2 pb-1 left-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

        }
      </div>
        @for (opt of data.list; track $index) {
        <div (click)="itemSelected(opt)" class="flex items-center px-2  hover:bg-amber-500">
          @if (data.type == "multiple") {
            <input
              type="checkbox"
              [checked]="isChecked(opt.id)"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              id="check"
            />

          }
          <div class="cursor-pointer block px-4 py-2 dark:text-gray-100 mr-4" [innerHTML]="opt.value "></div>
        </div>

        }
      </div>
    </div>
  `,
  styles: [``],
})
export class SelectCheckComponent implements OnInit {
isChecked(opt:number) {
  return this.selectedList.includes(opt)
}
  ngOnInit(): void {
    this.originalData = this.data.list
   
    if(this.setValue){
      if(Object.prototype.toString.call(this.setValue) === '[object Array]') 
        this.selectedList = this.setValue.map((_: string | string[]) => 
          typeof _ === 'string' ? _[0].toUpperCase() + _.slice(1).toLowerCase() : _
        )
      else
        this.selectedItem = this.setValue[0].toUpperCase() + this.setValue.slice(1).toLowerCase()
    }
  }
search(search: Event) {
  this.data.list = this.originalData 
  const res: any[] = []
  const inputElement = search.target as HTMLInputElement;
  console.log(inputElement.value);
  this.data.list.forEach((_: any) => {
    if (typeof _ === 'object' && _.value && typeof _.value === 'string' && _.value.toLowerCase().startsWith(inputElement.value.toLowerCase())) {
      res.push(_);
    }
  });
  this.data.list = res
}
  selectedItem: any = ""
  selectedList: any[] = []

itemSelected(selected: any) {
  if (this.data.type == "multiple"){
    const index = this.selectedList.indexOf(selected.id)
    if (index == -1)
      this.selectedList.push(selected.id)
    else
      this.selectedList.splice(index, 1) 
  this.selectedMulti.emit(this.selectedList)
  }
  if (this.data.type == "single"){
    this.selectedItem = selected.id
    this.isDropdownOpen = false;
    this.selectedSingle.emit(this.selectedItem)
  }

}
  originalData: SelectValues[] = []
  isDropdownOpen = false;
  @Input() data!: SelectData;
  @Output() selectedSingle = new EventEmitter<any>()
  @Output() selectedMulti = new EventEmitter<any[]>()
  @Input() setValue!:any
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickInside = target.closest(`.${this.data?.default.replaceAll(' ', '')}`);
    
    if (!clickInside) {
      this.isDropdownOpen = false;
    }
  }
  setListValues() {
    const valuesList: (string | number)[] = []
    this.selectedList.forEach((_: any) => {
      const index = this.data.list.findIndex((opt: any) => opt.id == _)
      if (index != -1)
        valuesList.push(this.data.list[index].value)
    })
    return valuesList.join(", ")
  }
  setSingleValue() {
    const index = this.data.list.findIndex((opt: any) => opt.id == this.selectedItem)
    if (index != -1)
      return this.data.list[index].value
    return ""
  }
}
