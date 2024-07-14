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
