// Alliance Configuration
const alliances = [
    {
        id: 'panthera',
        name: 'Panthera',
        symbol: '🐆',
        primary: '#FFD700',
        secondary: '#000000',
        background: 'assets/backgrounds/panthera-bg.png',
        traits: ['marrom', 'preto'],
        abilities: {
            queen: 'Rugido da Savana: +25% Ataque por 2 turnos',
            general: 'Emboscada Predatória: Ataque duplo se Defesa <50%',
            warrior: 'Fúria Selvagem: +15% Ataque por aliado Panthera',
            doctor: 'Cura Ancestral: Revive 1 aliado com 50% Vida'
        }
    },
    {
        id: 'ignis',
        name: 'Ignis',
        symbol: '🔥',
        primary: '#FF4500',
        secondary: '#CD7F32',
        background: 'assets/backgrounds/ignis-bg.png',
        traits: ['clara', 'vermelho'],
        abilities: {
            queen: 'Inferno Vulcânico: Queima 5% Vida/turno',
            general: 'Tática de Escaramuça: +30% Dano no primeiro ataque',
            warrior: 'Lâmina Flamejante: Aplica queimadura contínua',
            doctor: 'Fênix Renascida: Revive com 75% Vida'
        }
    },
    {
        id: 'lunaris',
        name: 'Lunaris',
        symbol: '🌙',
        primary: '#C0C0C0',
        secondary: '#87CEEB',
        background: 'assets/backgrounds/lunaris-bg.png',
        traits: ['clara', 'loiro'],
        abilities: {
            queen: 'Barreira Lunar: Absorve 1 ataque completo',
            general: 'Escudo Prateado: +40% Defesa por 3 turnos',
            warrior: 'Golpe Crescente: Dano aumenta a cada turno',
            doctor: 'Cura Lunar: Cura 25% Vida para todos aliados'
        }
    },
    {
        id: 'onyx',
        name: 'Onyx',
        symbol: '🦂',
        primary: '#800080',
        secondary: '#4B5320',
        background: 'assets/backgrounds/onyx-bg.png',
        traits: ['oliva', 'preto'],
        abilities: {
            queen: 'Veneno Imperial: Envenena todos os inimigos',
            general: 'Golpe Furtivo: Ignora 50% da Defesa',
            warrior: 'Picada Tóxica: Envenena por 3 turnos',
            doctor: 'Antídoto Ofídico: Remove todos os venenos'
        }
    },
    {
        id: 'solare',
        name: 'Solare',
        symbol: '☀️',
        primary: '#DAA520',
        secondary: '#C2B280',
        background: 'assets/backgrounds/solare-bg.png',
        traits: ['oliva', 'castanho'],
        abilities: {
            queen: 'Decreto Solar: Imune a debuffs por 2 turnos',
            general: 'Estratégia Radiante: +20% Dano em luz solar',
            warrior: 'Golpe Ofuscante: Chance de cegar inimigos',
            doctor: 'Bênção Solar: Cura + Escudo de 20%'
        }
    },
    {
        id: 'vespera',
        name: 'Véspera',
        symbol: '🐺',
        primary: '#191970',
        secondary: '#F0FFFF',
        background: 'assets/backgrounds/vespera-bg.png',
        traits: ['clara', 'preto'],
        abilities: {
            queen: 'Emboscada Noturna: Ataque surpresa garantido',
            general: 'Tática de Inverno: Retarda inimigos em 1 turno',
            warrior: 'Golpe Duplo: Ataca duas vezes rapidamente',
            doctor: 'Cura Gélida: Congela ferimentos graves'
        }
    },
    {
        id: 'serpenta',
        name: 'Serpenta',
        symbol: '🐍',
        primary: '#50C878',
        secondary: '#654321',
        background: 'assets/backgrounds/serpenta-bg.png',
        traits: ['marrom', 'castanho'],
        abilities: {
            queen: 'Névoa Tóxica: Envenena área inteira',
            general: 'Tática de Selva: +40% Dano em florestas',
            warrior: 'Espinhos Venenosos: Dano refletido envenenado',
            doctor: 'Ervas Curativas: Cura 15% Vida/turno'
        }
    }
];

let currentAlliance = alliances[0];
let savedState = JSON.parse(localStorage.getItem('matriarchyCardData')) || {};

// Initialize Alliance Grid
function initAllianceGrid() {
    const grid = document.getElementById('allianceGrid');
    alliances.forEach(alliance => {
        const div = document.createElement('div');
        div.className = 'alliance-option';
        div.innerHTML = `
            <h3>${alliance.symbol} ${alliance.name}</h3>
            <p>${alliance.abilities.queen}</p>
        `;
        div.style.borderColor = alliance.primary;
        div.addEventListener('click', () => selectAlliance(alliance));
        grid.appendChild(div);
    });
}

