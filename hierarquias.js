//Essas hierarquias estão vinculadas aos cards da página de login
//Relatórios

const hierarquias = {
    ADMIN: {
        nivel: 5,
        permissoes: [
            'resumoMensal', 
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes',
            'relApresentacao',
            'acessoRapido'
        ]
    },
    Pastor: {
        nivel: 4,
        permissoes: [
            'resumoMensal', 
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes',
            'relApresentacao'
        ]
    },
    Coordenador: {
        nivel: 3,
        permissoes: [
            'resumoMensal', 
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes'
        ]
    },
    Supervisor: {
        nivel: 2,
        permissoes: [
            'resumoMensal', 
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes'
        ]
    },
    Lider: {
        nivel: 1,
        permissoes: [
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes'
        ]
    },
    Membro: {
        nivel: 0,
        permissoes: [
            'organograma', 
            'indicadores', 
            'relatorioMembros', 
            'dadosReunioes']
    }
};

function temPermissao(funcao, permissao) {
    return hierarquias[funcao] && hierarquias[funcao].permissoes.includes(permissao);
}

function getNivelHierarquico(funcao) {
    return hierarquias[funcao] ? hierarquias[funcao].nivel : -1;
}
