export class Freetime {

    public constructor(init?: Partial<Freetime>){
        Object.assign(this, init);
    }

    id: number;
    urlimg: string;
    subtitle: string;
    descripcion: Text;

}