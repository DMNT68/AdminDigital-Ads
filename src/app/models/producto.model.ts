export class Producto {

    constructor(
        public nombre: string,
        public precioUni: string,
        public img?: string,
        public descripcion?: string,
        public disponible?: boolean,
        public usuario?: string,
        public categoria?: string,
        public _id?: string
    ) {}
    
}
