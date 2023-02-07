export class Experience {

    public constructor(init?: Partial<Experience>){
        Object.assign(this, init);
    }

    id: number;
    urlimg: string;
    company: string;
    period: string;
    descripcion: Text;

}