// Auto-Detect Alliance from Photo (Mock Implementation)
function detectAlliance(skin, hair) {
    return alliances.find(a => 
        a.traits[0] === skin && 
        a.traits[1] === hair
    ) || alliances[0];
}

// Manual Alliance Selection
function selectAlliance(alliance) {
    currentAlliance = alliance;
    document.documentElement.style.setProperty('--primary-color', alliance.primary);
    document.documentElement.style.setProperty('--secondary-color', alliance.secondary);
    document.getElementById('allianceSymbol').textContent = alliance.symbol;
    document.getElementById('cardBackground').style.backgroundImage = `url(${alliance.background})`;
    updateCardTypeSymbol();
}

// Update Card Type Symbol
function updateCardTypeSymbol() {
    const symbol = document.getElementById('cardTypeSymbol');
    symbol.style.backgroundColor = currentAlliance.secondary;
    symbol.style.borderColor = currentAlliance.primary;
}

// Probability System
function calculateProbabilities(age, hasRoleBonus) {
    let probs = { queen: 0, general: 0, warrior: 0, doctor: 0 };
    
    if (age >= 40) probs = { queen: 50, general: 25, warrior: 5, doctor: 20 };
    else if (age >= 35) probs = { queen: 35, general: 40, warrior: 10, doctor: 15 };
    else if (age >= 30) probs = { queen: 10, general: 20, warrior: 50, doctor: 20 };
    else probs = { queen: 0, general: 10, warrior: 70, doctor: 20 };

    if (hasRoleBonus) {
        probs.queen += 20;
        probs.general += 15;
        probs.warrior = Math.max(0, probs.warrior - 35);
    }

    // Normalize to 100%
    const total = Object.values(probs).reduce((a, b) => a + b);
    return Object.fromEntries(
        Object.entries(probs).map(([k, v]) => [k, (v / total) * 100]
    );
}

// Generate Stats
function generateStats(cardType) {
    const stats = {
        queen: { attack: [80, 100], defense: [70, 90] },
        general: { attack: [75, 95], defense: [40, 60] },
        warrior: { attack: [50, 80], defense: [40, 70] },
        doctor: { attack: [20, 40], defense: [60, 80] }
    }[cardType];

    return {
        attack: Math.floor(Math.random() * (stats.attack[1] - stats.attack[0] + 1)) + stats.attack[0],
        defense: Math.floor(Math.random() * (stats.defense[1] - stats.defense[0] + 1)) + stats.defense[0]
    };
}

// Generate Card
function generateCard() {
    if (!document.getElementById('actressName').value) {
        showError('nameError', 'Digite o nome da atriz!');
        return;
    }

    const age = parseInt(document.getElementById('age').value);
    const hasRoleBonus = document.getElementById('roleBonus').checked;
    const probs = calculateProbabilities(age, hasRoleBonus);

    // Determine card type
    const random = Math.random() * 100;
    let cardType = 'warrior';
    if (random < probs.queen) cardType = 'queen';
    else if (random < probs.queen + probs.general) cardType = 'general';
    else if (random < probs.queen + probs.general + probs.doctor) cardType = 'doctor';

    // Update UI
    const stats = generateStats(cardType);
    document.getElementById('attackValue').textContent = stats.attack;
    document.getElementById('defenseValue').textContent = stats.defense;
    document.getElementById('abilityText').textContent = currentAlliance.abilities[cardType];
    document.getElementById('actressRealName').textContent = `Atriz: ${document.getElementById('actressName').value`;
    document.getElementById('cardType').textContent = 
        cardType === 'queen' ? 'Rainha' : 
        cardType === 'general' ? 'General' : 
        cardType === 'doctor' ? 'Sábia' : 'Guerreira';
}

// Download Card
async function downloadCard() {
    try {
        const canvas = await html2canvas(document.getElementById('cardPreview'));
        const link = document.createElement('a');
        link.download = `carta-matriarchy-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    } catch (error) {
        showError('allianceError', 'Erro ao gerar a carta!');
    }
}

// Error Handling
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => errorElement.style.display = 'none', 5000);
}

// Event Listeners
document.getElementById('age').addEventListener('input', function(e) {
    document.getElementById('ageDisplay').textContent = `${e.target.value} anos`;
});

document.getElementById('photoUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
        showError('photoError', 'Selecione um arquivo de imagem válido!');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('actorPhoto').src = event.target.result;
        // Mock color detection (replace with real implementation)
        const skin = document.getElementById('skinColor').value;
        const hair = document.getElementById('hairColor').value;
        const alliance = detectAlliance(skin, hair);
        selectAlliance(alliance);
    };
    reader.readAsDataURL(file);
});

// Initialize
initAllianceGrid();
selectAlliance(alliances[0]);
