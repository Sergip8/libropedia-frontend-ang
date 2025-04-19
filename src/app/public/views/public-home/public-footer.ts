import {
    Component,
    OnInit,

  } from "@angular/core";

  import { NgClass } from "@angular/common";
import {  RouterLink } from "@angular/router";
  
  @Component({
    selector: "app-public-footer",
    standalone: true,
    imports: [RouterLink],
    template: `
         <footer class="bg-gray-800 text-gray-300 py-8">
      <div class="container mx-auto px-6 text-center">
        <div class="mb-4">
          <a href="#" class="px-3 hover:text-white">Sobre Nosotros</a> |
          <a href="#" class="px-3 hover:text-white">Política de Privacidad</a> |
          <a href="#" class="px-3 hover:text-white">Términos de Uso</a> |
          <a href="#" class="px-3 hover:text-white">Contacto</a>
        </div>
        <p class="text-sm">&copy; {{ currentYear }} LibroPedia. Todos los derechos reservados.</p>
        <p class="text-xs mt-2">Hecho con <span class="text-red-500">&hearts;</span> usando Angular y Tailwind CSS</p>
      </div>
    </footer>
    `,
    styles: [``],
  })
  export class PublicFooterComponent implements OnInit {
    currentYear: any = new Date().getFullYear();
    ngOnInit(): void {
     
  }
}