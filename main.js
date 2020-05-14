function Main(){

  this.init = function(){

    $('body').on('change', '#primjer', function(){
      for(var i = 0; i < primjeri.length; i++)
        if(primjeri[i].name == $(this).val()){
          $('#table').html(primjeri[i].data);
          onSelect();
          return;
        }
    });
    
    $('body').on('change', '.selectAtribut', function(){
      promjenaAtributa();
    });
  }

  this.kreirajModele = function(){
    var index = -1;
    var atributi = [];
    var modeli = [];


    $('#table').find('tr').each(function(){
      index++;

      if(index == 0)
      {
        // imena atributa
        $(this).find('td').each(function(){
          atributi.push($(this).text().trim());
        });
        return;
      }

      var red = [];
      $(this).find('td').each(function(){
        red.push($(this).text().trim());
      });
      modeli.push(red);

    });

    return{
      atributi: atributi,
      modeli: modeli
    };
  }

  this.ucitavanjePrimjera = function(){
    $('#table').html('');

    for(var i = 0; i < primjeri.length; i++)
      $('#primjer').append(`<option val="${primjeri[i].name}">${primjeri[i].name}</option>`);

    $('#table').html(primjeri[0].data);
    
    onSelect();
  }

  this.kreiranjeTabeleOdlucivanja = function(){
    var primjer = null;
    for(var i = 0; i < primjeri.length; i++)
      if(primjeri[i].name == $('#primjer').val()){
        primjer = primjeri[i];
        break;
      }
    console.log('ucitani primjer', primjer);

    $('#uslovitable').html('');
    var table = $('#table');
    var odlucivanjeTable = $('#uslovitable');
    odlucivanjeTable.append($(table.find('tr')[0]).clone());
    $($('#uslovitable').find('td')[$('#uslovitable').find('td').length - 1]).remove(); // brisanje poslednje kolone
    var row = $('<tr></tr>');
    for(var i = 0; i < odlucivanjeTable.find('td').length; i++){
      var td = $(odlucivanjeTable.find('td')[i]);
      var atribut = null;
      data.atributi.forEach((e)=>{
        if(e.name == td.text())
          atribut = e;
      });

      var select = $(`<select class="selectAtribut" at="${atribut.name}"></select>`);
      atribut.podaci.forEach((e)=>{
        var selected = primjer != null && typeof primjer.prefs !== 'undefined' && primjer.prefs[i] == e.name ? 'selected': '';
        select.append(`<option ${selected}>${e.name}</option>`);
      });
      row.append(`<td>${select[0].outerHTML}</td>`);

    }

    odlucivanjeTable.append(row);
    promjenaAtributa();
  }

  

  this.init();
}