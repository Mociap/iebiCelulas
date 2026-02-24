(function () {
    if (typeof firebase === 'undefined') return;
    if (!firebase.apps || firebase.apps.length === 0) {
        const config = {
            apiKey: "AIzaSyCEqseDS-_OSmdfGf-NNflAJnS_AT5i1-U",
            authDomain: "dbiebi.firebaseapp.com",
            databaseURL: "https://dbiebi-default-rtdb.firebaseio.com",
            projectId: "dbiebi",
            storageBucket: "dbiebi.appspot.com",
            messagingSenderId: "1068164821081",
            appId: "1:1068164821081:web:2d3e0030d5311d94f30148"
        };
        firebase.initializeApp(config);
    }

    function verificarTempoSessao() {
        const tempoLogin = localStorage.getItem('tempoLogin');
        const tempoAtual = new Date().getTime();
        const tempoLimite = 30 * 60 * 1000;

        if (tempoLogin && tempoAtual - tempoLogin > tempoLimite) {
            firebase.auth().signOut().then(() => {
                localStorage.clear();
                window.location.href = `${location.origin}/formlogin.html`;
            }).catch(() => {});
        }
    }

    setInterval(verificarTempoSessao, 60000);
    verificarTempoSessao();
})();

