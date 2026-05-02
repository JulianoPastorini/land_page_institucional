// Banco de Dados de Competências - Usado para renderização dinâmica do DOM
export const skillsData = {
    hardSkills: [
        {
            category: 'Linguagens de Programação',
            icon: '💻',
            skills: [
                { name: 'JavaScript', level: 90 },
                { name: 'Python', level: 85 },
                { name: 'HTML5', level: 95 },
                { name: 'CSS3', level: 90 },
                { name: 'Java', level: 75 }
            ]
        },
        {
            category: 'Frameworks & Bibliotecas Web',
            icon: '🎨',
            skills: [
                { name: 'React', level: 80 },
                { name: 'Vue.js', level: 75 },
                { name: 'Node.js', level: 80 },
                { name: 'Express', level: 78 },
                { name: 'Django', level: 70 }
            ]
        },
        {
            category: 'Ferramentas & Plataformas',
            icon: '⚙️',
            skills: [
                { name: 'Git & GitHub', level: 85 },
                { name: 'Docker', level: 70 },
                { name: 'AWS', level: 65 },
                { name: 'VS Code', level: 95 },
                { name: 'npm/yarn', level: 88 }
            ]
        },
        {
            category: 'Bancos de Dados',
            icon: '🗄️',
            skills: [
                { name: 'MySQL', level: 80 },
                { name: 'PostgreSQL', level: 78 },
                { name: 'MongoDB', level: 75 },
                { name: 'Redis', level: 70 }
            ]
        }
    ],
    
    softSkills: [
        {
            name: 'Liderança',
            level: 85,
            icon: '👥'
        },
        {
            name: 'Comunicação',
            level: 88,
            icon: '🗣️'
        },
        {
            name: 'Resolução de Problemas',
            level: 90,
            icon: '🧩'
        },
        {
            name: 'Pensamento Crítico',
            level: 87,
            icon: '🧠'
        },
        {
            name: 'Trabalho em Equipe',
            level: 89,
            icon: '🤝'
        },
        {
            name: 'Gestão de Tempo',
            level: 86,
            icon: '⏱️'
        },
        {
            name: 'Adaptabilidade',
            level: 88,
            icon: '🔄'
        },
        {
            name: 'Pensamento Criativo',
            level: 85,
            icon: '💡'
        }
    ]
};
