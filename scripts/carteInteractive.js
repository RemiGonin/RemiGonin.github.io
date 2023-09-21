$(document).ready(function () {
    // Call the event handler on #text
    $("#lycee").hover(
        function () {
            //Event one mouse enter add class
            $("#BJ").addClass("hoverstate");
            $("#lycee").addClass("hoverstate");
            $("#canada").removeClass("active");
            $("#france").removeClass("inactive");

            $("#carteInteractive").addClass("dansFormation");
            $("#carteInteractive").removeClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#BJ").removeClass("hoverstate");
            $("#lycee").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#emse").hover(
        function () {
            //Event one mouse enter add class
            $("#StEtienne").addClass("hoverstate");
            $("#emse").addClass("hoverstate");
            $("#canada").removeClass("active");
            $("#france").removeClass("inactive");

            $("#carteInteractive").addClass("dansFormation");
            $("#carteInteractive").removeClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#StEtienne").removeClass("hoverstate");
            $("#emse").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#prepa").hover(
        function () {
            //Event one mouse enter add class
            $("#Voiron").addClass("hoverstate");
            $("#prepa").addClass("hoverstate");
            $("#canada").removeClass("active");
            $("#france").removeClass("inactive");

            $("#carteInteractive").addClass("dansFormation");
            $("#carteInteractive").removeClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#Voiron").removeClass("hoverstate");
            $("#prepa").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#poly").hover(
        function () {
            //Event one mouse enter add class
            $("#Mtl").addClass("hoverstate");
            $("#poly").addClass("hoverstate");
            $("#canada").addClass("active");
            $("#france").addClass("inactive");

            $("#carteInteractive").addClass("dansFormation");
            $("#carteInteractive").removeClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#Mtl").removeClass("hoverstate");
            $("#poly").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#CET").hover(
        function () {
            $("#Grenoble").addClass("hoverstate");
            $("#CET").addClass("hoverstate");
            $("#canada").addClass("inactive");
            $("#france").addClass("acttive");

            $("#carteInteractive").addClass("dansProfessionnel");
            $("#carteInteractive").removeClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansFormation");
        },
        // Event two mouse out remove class
        function () {
            $("#Grenoble").removeClass("hoverstate");
            $("#CET").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#porcher").hover(
        function () {
            $("#BJ").addClass("hoverstate");
            $("#porcher").addClass("hoverstate");
            $("#canada").addClass("inactive");
            $("#france").addClass("acttive");

            $("#carteInteractive").addClass("dansProfessionnel");
            $("#carteInteractive").removeClass("dansFormation");
            $("#carteInteractive").removeClass("dansAssociatif");
        },
        // Event two mouse out remove class
        function () {
            $("#BJ").removeClass("hoverstate");
            $("#porcher").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#MEP").hover(
        function () {
            $("#StEtienne").addClass("hoverstate");
            $("#MEP").addClass("hoverstate");
            $("#canada").addClass("inactive");
            $("#france").addClass("acttive");

            $("#carteInteractive").addClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansFormation");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#MEP").removeClass("hoverstate");
            $("#StEtienne").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#astronoMines").hover(
        function () {
            $("#StEtienne").addClass("hoverstate");
            $("#astronoMines").addClass("hoverstate");
            $("#canada").addClass("inactive");
            $("#france").addClass("acttive");

            $("#carteInteractive").addClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansFormation");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#astronoMines").removeClass("hoverstate");
            $("#StEtienne").removeClass("hoverstate");
        }
    );
});

$(document).ready(function () {
    // Call the event handler
    $("#BDE").hover(
        function () {
            $("#StEtienne").addClass("hoverstate");
            $("#BDE").addClass("hoverstate");
            $("#canada").addClass("inactive");
            $("#france").addClass("acttive");

            $("#carteInteractive").addClass("dansAssociatif");
            $("#carteInteractive").removeClass("dansFormation");
            $("#carteInteractive").removeClass("dansProfessionnel");
        },
        // Event two mouse out remove class
        function () {
            $("#BDE").removeClass("hoverstate");
            $("#StEtienne").removeClass("hoverstate");
        }
    );
});
