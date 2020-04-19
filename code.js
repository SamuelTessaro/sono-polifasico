$("select#metodoCochilo").change(function(){
    var metodoCochilo = $(this).val();

    if(metodoCochilo === "Everyman") {
        $("select#tempoCochilo").html('<option value="20" selected>20</option><option value="30">30</option>')
    }else if(metodoCochilo === "Uberman") {
        $("select#tempoCochilo").html('<option value="20" selected>20</option>')
    }else if(metodoCochilo === "Dymaxion") {
        $("select#tempoCochilo").html('<option value="30" selected>30</option>')
    }
});

$("#calcular").click(function(){
    var h_inicial = parseInt($('#hora :selected').val()),
        m_inicial = parseInt($('#minutos :selected').val()),
        metodoCochilo = $('#metodoCochilo :selected').val(),
        m_tempoCochilo = parseInt($('#tempoCochilo :selected').val()),
        soneca = "";

    $("table").remove();
    $("small").remove();
    
    if(metodoCochilo === "Everyman") {
        calculaEveryman(h_inicial,m_inicial,m_tempoCochilo);
    }else if(metodoCochilo === "Uberman") {
        soneca = calculaUberman(h_inicial,m_inicial,m_tempoCochilo);
    }else if(metodoCochilo === "Dymaxion") {
        soneca = calculaDymaxion(h_inicial,m_inicial,m_tempoCochilo);
    }
});

$("#limpar").click(function(){
    $("table").remove();
    $("small").remove();
});

$("#a_calculadora").click(function(){
    $("table").remove();
    $("small").remove();    
    $("#compartilhe").hide(1000);
    $("#sobre").hide(1000);
    $("#horarios").show(1000);
});

$("#a_sobre").click(function(){
    $("table").remove();
    $("small").remove();    
    $("#compartilhe").hide(1000);
    $("#horarios").hide(1000);
    $("#sobre").show(1000);
});

$("#a_compartilhe").click(function(){
    $("table").remove();
    $("small").remove();    
    $("#horarios").hide(1000);
    $("#sobre").hide(1000);
    $("#compartilhe").show(1000);
});


function calculaEveryman(h_inicial,m_inicial,m_tempoCochilo){
    var h_intervalo_soneca = 5,
        horarios = {};

    for (var i=1;i<=4;i++)  { 
        switch (i){
            case 1:
                m_tempoCochiloCore = 180;
                var h_dormir = h_inicial,
                    m_dormir = m_inicial,
                    primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochiloCore),
                    dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
                    acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];

                horarios = {
                    h_dormeCochilo1 : h_dormir,
                    m_dormeCochilo1 : m_dormir,
                    h_acordaCochilo1 : primeiroCochilo["h_acordar"],
                    m_acordaCochilo1 : primeiroCochilo["m_acordar"]
                }
              break;

            case 2:
                var h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = primeiroCochilo["m_acordar"],
                    segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
                    acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
                
                horarios['h_dormeCochilo2'] =  h_dormir
                horarios['m_dormeCochilo2'] =  m_dormir
                horarios['h_acordaCochilo2'] =  segundoCochilo["h_acordar"]
                horarios['m_acordaCochilo2'] =  segundoCochilo["m_acordar"]
              break;

            case 3:
                var h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = segundoCochilo["m_acordar"],
                    terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
                    acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo3'] =  h_dormir
                horarios['m_dormeCochilo3'] =  m_dormir
                horarios['h_acordaCochilo3'] =  terceiroCochilo["h_acordar"]
                horarios['m_acordaCochilo3'] =  terceiroCochilo["m_acordar"]
              break;

            case 4:
                var h_dormir = terceiroCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = terceiroCochilo["m_acordar"],
                    quartoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeQuartoCochilo = quartoCochilo["cochiloDorme"],
                    acordaQuartoCochilo = quartoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo4'] =  h_dormir
                horarios['m_dormeCochilo4'] =  m_dormir
                horarios['h_acordaCochilo4'] =  quartoCochilo["h_acordar"]
                horarios['m_acordaCochilo4'] =  quartoCochilo["m_acordar"]                  
              break;
        }
    }

    $("#horarios").append("<small>*O primeiro cochilo do Everyman é o CoreSleep</small>");
    $("#calculadora").append('\
        <table class="table table-condensed span6 offset1">\
            <thead>\
                <tr>\
                    <th>Soneca</th>\
                    <th>Dorme</th>\
                    <th>Acorda</th>\
                    <th>Agenda</th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr>\
                    <td>1º Cochilo(Core)</td>\
                    <td>'+dormePrimeiroCochilo+'</td>\
                    <td>'+acordaPrimeiroCochilo+'</td>\
                    <td id="agenda1Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>2º Cochilo</td>\
                    <td>'+dormeSegundoCochilo+'</td>\
                    <td>'+acordaSegundoCochilo+'</td>\
                    <td id="agenda2Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>3º Cochilo</td>\
                    <td>'+dormeTerceiroCochilo+'</td>\
                    <td>'+acordaTerceiroCochilo+'</td>\
                    <td id="agenda3Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>4º Cochilo</td>\
                    <td>'+dormeQuartoCochilo+'</td>\
                    <td>'+acordaQuartoCochilo+'</td>\
                    <td id="agenda4Cochilo"></td>\
                </tr>\
            </tbody>\
        </table>');
    
    // cria link para agenda
    for (var cochilo=1;cochilo<=4;cochilo++)  {
        adicionarAgenda(
                        horarios["h_dormeCochilo"+cochilo],
                        horarios["m_dormeCochilo"+cochilo],
                        horarios["h_acordaCochilo"+cochilo],
                        horarios["m_acordaCochilo"+cochilo],
                        cochilo,
                        "agenda"+cochilo+"Cochilo",
                        "Everyman"
                        );
    }
}


