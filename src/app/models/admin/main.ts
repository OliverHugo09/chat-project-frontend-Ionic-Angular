export class Main {

    public constructor(init?: Partial<Main>){
        Object.assign(this, init);
    }

    id: number;
    fullname: string;
    urlimg: string;
    title: string;
    description: Text;

}