export class Contact {

    public constructor(init?: Partial<Contact>){
        Object.assign(this, init);
    }

    id: number;
    title: string;
    urlmap: string;
    descripcion: Text;

}