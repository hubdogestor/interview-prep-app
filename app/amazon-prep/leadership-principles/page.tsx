import AmazonPortalSection from "@/components/amazon/portal-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import "../styles.css";

type Principle = {
  id: number;
  title: string;
  description: string;
  color: string;
  relevance: string;
  keyPoints: string[];
  starExample: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
};

const principles: Principle[] = [
  {
    id: 1,
    title: "Customer Obsession",
    description: "Comece por Andreia, Sujash e merchants: métricas de aprovação, NPS e segurança ancoram cada priorização.",
    color: "bg-amber-500",
    relevance: "North Star do Payment Ops",
    keyPoints: [
      "Transformar feedback do cliente em backlog acionável",
      "Observar sinais de Oakberry e sellers antes de indicadores internos",
      "Documentar aprendizados em WBR/PRFAQ",
    ],
    starExample: {
      situation: "Oakberry reportou queda de 6pp em aprovação PIX durante almoço.",
      task: "Isolar impacto real para evitar perda de receita.",
      action: "Escutei o merchant ao vivo, coletei logs, montei task-force com Eng + Science e criei workaround temporário.",
      result: "Recuperamos aprovação em 8h, reduzimos churn potencial de R$ 1.4M e adicionamos métricas de cliente no scorecard.",
    },
  },
  {
    id: 2,
    title: "Ownership",
    description: "Assuma scorecard LATAM end-to-end, mesmo quando depende de Engenharia, Finance ou parceiros externos.",
    color: "bg-slate-600",
    relevance: "Responsabilidade total",
    keyPoints: [
      "Resolver gaps sem esperar direcionamento",
      "Conectar decisões locais a impactos globais",
      "Registrar compromissos e follow-ups no log",
    ],
    starExample: {
      situation: "Monitoramento de reconciliação estava com alertas falsos e ninguém era owner claro.",
      task: "Tomar posse do processo e estabilizar em 2 semanas.",
      action: "Mapeei fluxo ponta a ponta, reescrevi playbook, alinhei SLO com Finance e institui on-call compartilhado.",
      result: "Alertas falsos caíram 78%, reconciliação diária passou de 86% para 99% e Andreia delegou o domínio oficialmente.",
    },
  },
  {
    id: 3,
    title: "Invent and Simplify",
    description: "Automatize rotinas (approval review, alarmes, status Oakberry) para liberar tempo estratégico.",
    color: "bg-purple-500",
    relevance: "Escala com menos atrito",
    keyPoints: [
      "Eliminar passos manuais no runbook",
      "Usar IA/LLMs apenas onde há dados confiáveis",
      "Compartilhar templates com outras regiões",
    ],
    starExample: {
      situation: "Processo de RCA levava 5 dias e 12 stakeholders.",
      task: "Criar mecanismo simples que coubesse no Friday Reset.",
      action: "Desenhei formulário único com automação no Quip + webhook para Jira e dashboards no Looker.",
      result: "Tempo médio caiu para 36h, Andreia usa o template em toda LATAM e India adotou igual.",
    },
  },
  {
    id: 4,
    title: "Are Right, A Lot",
    description: "Decisões sobre rollouts, mitigação e investimentos precisam equilibrar dados, faro e intuição técnica.",
    color: "bg-blue-500",
    relevance: "Credibilidade com VP",
    keyPoints: [
      "Testar hipóteses antes do WBR",
      "Buscar disconfirming evidence",
      "Atualizar narrativa quando fatos mudam",
    ],
    starExample: {
      situation: "Discussão sobre investir em antifraude third-party vs. solução interna.",
      task: "Emitir recomendação em 48h.",
      action: "Rodamos análise de custo total, simulamos impacto no approval e entrevistei 3 parceiros.",
      result: "Escolhemos modelo híbrido que economizou US$ 2.2M/ano e ganhou elogio do diretor financeiro.",
    },
  },
  {
    id: 5,
    title: "Learn and Be Curious",
    description: "Dedique horas semanais a AI/ML, Open Finance e regulações brasileiras para antecipar riscos.",
    color: "bg-emerald-500",
    relevance: "Atualização constante",
    keyPoints: [
      "Rodar deep dives mensais com Tech/Legal",
      "Documentar aprendizados no Confluence",
      "Trazer referências de Índia/EUA para LATAM",
    ],
    starExample: {
      situation: "Time precisava de visão sobre algoritmos anti-fricção em PIX.",
      task: "Aprender rápido e orientar Engenharia.",
      action: "Estudei papers do BCB, conversei com India Payments e criei doc com 3 padrões arquiteturais.",
      result: "Time implementou solução baseada em fecho criptográfico, reduzindo latência média em 14%.",
    },
  },
  {
    id: 6,
    title: "Hire and Develop the Best",
    description: "Elevar a barra em contratações e formalizar planos de desenvolvimento desde o onboarding.",
    color: "bg-pink-500",
    relevance: "Escala sustentável",
    keyPoints: [
      "Definir rubrica específica para Payment Ops",
      "Promover mentoring cruzado com Andreia e Science",
      "Criar pipeline para contractors críticos",
    ],
    starExample: {
      situation: "Precisávamos dobrar headcount em 6 meses sem perder qualidade.",
      task: "Conduzir hiring bar-raiser e plano de crescimento.",
      action: "Atualizei rubrica, treinei entrevistadores e criei onboarding de 60 dias com buddy técnico.",
      result: "Contratamos 5 PMs, retention 100% em 12 meses, dois promovidos a Senior.",
    },
  },
  {
    id: 7,
    title: "Insist on the Highest Standards",
    description: "Runbooks, PR/FAQ e alarmes precisam estar auditáveis e prontos para OP1 a qualquer momento.",
    color: "bg-indigo-500",
    relevance: "Qualidade operacional",
    keyPoints: [
      "Auditar documentação a cada sprint",
      "Medir SLAs e corrigir desvios imediatamente",
      "Evitar atalhos que criem dívida",
    ],
    starExample: {
      situation: "SLA de disponibilidade era 99.5% e atendia contrato, mas caía em picos.",
      task: "Elevar padrão para 99.95% antes da Black Friday.",
      action: "Liderei revisão arquitetural, ativei multi-região e institui chaos game mensal.",
      result: "BF passou com 0 incidentes críticos e uptime 99.97%.",
    },
  },
  {
    id: 8,
    title: "Think Big",
    description: "Desenhe visão LATAM para PIX automático, Oakberry e futura carteira Amazon",
    color: "bg-cyan-500",
    relevance: "Direção de 3 anos",
    keyPoints: [
      "Traduzir ambição em roadmap trimestral",
      "Criar mecanismos replicáveis para outros países",
      "Narrar a visão em docs curtos",
    ],
    starExample: {
      situation: "Operação era reativa a incidentes.",
      task: "Criar plataforma preditiva em 18 meses.",
      action: "Desenhei roadmap trienal, garanti budget com Sujash e formei squad dedicado.",
      result: "82% das rotinas automatizadas e 91% dos incidentes previstos antes de impactar clientes.",
    },
  },
  {
    id: 9,
    title: "Bias for Action",
    description: "Decisões reversíveis (roteamento, incentivos, limites) devem sair em <24h com telemetria.",
    color: "bg-orange-500",
    relevance: "Velocidade controlada",
    keyPoints: [
      "Definir guardrails de risco",
      "Executar pilotos limitados",
      "Medir impacto e reverter rápido",
    ],
    starExample: {
      situation: "Nova regra do BCB precisava ser implementada em 45 dias.",
      task: "Adequar stack sem parar o checkout.",
      action: "Modelei MVP compliant, criei war room diário e lancei rollout progressivo (1→10→50→100%).",
      result: "Regra ativa 7 dias antes do deadline, zero downtime e evitamos multa potencial.",
    },
  },
  {
    id: 10,
    title: "Frugality",
    description: "Cada melhoria precisa reduzir COGS ou liberar capacidade sem inflar headcount.",
    color: "bg-lime-500",
    relevance: "Custo por transação",
    keyPoints: [
      "Comparar build vs. buy continuamente",
      "Reaproveitar assets da Índia/EUA",
      "Criar métricas de payback",
    ],
    starExample: {
      situation: "Ferramenta de analytics custaria R$ 450K/ano.",
      task: "Criar alternativa 70% mais barata.",
      action: "Combinei stack open-source + AWS gerenciado, com squad part-time.",
      result: "Economia de 85% e dashboards customizados para Andreia.",
    },
  },
  {
    id: 11,
    title: "Earn Trust",
    description: "Transparência radical em riscos, erros e decisões fortalece relação com Andreia/Sujash.",
    color: "bg-teal-500",
    relevance: "Relacionamentos sólidos",
    keyPoints: [
      "Compartilhar planos de mitigação junto com problemas",
      "Pedir feedback mensalmente",
      "Fechar loops em até 24h",
    ],
    starExample: {
      situation: "Migração de gateway atrasou 3 semanas e extrapolou budget.",
      task: "Comunicar e recuperar confiança.",
      action: "Montei doc franco com root causes, plano revisado e cadência semanal aberta.",
      result: "Projeto recuperado, excesso de custo caiu para 8% e recebi elogio público do VP.",
    },
  },
  {
    id: 12,
    title: "Dive Deep",
    description: "Operar em múltiplos níveis — do PR/FAQ ao log de transação — para destravar investigações.",
    color: "bg-rose-500",
    relevance: "Diagnóstico rápido",
    keyPoints: [
      "Auditar métricas vs. anedotas",
      "Ler dashboards e logs pessoalmente",
      "Questionar suposições do time",
    ],
    starExample: {
      situation: "Approval rate global parecia saudável, mas sellers reclamavam.",
      task: "Encontrar discrepância real.",
      action: "Analisei dados brutos, incluí timeouts e identifiquei bandeira específica às sextas.",
      result: "Fix elevou aprovação real de 78% para 94% e evitou perda de R$ 2.8M/mês.",
    },
  },
  {
    id: 13,
    title: "Have Backbone; Disagree and Commit",
    description: "Desafie decisões com dados, documente trade-offs e comprometa-se totalmente pós-alinhamento.",
    color: "bg-violet-500",
    relevance: "Coragem + execução",
    keyPoints: [
      "Registrar discordâncias no decision log",
      "Trazer alternativas concretas",
      "Executar com excelência mesmo quando não era sua opção preferida",
    ],
    starExample: {
      situation: "Marketing queria lançar parcelado em 4 semanas com alto risco.",
      task: "Defender soft launch sem atrasar meta.",
      action: "Escrevi doc com riscos quantificados e proposta híbrida; fui overruled e liderei o launch mesmo assim.",
      result: "Feature saiu no prazo e riscos previstos foram mitigados em 72h graças aos planos preparados.",
    },
  },
  {
    id: 14,
    title: "Deliver Results",
    description: "Conectar inputs críticos (approval, custo, SLA) a entregas trimestrais mesmo com ruído de mercado.",
    color: "bg-emerald-500",
    relevance: "Expectativa básica",
    keyPoints: [
      "Desdobrar metas em iniciativas",
      "Monitorar progresso semanalmente",
      "Remover bloqueios rápido",
    ],
    starExample: {
      situation: "Meta Q4 exigia -15% custo/txn e +3pp approval em meio à recessão.",
      task: "Entregar ambos resultados.",
      action: "Renegociei MDR, implementei roteamento inteligente e reduzi falsos positivos.",
      result: "Custo caiu 17.3%, approval +3.3pp e evitamos R$ 4.2M em despesas.",
    },
  },
  {
    id: 15,
    title: "Strive to be Earth's Best Employer",
    description: "Manter o squad saudável, com rituais de energia e plano de crescimento claro.",
    color: "bg-sky-500",
    relevance: "Time sustentável",
    keyPoints: [
      "Monitorar carga e eNPS",
      "Criar mecanismos de reconhecimento",
      "Garantir espaço para aprendizado",
    ],
    starExample: {
      situation: "Burnout elevado após ciclo de incidentes.",
      task: "Recuperar moral sem perder entrega.",
      action: "Implementei no-meeting Friday, rotação de guardas e programa de reconhecimento trimestral.",
      result: "eNPS subiu de 3.2 para 8.4 e produtividade +35%.",
    },
  },
  {
    id: 16,
    title: "Success and Scale Bring Broad Responsibility",
    description: "Considerar impactos secundários (inclusão financeira, compliance, dados) antes de automatizar.",
    color: "bg-yellow-600",
    relevance: "Responsabilidade regional",
    keyPoints: [
      "Medir fairness e impacto social",
      "Criar salvaguardas de IA",
      "Compartilhar aprendizados com o ecossistema",
    ],
    starExample: {
      situation: "Modelo antifraude reduziu perdas mas penalizou clientes de baixa renda.",
      task: "Corrigir viés sem abrir brechas.",
      action: "Adicionei features alternativas, human-in-loop e métricas de fairness por região.",
      result: "Falsos positivos -67% e aprovação de novos clientes +28% mantendo segurança.",
    },
  },
];

