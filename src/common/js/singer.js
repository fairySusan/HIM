export default class Singer{
    constructor({mid,name,id}){
        this.id = id;
        this.name = name;
        this.poto = `http://127.0.0.1:8081/singerimg/${mid}`
    }
}
