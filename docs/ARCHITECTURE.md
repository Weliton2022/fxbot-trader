# FXBOT PLATFORM

## Arquitetura Oficial

Versão: 2.0

---

# Objetivo

O FXBOT é uma plataforma profissional de trading algorítmico baseada em arquitetura orientada a eventos (Event Driven Architecture).

Seu objetivo é oferecer:

- Múltiplas estratégias
- Múltiplos ativos
- Múltiplas corretoras
- Inteligência Artificial
- Gerenciamento de risco profissional
- Alta disponibilidade
- Recuperação automática de falhas

---

# Estrutura da Plataforma

CORE

- EventBus
- Events
- Logger

CONNECTION

- WebSocketService
- ConnectionManager
- RecoveryService *(em desenvolvimento)*
- PlatformSupervisor *(planejado)*

MARKET

- MarketEngine
- MarketDataEngine
- CandleEngine
- IndicatorEngine
- Scanner *(planejado)*

STRATEGIES

- StrategyEngine
- MovingAverageCross
- StrategyManager *(planejado)*
- RSI *(planejado)*
- MACD *(planejado)*
- Bollinger *(planejado)*
- Smart Money *(planejado)*
- AI Strategy *(planejado)*

EXECUTION

- ExecutionEngine
- ProposalEngine
- BuyEngine
- ContractMonitorEngine
- ContractResultEngine

RISK

- SignalValidator
- RiskManager
- MoneyManager

REPORTS

- Performance
- Statistics
- Trade History

DASHBOARD

- PlatformDashboardEngine

---

# Roadmap

## Sprint 1 ✅ Concluída

- Estrutura da plataforma
- EventBus
- Candles
- Indicadores
- Estratégia SMA
- Execução
- Compra
- Monitoramento de contratos
- Dashboard
- Estatísticas
- Money Manager

## Sprint 2 🚧 Em desenvolvimento

- Recovery Engine
- Reconexão automática
- Heartbeat
- Platform Supervisor

## Sprint 3

- Scanner Multi Ativos

## Sprint 4

- Multi Estratégias

## Sprint 5

- Decision Engine

## Sprint 6

- Inteligência Artificial

## Sprint 7

- Multi Broker

---

# Filosofia do Projeto

Todo módulo deve possuir apenas uma responsabilidade.

Toda comunicação entre módulos deve ocorrer através do EventBus.

Nenhum Engine deve depender diretamente de outro Engine.

A plataforma deve ser modular, escalável e preparada para crescimento.