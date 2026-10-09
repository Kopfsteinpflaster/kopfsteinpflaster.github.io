document.addEventListener('DOMContentLoaded', function () {
    var bezirke = {
        'bezirk-mitte': {
            name: 'Mitte',
            subheader: 'Regierungsfritzen und Touries',
            text: 'Zwischen Regierungsbauten und Touristenströmen fühlt man sich immer beobachtet. Die Regierung achtet hier sehr genau auf Ihr einflussgebiet und probiert sich selber frei vom Okkulten zu halten, um Ihre Integrität zu wahren.'
        },
        'bezirk-friedrichshain-kreuzberg': {
            name: 'Friedrichshain-Kreuzberg',
            subheader: 'Rebellisch & Verflucht',
            text: 'In den Technoclubs verschwimmen Bass und Beschwörung. Manche, die hier Feiern gehen, kommen erst Tage später wieder heraus, und nicht alle erinnern sich danach noch an ihren Namen. Manchmal ändert eine einfache Party alles.'
        },
        'bezirk-pankow': {
            name: 'Pankow',
            subheader: 'Patchwork zwischen Kunst und Wahnsinn',
            text: 'Zwischen Altbauten und stillen Parks haben sich alte Zirkel eingenistet, die sich an keinem anderen Ort einfinden können. Die Nachbarschaft schweigt, wenn nachts seltsame Melodien hinter zugezogenen Vorhängen gespielt werden.'
        },
        'bezirk-charlottenburg-wilmersdorf': {
            name: 'Charlottenburg-Wilmersdorf',
            subheader: 'Prunk & Verfall',
            text: 'Hinter den gediegenen Fassaden wird mit verfluchtem Gold gehandelt, als wäre es ganz gewöhnliches Vermögen. Hier jagen Menschen den Wohlstand und lassen sich manchmal auf Pakte ein, die Sie ewig verfolgen.'
        },
        'bezirk-spandau': {
            name: 'Spandau',
            subheader: 'Eine eigene kleine Stadt, abgelegen und voller Geheimnisse',
            text: 'Die alte Zitadelle und die stillen Wasserwege sollen Zugänge zu den Traumlanden verbergen. Wer zu tief in die Havel blickt, verliert manchmal den Faden der eigenen Gedanken.'
        },
        'bezirk-steglitz-zehlendorf': {
            name: 'Steglitz-Zehlendorf',
            subheader: 'Korruptes Geld & dunkle Wälder',
            text: 'Im dichten Grün des Grunewalds leben Wesen, die älter sind als die Stadt selbst. Villenbesitzer erzählen sich Geschichten von Lichtern zwischen den Bäumen, die niemand erklären kann. In den Tiefen des Waldes hält der Wendigo seine Festmahle.'
        },
        'bezirk-tempelhof-schoeneberg': {
            name: 'Tempelhof-Schöneberg',
            subheader: 'Platzhaltertext – wird noch überarbeitet.',
            text: '[Platzhalter] Über dem stillgelegten Flugfeld liegt eine Schwere, die nichts mit dem Wetter zu tun hat. Manche Okkultisten behaupten, dort etwas gerufen zu haben, das sie nicht mehr loswerden.'
        },
        'bezirk-neukoelln': {
            name: 'Neukölln',
            subheader: 'Vielfältig & Überfüllt',
            text: 'In den Hinterhöfen kursieren alte Kulte, die genauso vielfältig sind wie die Nachbarschaft selbst. Wer weiß, an wen er sich wenden muss, findet hier fast alles, um einen Preis, der selten in Geld bezahlt wird.'
        },
        'bezirk-treptow-koepenick': {
            name: 'Treptow-Köpenick',
            subheader: 'Trübe Tiefen',
            text: 'Abgelegen, zwischen Wäldern und Seen im Berliner Südosten, praktizieren die Jünger Dagons ihre Rieten. In der Altstadt wird alles von alteingesessenen Familien kontrolliert, die ihre eigenen Regeln und hierarchien haben. Hier sollen sich geister tummeln, die Unheil ankündigen.'
        },
        'bezirk-marzahn-hellersdorf': {
            name: 'Marzahn-Hellersdorf',
            subheader: 'Platzhaltertext – wird noch überarbeitet.',
            text: '[Platzhalter] Zwischen den Plattenbauten experimentiert die Fornax mit Technologien, die niemand vollständig versteht. Nachts sollen manche Fenster in Farben leuchten, die es eigentlich nicht geben dürfte.'
        },
        'bezirk-lichtenberg': {
            name: 'Lichtenberg',
            subheader: 'Platzhaltertext – wird noch überarbeitet.',
            text: '[Platzhalter] In den alten Industriehallen finden Rituale statt, die so laut sind wie die Züge, die darüber hinwegdonnern. Niemand hört die Schreie, weil ohnehin niemand genau hinhört.'
        },
        'bezirk-reinickendorf': {
            name: 'Reinickendorf',
            subheader: 'Platzhaltertext – wird noch überarbeitet.',
            text: '[Platzhalter] Am Stadtrand, nahe den Wäldern und dem alten Flughafengelände, verschwimmen die Grenzen zwischen Berlin und dem, was davor war. Manche Anwohner berichten von Träumen, die nicht ihre eigenen sind.'
        }
    };

    var map = document.querySelector('.berlin-map');
    var infoBox = document.getElementById('bezirk-info');
    var infoName = document.getElementById('bezirk-info-name');
    var infoSubheader = document.getElementById('bezirk-info-subheader');
    var infoText = document.getElementById('bezirk-info-text');
    if (!map || !infoBox || !infoName || !infoSubheader || !infoText) return;

    var selected = null;

    function selectBezirk(el) {
        var data = bezirke[el.id];
        if (!data) return;

        if (selected === el) {
            el.classList.remove('selected');
            el.setAttribute('aria-pressed', 'false');
            selected = null;
            infoBox.hidden = true;
            return;
        }

        if (selected) {
            selected.classList.remove('selected');
            selected.setAttribute('aria-pressed', 'false');
        }

        el.classList.add('selected');
        el.setAttribute('aria-pressed', 'true');
        selected = el;

        infoName.textContent = data.name;
        infoSubheader.textContent = data.subheader || '';
        infoSubheader.hidden = !data.subheader;
        infoText.textContent = data.text;
        infoBox.hidden = false;
    }

    map.querySelectorAll('.bezirk').forEach(function (el) {
        el.addEventListener('click', function () {
            selectBezirk(el);
        });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                selectBezirk(el);
            }
        });
    });
});
