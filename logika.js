//
// Zajednicka logika za sve klase

class Base{

  constructor(name, vrijednosti, rezultati){
    this.name = name;
    this.vrijednosti = vrijednosti; // niz podataka
    this.rezultati = rezultati; // rezultati iz zadnje kolone tabele
  }

  get count(){
    return this.vrijednosti.length;
  }
  get countYes(){
    var r = 0; this.rezultati.forEach((e) => {  r += (e.toLowerCase()=='yes' || e.toLowerCase() == 'da') ? 1 : 0 });
    return r;
  }
  get countNo(){
    var r = 0; this.rezultati.forEach((e) => {  r += (e.toLowerCase()=='no' || e.toLowerCase() == 'ne') ? 1 : 0 });
    return r;
  }

}

class Podatak extends Base{

  constructor(parent, name){
    super(name);
    this.parent = parent;
    this.vrijednosti = [];
    this.rezultati = [];
    this.child = null;
  }

  get procYes(){ return this.countYes / this.parent.countYes; }
  get procNo(){ return this.countNo / this.parent.countNo; }
}

class Atribut extends Base{

  constructor(name, vrijednosti, rezultati){
    super(name, vrijednosti, rezultati);
    this.podaci = [];

    // kreiramo klase podataka
    for(var i = 0; i < this.vrijednosti.length; i++){
      var podatak = null;
      this.podaci.forEach((e)=>{
        if(e.name == this.vrijednosti[i])
          podatak = e;
      });
      
      if(podatak == null){
        podatak = new Podatak(this, this.vrijednosti[i]);
        this.podaci.push(podatak);
      }
      
      podatak.vrijednosti.push(this.vrijednosti[i]);
      podatak.rezultati.push(this.rezultati[i]);
    }
  }

  getPodatak(name){
    for(var i = 0; i < this.podaci.length; i++)
    if(this.podaci[i].name == name)
      return this.podaci[i];
    return null;
  }

  primjeniLaplas(){
    var copy = new Atribut(this.name, this.vrijednosti, this.rezultati);
    copy.podaci.forEach((e)=>{
      e.rezultati.push('yes', 'no');
    });
    return copy;
  }

  get countYes(){ var r = 0; this.podaci.forEach((e) => {r += e.countYes; }); return r; }
  get countNo(){ var r = 0; this.podaci.forEach((e) => {r += e.countNo; }); return r; }
}

class Rezultati extends Base{

  constructor(vrijednosti){
    super('', vrijednosti, vrijednosti);
  }

  get procYes(){ return this.countYes / this.count; }
  get procNo(){ return this.countNo / this.count; }

}

function getAtributByName(name){
  for(var i = 0; i < data.atributi.length; i++)
    if(data.atributi[i].name == name)
      return data.atributi[i];
  return null;
}