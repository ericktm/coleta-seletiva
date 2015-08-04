    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        console.log(ev);
        console.log(this);

        var audio = new Audio('audio/drop_trash.wav');
        audio.play();

        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    $(document).ready(function(d) {

        var dumps = {
            'papel': {
                'label': 'Papel',
                'src': 'img/trash.png',
                'items': []
            },
            'plastico': {
                'label': 'Plástico',
                'src': 'img/trash2.png',
                'items': []
            },
            'vidro': {
                'label': 'Vidro',
                'src': 'img/trash3.png',
                'items': []
            },
            'metal': {
                'label': 'Metal',
                'src': 'img/trash4.png',
                'items': []
            }
        };

        var items = [{
            'label': 'Latinha de Refrigerante',
            'type': 'metal',
            'posx': '100',
            'posy': '100',
            'image': 'img/item.png'
        }, {
            'label': 'Jornal Velho',
            'type': 'papel',
            'posx': '50',
            'posy': '50',
            'image': 'img/jornal.png'
        }, {
            'label': 'Garrafa quebrada',
            'type': 'vidro',
            'posx': '400',
            'posy': '100',
            'image': 'img/garrafa_vidro.png'
        }];


        function initialize() {
            renderDumps();
            renderItems();
        }

        function addElement(trash, dump) {
            // possivel validação do tipo de lixo que o usuário está tentando adicionar à lixeira
            dumps[dump].push(dumps);
        }

        function saveGame() {
            // Enviar para o servidor os movimentos do usuário.
            var url = 'http://game.erick.net.br/save';
            $.post(url, dumps, function(data) {
                console.log(data);
            });
        }

        function renderDumps() {
            $.each(dumps, function(key, value) {
                console.log(value);
                $('#dumps').append('<div class="dump" title="' + value.label + '" style="background-image: url(' + value.src + ');" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
            });
        }

        function renderItems() {
            $.each(items, function(key, value) {
                console.log(value);
                $('#main_scene').append('<div id="' + key + '" class="trash" ondragstart="drag(event)" draggable="true" title="' + value.label + '" style="background-image: url(' + value.image + '); top:' + value.posy + '; left:' + value.posx + ';"></div>');
            });
        }

        initialize();

    });