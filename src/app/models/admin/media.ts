export class Media {

    public constructor(init?: Partial<Media>){
        Object.assign(this, init);
    }

    id: number;
    name: string;
    urlimg: string;
    urlsite: string;

}