function calculaUberman(h_inicial,m_inicial,m_tempoCochilo){
    var h_intervalo_soneca = 4;

    for (var i=1;i<=6;i++)  { 
        switch (i){
            case 1:
                var h_dormir = h_inicial,
                    m_dormir = m_inicial,
                    primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
                    acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];
                
                horarios = {
                    h_dormeCochilo1 : h_dormir,
                    m_dormeCochilo1 : m_dormir,
                    h_acordaCochilo1 : primeiroCochilo["h_acordar"],
                    m_acordaCochilo1 : primeiroCochilo["m_acordar"]
                }
              break;

            case 2:
                var h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = primeiroCochilo["m_acordar"],
                    segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
                    acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo2'] =  h_dormir
                horarios['m_dormeCochilo2'] =  m_dormir
                horarios['h_acordaCochilo2'] =  segundoCochilo["h_acordar"]
                horarios['m_acordaCochilo2'] =  segundoCochilo["m_acordar"]                    
              break;

            case 3:
                var h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = segundoCochilo["m_acordar"],
                    terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
                    acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo3'] =  h_dormir
                horarios['m_dormeCochilo3'] =  m_dormir
                horarios['h_acordaCochilo3'] =  terceiroCochilo["h_acordar"]
                horarios['m_acordaCochilo3'] =  terceiroCochilo["m_acordar"]                    
              break;

            case 4:
                var h_dormir = terceiroCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = terceiroCochilo["m_acordar"],
                    quartoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeQuartoCochilo = quartoCochilo["cochiloDorme"],
                    acordaQuartoCochilo = quartoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo4'] =  h_dormir
                horarios['m_dormeCochilo4'] =  m_dormir
                horarios['h_acordaCochilo4'] =  quartoCochilo["h_acordar"]
                horarios['m_acordaCochilo4'] =  quartoCochilo["m_acordar"]                    
              break;

            case 5:
                var h_dormir = quartoCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = quartoCochilo["m_acordar"],
                    quintoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeQuintoCochilo = quintoCochilo["cochiloDorme"],
                    acordaQuintoCochilo = quintoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo5'] =  h_dormir
                horarios['m_dormeCochilo5'] =  m_dormir
                horarios['h_acordaCochilo5'] =  quintoCochilo["h_acordar"]
                horarios['m_acordaCochilo5'] =  quintoCochilo["m_acordar"]                    
              break;

            case 6:
                var h_dormir = quintoCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = quintoCochilo["m_acordar"],
                    sextoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeSextoCochilo = sextoCochilo["cochiloDorme"],
                    acordaSextoCochilo = sextoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo6'] =  h_dormir
                horarios['m_dormeCochilo6'] =  m_dormir
                horarios['h_acordaCochilo6'] =  sextoCochilo["h_acordar"]
                horarios['m_acordaCochilo6'] =  sextoCochilo["m_acordar"]                    
              break;
        }
    }

    $("#horarios").append("<small>*6 Cochilos de 20 minutos a cada 4 horas.</small>");
    $("#calculadora").append('\
        <table class="table table-condensed span6 offset1">\
            <thead>\
                <tr>\
                    <th>Soneca</th>\
                    <th>Dorme</th>\
                    <th>Acorda</th>\
                    <th>Agenda</th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr>\
                    <td>1º Cochilo</td>\
                    <td>'+dormePrimeiroCochilo+'</td>\
                    <td>'+acordaPrimeiroCochilo+'</td>\
                    <td id="agenda1Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>2º Cochilo</td>\
                    <td>'+dormeSegundoCochilo+'</td>\
                    <td>'+acordaSegundoCochilo+'</td>\
                    <td id="agenda2Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>3º Cochilo</td>\
                    <td>'+dormeTerceiroCochilo+'</td>\
                    <td>'+acordaTerceiroCochilo+'</td>\
                    <td id="agenda3Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>4º Cochilo</td>\
                    <td>'+dormeQuartoCochilo+'</td>\
                    <td>'+acordaQuartoCochilo+'</td>\
                    <td id="agenda4Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>5º Cochilo</td>\
                    <td>'+dormeQuintoCochilo+'</td>\
                    <td>'+acordaQuintoCochilo+'</td>\
                    <td id="agenda5Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>6º Cochilo</td>\
                    <td>'+dormeSextoCochilo+'</td>\
                    <td>'+acordaSextoCochilo+'</td>\
                    <td id="agenda6Cochilo"></td>\
                </tr>\
            </tbody>\
        </table>');

    // cria link para agenda
    for (var cochilo=1;cochilo<=6;cochilo++)  {
        adicionarAgenda(
                        horarios["h_dormeCochilo"+cochilo],
                        horarios["m_dormeCochilo"+cochilo],
                        horarios["h_acordaCochilo"+cochilo],
                        horarios["m_acordaCochilo"+cochilo],
                        cochilo,
                        "agenda"+cochilo+"Cochilo",
                        "Uberman"
                        );
    }
}


