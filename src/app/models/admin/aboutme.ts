export class Aboutme {

    public constructor(init?: Partial<Aboutme>){
        Object.assign(this, init);
    }

    id: number;
    title: string;
    urlimg: string;
    descripcion: Text;

}