const firstQuarterFocus: Record<number, string> = {
  1: "Mapear três jornadas prioritárias (Prime, Oakberry, Marketplace) e converter feedback em melhorias mensuráveis.",
  2: "Assumir ownership do scorecard LATAM e liderar comunicações mesmo quando o tema cruza outras áreas.",
  3: "Entregar pelo menos uma automação que reduza esforço operacional com métricas claras de impacto.",
  4: "Criar doc semanal com hipóteses e dados para decisões rápidas sobre incidentes ou investimentos.",
  5: "Reservar horas recorrentes para estudos de AI/ML e compartilhar aprendizados com o time.",
  6: "Montar plano de desenvolvimento para cada membro do squad e preparar pipeline de talentos.",
  7: "Atualizar runbooks e SLAs garantindo auditoria impecável e zero dívida operacional escondida.",
  8: "Desenhar visão LATAM para pagamentos instantâneos e conectar com OKRs regionais.",
  9: "Estabelecer mecanismo de decisão rápida (<24h) para incidentes reversíveis, com métricas pós-ação.",
 10: "Revisar contratos/processos e propor pelo menos um ajuste que reduza custo por transação.",
 11: "Implementar rituais de transparência (logs de decisões, follow-ups rápidos) e pedir feedback ativo.",
 12: "Rodar auditorias surpresa em métricas críticas (approval, reconciliação) para evitar gaps.",
 13: "Documentar desacordos relevantes, alinhar trade-offs e registrar compromissos após decisão.",
 14: "Vincular cada iniciativa a inputs-chave e reportar progresso semanalmente com métricas.",
 15: "Configurar rituais de energia do time (retros, office hours) e monitorar carga de trabalho.",
 16: "Mapear impactos secundários de automações/AI e criar métricas de fairness e compliance.",
};