function calculaDymaxion(h_inicial,m_inicial,m_tempoCochilo){
    // intervalo eh de 5 horas e meia, adiciono 30 minutos no m_inicial
    var h_intervalo_soneca = 5;

    for (var i=1;i<=4;i++)  { 
        switch (i){
            case 1:
                var h_dormir = h_inicial,
                    m_dormir = m_inicial,
                    primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
                    acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];

                horarios = {
                    h_dormeCochilo1 : h_dormir,
                    m_dormeCochilo1 : m_dormir,
                    h_acordaCochilo1 : primeiroCochilo["h_acordar"],
                    m_acordaCochilo1 : primeiroCochilo["m_acordar"]
                }                    
              break;

            case 2:
                var h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca;
                var m_dormir = primeiroCochilo["m_acordar"] + 30;
                //parte editada por joao
                    if(m_dormir >= 60){
                        h_dormir +=1;
                        m_dormir -=60;
                    }
                    //----------------------

                var segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
                    acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
                    
                horarios['h_dormeCochilo2'] =  h_dormir
                horarios['m_dormeCochilo2'] =  m_dormir
                horarios['h_acordaCochilo2'] =  segundoCochilo["h_acordar"]
                horarios['m_acordaCochilo2'] =  segundoCochilo["m_acordar"]  
              break;

            case 3:
                var h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = segundoCochilo["m_acordar"] + 30;
                //jao
                if(m_dormir >=60){
                    h_dormir += 1;
                    m_dormir -=60;
                }
                //
                var terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
                    acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo3'] =  h_dormir
                horarios['m_dormeCochilo3'] =  m_dormir
                horarios['h_acordaCochilo3'] =  terceiroCochilo["h_acordar"]
                horarios['m_acordaCochilo3'] =  terceiroCochilo["m_acordar"]  
              break;

            case 4:
                var h_dormir = terceiroCochilo["h_acordar"] + h_intervalo_soneca,
                    m_dormir = terceiroCochilo["m_acordar"] + 30;
                    //jao
                    if(m_dormir >=60){
                        h_dormir += 1;
                        m_dormir -=60;
                    }
                    //jao
                var quartoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
                    dormeQuartoCochilo = quartoCochilo["cochiloDorme"],
                    acordaQuartoCochilo = quartoCochilo["cochiloAcorda"];

                horarios['h_dormeCochilo4'] =  h_dormir
                horarios['m_dormeCochilo4'] =  m_dormir
                horarios['h_acordaCochilo4'] =  quartoCochilo["h_acordar"]
                horarios['m_acordaCochilo4'] =  quartoCochilo["m_acordar"]  
              break;

        }
    }

    $("#horarios").append("<small>*4 Cochilos de 20 minutos a cada 5 horas e 30 minutos.</small>");
    $("#calculadora").append('\
        <table class="table table-condensed span6 offset1">\
            <thead>\
                <tr>\
                    <th>Soneca</th>\
                    <th>Dorme</th>\
                    <th>Acorda</th>\
                    <th>Agenda</th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr>\
                    <td>1º Cochilo</td>\
                    <td>'+dormePrimeiroCochilo+'</td>\
                    <td>'+acordaPrimeiroCochilo+'</td>\
                    <td id="agenda1Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>2º Cochilo</td>\
                    <td>'+dormeSegundoCochilo+'</td>\
                    <td>'+acordaSegundoCochilo+'</td>\
                    <td id="agenda2Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>3º Cochilo</td>\
                    <td>'+dormeTerceiroCochilo+'</td>\
                    <td>'+acordaTerceiroCochilo+'</td>\
                    <td id="agenda3Cochilo"></td>\
                </tr>\
                <tr>\
                    <td>4º Cochilo</td>\
                    <td>'+dormeQuartoCochilo+'</td>\
                    <td>'+acordaQuartoCochilo+'</td>\
                    <td id="agenda4Cochilo"></td>\
                </tr>\
            </tbody>\
        </table>');

    // cria link para agenda
    for (var cochilo=1;cochilo<=4;cochilo++)  {
        adicionarAgenda(
                        horarios["h_dormeCochilo"+cochilo],
                        horarios["m_dormeCochilo"+cochilo],
                        horarios["h_acordaCochilo"+cochilo],
                        horarios["m_acordaCochilo"+cochilo],
                        cochilo,
                        "agenda"+cochilo+"Cochilo",
                        "Dymaxion"
                        );
    }
}


