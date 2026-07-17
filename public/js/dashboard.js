console.log("🚀 Dashboard iniciado.");

// ============================================
// AUXILIAR
// ============================================

function texto(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.textContent = valor;

}

// ============================================
// DASHBOARD
// ============================================

async function atualizarDashboard() {

    try {

        const response = await fetch("/api/dashboard");

        if (response.status === 204) {

            return;

        }

        const snapshot = await response.json();

        preencherCards(snapshot);

    } catch (err) {

        console.error("Erro ao atualizar Dashboard:", err);

    }

}

function preencherCards(snapshot) {

    // BOT

    texto("bot-state", snapshot.botState);

    texto("bot-broker", snapshot.broker);

    texto("bot-strategy", snapshot.strategy);

    // FINANCEIRO

    texto(
        "financial-profit",
        `${Number(snapshot.financial.totalProfit).toFixed(2)} USD`
    );

    texto(
        "financial-trades",
        snapshot.financial.totalTrades
    );

    texto(
        "financial-wins",
        snapshot.financial.wins
    );

    texto(
        "financial-losses",
        snapshot.financial.losses
    );

    const total = snapshot.financial.totalTrades;

    const rate =
        total > 0
            ? ((snapshot.financial.wins / total) * 100).toFixed(1)
            : "0.0";

    texto("financial-winrate", `${rate}%`);

    // MERCADO

    texto(
        "market-symbol",
        snapshot.market?.display_name ||
        snapshot.market?.underlying_symbol ||
        "---"
    );

    texto(
        "last-update",
        new Date(snapshot.timestamp).toLocaleTimeString()
    );

}

// ============================================
// ANALYTICS
// ============================================

async function atualizarAnalytics() {

    try {

        const response = await fetch("/api/analytics");

        const analytics = await response.json();

        texto("analytics-trades", analytics.totalTrades);

        texto("analytics-wins", analytics.wins);

        texto("analytics-losses", analytics.losses);

        texto("analytics-winrate", `${analytics.winRate}%`);

    } catch (err) {

        console.error("Erro ao atualizar Analytics:", err);

    }

}

// ============================================
// HISTÓRICO
// ============================================

async function atualizarHistorico() {

    try {

        const response = await fetch("/api/history");

        const historico = await response.json();

        preencherHistorico(historico);

    } catch (err) {

        console.error("Erro ao buscar histórico:", err);

    }

}

function preencherHistorico(historico) {

    const tbody = document.getElementById("operations-body");

    if (!tbody) return;

    if (!historico.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhuma operação encontrada.
                </td>
            </tr>
        `;

        return;

    }

    tbody.innerHTML = "";

    historico.forEach(op => {

        const hora = new Date(op.time).toLocaleTimeString();

        const lucro = Number(op.profit).toFixed(2);

        const status =
            op.result === "won"
                ? "✅ WIN"
                : "❌ LOSS";

        tbody.innerHTML += `
            <tr>
                <td>${hora}</td>
                <td>${op.symbol}</td>
                <td>${op.direction}</td>
                <td>${op.stake}</td>
                <td>${status}</td>
                <td>${lucro} USD</td>
            </tr>
        `;

    });

}

// ============================================
// SESSÃO
// ============================================

async function atualizarSessao() {

    try {

        const response = await fetch("/api/session");

        const sessao = await response.json();

        preencherSessao(sessao);

    } catch (err) {

        console.error("Erro ao atualizar Sessão:", err);

    }

}

function preencherSessao(sessao) {

    texto("session-trades", sessao.trades);

    texto("session-wins", sessao.wins);

    texto("session-losses", sessao.losses);

    const rate =
        sessao.trades > 0
            ? ((sessao.wins / sessao.trades) * 100).toFixed(1)
            : "0.0";

    texto("session-winrate", `${rate}%`);

    texto(
        "session-profit",
        `${Number(sessao.totalProfit).toFixed(2)} USD`
    );

}

// ============================================
// PERFORMANCE
// ============================================

async function atualizarPerformance() {

    try {

        const response = await fetch("/api/performance");

        const performance = await response.json();

        preencherPerformance(performance);

    } catch (err) {

        console.error("Erro ao atualizar Performance:", err);

    }

}

function preencherPerformance(performance) {

    texto("performance-trades", performance.totalTrades);

    texto(
        "performance-winrate",
        `${performance.winRate}%`
    );

    texto(
        "performance-average-win",
        `${performance.averageWin} USD`
    );

    texto(
        "performance-average-loss",
        `${performance.averageLoss} USD`
    );

    texto(
        "performance-payoff",
        performance.payoff
    );

    texto(
        "performance-profitfactor",
        performance.profitFactor
    );

    texto(
        "performance-expectancy",
        performance.expectancy
    );

    texto(
        "performance-biggest-win",
        `${performance.biggestWin} USD`
    );

    texto(
        "performance-biggest-loss",
        `${performance.biggestLoss} USD`
    );

}

// ============================================
// INTELLIGENCE
// ============================================

async function atualizarIntelligence() {

    try {

        const response = await fetch("/api/intelligence");

        const intelligence = await response.json();

        preencherIntelligence(intelligence);

    } catch (err) {

        console.error("Erro ao atualizar Intelligence:", err);

    }

}

function preencherIntelligence(intelligence) {

    texto("intel-status", intelligence.status);

    texto(
        "intel-confidence",
        `${intelligence.confidence}%`
    );

    texto(
        "intel-recommendation",
        intelligence.recommendation
    );

    texto(
        "intel-summary",
        intelligence.summary
    );

}

// ============================================
// LOOP
// ============================================

setInterval(() => {

    atualizarDashboard();

    atualizarAnalytics();

    atualizarHistorico();

    atualizarSessao();

    atualizarPerformance();

    atualizarIntelligence();

}, 1000);

// ============================================
// PRIMEIRA CARGA
// ============================================

atualizarDashboard();

atualizarAnalytics();

atualizarHistorico();

atualizarSessao();

atualizarPerformance();

atualizarIntelligence();