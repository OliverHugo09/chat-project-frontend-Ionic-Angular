export class Skill {

    public constructor(init?: Partial<Skill>){
        Object.assign(this, init);
    }

    id: number;
    title: string;
    urlimg: string;
    percentage: number;
    experiencetime: Text;

}