export default function LeadershipPrinciplesPage() {
  return (
    <AmazonPortalSection
      title="Leadership Playbook"
      description="Guia para aplicar os 16 Leadership Principles durante o onboarding no Payment Business Operation. Cada princípio vem com exemplos reais, sinais e como ativá-lo nas primeiras 12 semanas."
      kicker="LPs em operação"
      updatedAt="23·11·2025"
    >
      <Card className="amazon-portal-card">
        <div className="flex flex-col gap-2">
          <h3 className="amazon-prep-section-title">Como usar</h3>
          <p className="text-sm text-muted-foreground">
            Antes de cada decisão ou ritual, valide quais princípios estão em jogo, quais métricas provam o impacto e o que precisa ser documentado para Andreia e Sujash.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Badge variant="outline">1 · Preparar contexto</Badge>
              <p className="text-sm text-muted-foreground mt-2">Use dados e sinais de cliente para ancorar a conversa.</p>
            </div>
            <div>
              <Badge variant="outline">2 · Aplicar princípio</Badge>
              <p className="text-sm text-muted-foreground mt-2">Escolha o comportamento dominante e detalhe ações concretas.</p>
            </div>
            <div>
              <Badge variant="outline">3 · Registrar impacto</Badge>
              <p className="text-sm text-muted-foreground mt-2">Documente o resultado no log de decisões e conecte ao scorecard.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {principles.map((principle) => (
          <Card key={principle.id} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`${principle.color} text-white`}>{principle.title}</Badge>
                <span className="text-sm text-muted-foreground">{principle.relevance}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{principle.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Como aparece no dia a dia</p>
                  <ul className="amazon-portal-list list-disc list-inside">
                    {principle.keyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Foco nos primeiros 90 dias</p>
                  <p className="text-sm text-muted-foreground">{firstQuarterFocus[principle.id]}</p>
                </div>
                <div className="amazon-portal-card">
                  <p className="amazon-portal-card-title">Exemplo operacional (STAR)</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`example-${principle.id}`}>
                      <AccordionTrigger className="amazon-prep-accordion-trigger">
                        Ver detalhes
                      </AccordionTrigger>
                      <AccordionContent className="amazon-prep-accordion-content text-sm space-y-2 text-muted-foreground">
                        <p>
                          <strong>Situation:</strong> {principle.starExample.situation}
                        </p>
                        <p>
                          <strong>Task:</strong> {principle.starExample.task}
                        </p>
                        <p>
                          <strong>Action:</strong> {principle.starExample.action}
                        </p>
                        <p>
                          <strong>Result:</strong> {principle.starExample.result}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AmazonPortalSection>
  );
}
