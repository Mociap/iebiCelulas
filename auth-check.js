// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEqseDS-_OSmdfGf-NNflAJnS_AT5i1-U",
    authDomain: "dbiebi.firebaseapp.com",
    databaseURL: "https://dbiebi-default-rtdb.firebaseio.com",
    projectId: "dbiebi",
    storageBucket: "dbiebi.appspot.com",
    messagingSenderId: "1068164821081",
    appId: "1:1068164821081:web:2d3e0030d5311d94f30148"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function verificarTempoSessao() {
    const tempoLogin = localStorage.getItem('tempoLogin');
    const tempoAtual = new Date().getTime();
    const tempoLimite = 30 * 60 * 1000; // 30 minutos

    if (tempoAtual - tempoLogin > tempoLimite) {
        firebase.auth().signOut().then(() => {
            localStorage.clear();
            window.location.href = 'formlogin.html';
        }).catch((error) => {
            console.error('Erro ao fazer logout:', error);
        });
    }
}

setInterval(verificarTempoSessao, 60000);
verificarTempoSessao();