function calculaCochilo(h_dormir,m_dormir,m_tempoCochilo){

    var m_acordar = 0,
        h_acordar = 0,
        cochiloDorme,
        cochiloAcorda;

    if (m_tempoCochilo === 180){
        h_acordar = h_dormir + 3;
    }else if(m_tempoCochilo === 20){
        if(m_dormir === 40){
            h_acordar = h_dormir + 1;
        }else if(m_dormir === 45){
            m_acordar = 5;
            h_acordar = h_dormir + 1;
        }else if(m_dormir === 50){
            m_acordar = 10;
            h_acordar = h_dormir + 1;
        }else if(m_dormir === 55){
            m_acordar = 15;
            h_acordar = h_dormir + 1;
        }else {
            m_acordar = m_dormir+m_tempoCochilo;
            h_acordar = h_dormir;
        }
    }else if (m_tempoCochilo === 30){
        if(m_dormir === 60){
            h_dormir += 1;
            m_dormir = 0;
            m_acordar = 30;
            h_acordar = h_dormir;
        }else if(m_dormir === 30){
            m_acordar = 0;
            h_acordar = h_dormir + 1;
        }else if(m_dormir === 45){
            m_acordar = 15;
            h_acordar = h_dormir + 1;
        }else {
            m_acordar = m_dormir+m_tempoCochilo;
            h_acordar = h_dormir;
        }
    }

    cochiloDorme = formataHora(h_dormir) + ":" + formataMinutos(m_dormir);
    cochiloAcorda = formataHora(h_acordar) + ":" + formataMinutos(m_acordar);

    return {
        "h_acordar":h_acordar,
        "m_acordar":m_acordar,
        "cochiloAcorda":cochiloAcorda,
        "cochiloDorme":cochiloDorme
    } 
}

function formataHora(tempo){
    if(tempo >=24){
        tempo = tempo - 24;
    }
    if(tempo.toString().length < 2 ){
        tempo = "0" + tempo
    }
    return tempo
}

function formataMinutos(tempo){
    if(tempo.toString().length < 2 ){
        tempo = "0" + tempo
    }
    return tempo
}

function adicionarAgenda(h_dormir,m_dormir,h_acordar,m_acordar,numeroCochilo,id,metodo){

    var data = new Date(),
        agendaCochilo = {
        start: new Date(data.getFullYear(), data.getMonth(), data.getDate(), h_dormir, m_dormir, 00),
        end: new Date(data.getFullYear(), data.getMonth(), data.getDate(), h_acordar, m_acordar, 00),
        title: numeroCochilo+'º Cochilo do Sono Polifásico Método '+metodo,
        description: 'Esse é o seu '+numeroCochilo+'º Cochilo, se organize para dormir no horário.',
        location: 'Na sua cama :D'};
    $('#'+id).icalendar(
        $.extend(
                {sites: ['google']},
                {compact: true},
                {icons: 'img/calendar_plus_pt_BR.gif'},
                agendaCochilo
            ));
}