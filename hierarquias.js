//Essas hierarquias estão vinculadas aos cards da página de login
//Relatórios
//frmEM

const hierarquias = {
    ADMIN: {
        nivel: 5,
        permissoes: ['*'] // Acesso universal - não precisa listar permissões específicas
    },
    Pastor: {
        nivel: 4,
        permissoes: [
            'resumoMensal',
            'organograma',
            'relResumoMesCelula',
            'indicadores',
            'relatorioMembros',
            'dadosReunioes',
            'relApresentacao',

            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia',
            'admIncricoes',
            'admTurmas'
        ]
    },
    Coordenador: {
        nivel: 3,
        permissoes: [
            'resumoMensal',
            'organograma',
            'relResumoMesCelula',
            'indicadores',
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia',
            'admIncricoes',
            'admTurmas'
        ]
    },
    Supervisor: {
        nivel: 2,
        permissoes: [
            'resumoMensal',
            'organograma',
            'relResumoMesCelula',
            'indicadores',
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia',
        ]
    },
    Lider: {
        nivel: 1,
        permissoes: [
            'organograma',
            'relResumoMesCelula',
            'indicadores',
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes'
        ]
    },

        Líder: {
    },

        LÍDER: {
    },
    
    Membro: {
        nivel: 0,
        permissoes: [
            'organograma',
            'indicadores',
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes'
        ]
    },

    // Adicionando funções específicas da Escola Ministerial
    COORDENADOR: {
        nivel: 3,
        permissoes: [
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia',
            'admIncricoes',
            'admTurmas'
        ]
    },
    SUPERVISOR: {
        nivel: 2,
        permissoes: [
            'relatorioMembros',

            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia',
            'admIncricoes',
            'admTurmas'
        ]
    },
    PROFESSOR: {
        nivel: 1,
        permissoes: [
            'relatorioMembros',
            
            // Escola Ministerial frmEM
            'inscricoes',
            'chamada',
            'frequencia'
        ]
    },
    Aluno: {
        nivel: 0,
        permissoes: [
            // Escola Ministerial frmEM
            'inscricoes'
        ]
    }
};

function temPermissao(funcao, permissao) {
    // ADMIN tem acesso universal a tudo
    if (funcao === 'ADMIN' && hierarquias[funcao]) {
        return true;
    }
    return hierarquias[funcao] && hierarquias[funcao].permissoes.includes(permissao);
}

function getNivelHierarquico(funcao) {
    return hierarquias[funcao] ? hierarquias[funcao].nivel : -1;
}
