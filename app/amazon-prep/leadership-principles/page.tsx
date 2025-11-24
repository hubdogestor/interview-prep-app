/* eslint-disable react/no-unescaped-entities */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import AmazonPortalSection from "@/components/amazon/portal-section";

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
              <p className="text-sm text-muted-foreground mt-2">Escolha o comportamento dominante (ex: Dive Deep) e detalhe ações.</p>
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
                        <p><strong>Situation:</strong> {principle.starExample.situation}</p>
                        <p><strong>Task:</strong> {principle.starExample.task}</p>
                        <p><strong>Action:</strong> {principle.starExample.action}</p>
                        <p><strong>Result:</strong> {principle.starExample.result}</p>
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
      situation: "Time de payments operations precisava crescer de 3 para 8 pessoas em 6 meses mantendo alta qualidade.",
      task: "Liderar processo de hiring e estabelecer programa de desenvolvimento.",
      action: "Criei rubrica de avaliação específica (skills técnicos + cultural fit), treinei 5 interviewers, participei de 23 entrevistas, implementei onboarding estruturado de 60 dias. Estabeleci mentoring 1:1, rotação de projetos e training budget de R$ 5K/pessoa.",
      result: "Contratamos 5 pessoas excelentes (retention 100% após 12 meses), 2 promovidos em 18 meses. eNPS do time subiu de 7.2 para 8.9. Time entregou 40% mais projetos com mesma qualidade.",
    },
    interviewQuestions: [
      "Descreva seu processo de hiring. Como você garante que está elevando o bar?",
      "Conte sobre alguém que você desenvolveu que foi promovido ou teve crescimento significativo.",
    ],
  },
  {
    id: 7,
    title: "Insist on the Highest Standards",
    description: "Leaders have relentlessly high standards. Many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services, and processes.",
    color: "bg-indigo-500",
    relevance: "Essencial para Payment Operations",
    keyPoints: [
      "Standards altíssimos de qualidade",
      "Não aceitar mediocridade",
      "Elevar o bar continuamente",
    ],
    starExample: {
      situation: "Sistema de pagamento tinha SLA de 99.5% uptime, que estava sendo cumprido, mas ainda causava problemas em momentos críticos.",
      task: "Elevar padrão para 99.95% (3x menos downtime permitido).",
      action: "Implementei arquitetura multi-region active-active, automated failover em <30s, chaos engineering mensal, monitoring em 5 camadas, runbooks para 100% dos cenários de incidente. Estabeleci cultura de blameless post-mortems.",
      result: "Alcançamos 99.97% uptime (melhor que target). Downtime anual caiu de 43h para 2.6h. Durante Black Friday, absorvemos pico de 12x volume normal sem incidente. Time recebeu reconhecimento de VP.",
    },
    interviewQuestions: [
      "Conte sobre uma vez que você recusou aceitar um resultado que outros consideravam 'bom o suficiente'.",
      "Descreva como você elevou os standards de qualidade em um projeto ou processo.",
    ],
  },
  {
    id: 8,
    title: "Think Big",
    description: "Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.",
    color: "bg-cyan-500",
    relevance: "Para visão de LATAM",
    keyPoints: [
      "Pensar grande e ousado",
      "Visão de longo prazo",
      "Inspirar o time com direção clara",
    ],
    starExample: {
      situation: "Payment ops da empresa era reativa e manual, gerenciando problemas conforme apareciam.",
      task: "Transformar de operação reativa para plataforma preditiva e automatizada.",
      action: "Propus roadmap de 18 meses: Fase 1 - Observabilidade total, Fase 2 - Automação de 80% das operações rotineiras, Fase 3 - ML preditivo para prevenir problemas. Evangelizei visão com stakeholders, consegui budget de R$ 3.2M, montei squad dedicado.",
      result: "Após 18 meses: 82% de automação, MTTR reduzido 73%, prevenimos 91% dos incidentes antes de impactar clientes. Operação se tornou benchmark interno. Modelo replicado em 3 outras regiões.",
    },
    interviewQuestions: [
      "Qual é a coisa mais ambiciosa que você já liderou? Qual foi o resultado?",
      "Descreva uma visão de longo prazo que você criou e como você a executou.",
    ],
  },
  {
    id: 9,
    title: "Bias for Action",
    description: "Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.",
    color: "bg-orange-500",
    relevance: "Critical em ambiente dinâmico",
    keyPoints: [
      "Agir rapidamente",
      "Decisões reversíveis não precisam de análise exaustiva",
      "Aceitar risco calculado",
    ],
    starExample: {
      situation: "Nova regulamentação do Banco Central seria implementada em 45 dias, impactando nosso fluxo de pagamentos PIX.",
      task: "Adequar sistema em tempo recorde sem parar operação.",
      action: "Organizei war room, daily standups, decisões rápidas sobre trade-offs. Priorizei MVP que atendia regulação com 'tech debt' documentado para refatorar depois. Deploy incremental em produção testando com 1%, 10%, 50%, 100% do tráfego.",
      result: "Entregamos em 38 dias (7 dias de buffer). Zero downtime. Compliance 100% desde dia 1 da nova regra. Refatoração de tech debt feita em sprint seguinte. Salvamos potencial multa de R$ 500K e mantivemos operação sem interrupções.",
    },
    interviewQuestions: [
      "Conte sobre uma vez que você teve que tomar uma decisão importante rapidamente com informação incompleta.",
      "Descreva um risco calculado que você tomou. O resultado foi positivo ou negativo? O que você aprendeu?",
    ],
  },
  {
    id: 10,
    title: "Frugality",
    description: "Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense.",
    color: "bg-lime-500",
    relevance: "Para otimização de custos",
    keyPoints: [
      "Fazer mais com menos",
      "Constraints geram criatividade",
      "Não há pontos extras por budget maior",
    ],
    starExample: {
      situation: "Precisávamos de solução de analytics avançado para payment operations mas vendor quotava R$ 450K/ano.",
      task: "Encontrar alternativa com 1/3 do custo sem comprometer capacidades essenciais.",
      action: "Construímos solução interna usando ferramentas open-source (Grafana, Prometheus, ELK Stack) + AWS managed services (Athena, QuickSight). 2 engenheiros part-time por 6 semanas. Documentação detalhada para manutenção.",
      result: "Custo total: R$ 89K (setup) + R$ 65K/ano (infra). Economia de 85% no primeiro ano. Bonus: customização infinita, dados sensíveis ficam internos, time desenvolveu expertise. Solução ainda em uso 3 anos depois.",
    },
    interviewQuestions: [
      "Descreva uma situação onde você conseguiu um resultado significativo com recursos muito limitados.",
      "Conte sobre uma vez que você encontrou uma forma criativa de economizar custos sem sacrificar qualidade.",
    ],
  },
  {
    id: 11,
    title: "Earn Trust",
    description: "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team's body odor smells of perfume.",
    color: "bg-teal-500",
    relevance: "Para stakeholder management",
    keyPoints: [
      "Ouvir atentamente",
      "Falar com franqueza",
      "Ser auto-crítico",
    ],
    starExample: {
      situation: "Projeto de migração de gateway de pagamento que eu liderava atrasou 3 semanas e estava 30% acima do budget.",
      task: "Comunicar situação para stakeholders e recuperar confiança.",
      action: "Agendei meeting com todos stakeholders, apresentei análise honesta dos problemas (incluindo meus erros de planning), compartilhei plano de recuperação detalhado, estabeleci checkpoint semanais com métricas transparentes, pedi feedback sobre meu leadership.",
      result: "Recuperamos timeline, finalizamos apenas 8% acima do budget. Stakeholders apreciaram transparência - recebi feedback que 'aumentou confiança ao invés de diminuir'. Promoted para Senior PM 6 meses depois.",
    },
    interviewQuestions: [
      "Conte sobre uma vez que você teve que admitir um erro significativo. Como você lidou?",
      "Descreva uma situação onde você teve que dar feedback difícil a alguém mais sênior.",
    ],
  },
  {
    id: 12,
    title: "Dive Deep",
    description: "Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdotes differ. No task is beneath them.",
    color: "bg-rose-500",
    relevance: "Para troubleshooting complexo",
    keyPoints: [
      "Conhecer os detalhes",
      "Auditar e questionar métricas",
      "Nenhuma tarefa é inferior",
    ],
    starExample: {
      situation: "Taxa de autorização estava reportada em 92% (dentro do target) mas merchants reclamavam de problemas.",
      task: "Investigar discrepância entre métrica e feedback qualitativo.",
      action: "Mergulhei nos dados brutos: descobri que métrica excluía timeouts (15% das transações). Analisei logs linha por linha, identifiquei que problema era específico de uma bandeira + issuer específico às sextas 18-20h. Colaborei com engenheiro para entender root cause (retry logic defeituoso).",
      result: "Fix implementado aumentou taxa real de 78% para 94%. Mudamos definição de métrica para incluir timeouts (transparência). Evitamos perda estimada de R$ 2.8M/mês em transações. Merchant satisfaction score aumentou 23 pontos.",
    },
    interviewQuestions: [
      "Descreva a situação mais complexa que você teve que investigar em detalhe. Como você abordou?",
      "Conte sobre uma vez que você descobriu que uma métrica estava enganando a organização.",
    ],
  },
  {
    id: 13,
    title: "Have Backbone; Disagree and Commit",
    description: "Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.",
    color: "bg-violet-500",
    relevance: "Para decisões críticas",
    keyPoints: [
      "Desafiar decisões respeitosamente",
      "Ter convicção",
      "Comprometer totalmente após decisão",
    ],
    starExample: {
      situation: "Liderança queria lançar nova feature de pagamento parcelado em 4 semanas para campanha de marketing, mas eu via riscos técnicos sérios.",
      task: "Expressar discordância sem bloquear progresso.",
      action: "Preparei documento detalhado: riscos identificados (fraud, compliance, tech debt), impact quantificado, alternativa de soft launch com 10% dos usuários. Apresentei em meeting com VP, defendi posição com dados. Fui overruled. Comprometi 100%: mobilizei time, trabalhamos noites/finais de semana, implementei todos mitigations possíveis.",
      result: "Lançamos no prazo. Tivemos problema de fraude previsto (mas mitigado em 72h devido a preparação). Feature gerou R$ 8M em GMV no primeiro mês. VP reconheceu publicamente que meus concerns eram válidos e preparação salvou o launch.",
    },
    interviewQuestions: [
      "Conte sobre uma vez que você discordou fortemente de seu gestor. Como você lidou?",
      "Descreva uma situação onde você teve que executar uma decisão com a qual não concordava. Como você se comprometeu?",
    ],
  },
  {
    id: 14,
    title: "Deliver Results",
    description: "Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.",
    color: "bg-emerald-500",
    relevance: "Core expectation",
    keyPoints: [
      "Focar em inputs críticos",
      "Entregar com qualidade e no prazo",
      "Superar obstáculos",
    ],
    starExample: {
      situation: "Q4 com meta de reduzir custo por transação em 15% e aumentar approval rate em 3pp, mas economia estava em recessão afetando mix.",
      task: "Entregar ambas as metas mesmo com headwinds.",
      action: "Desdobrei metas em iniciativas: 1) Renegociação de MDR com top 3 adquirentes (R$ 380K/mês economia), 2) Roteamento inteligente por approval rate histórico (+1.8pp), 3) Otimização de retries (+0.9pp), 4) Redução de fraude falso-positivo (+0.6pp). Weekly tracking com time, ajustes quinzenais.",
      result: "Fim Q4: Custo/transação -17.3% (superou meta), Approval rate +3.3pp (superou meta). Adicionais: R$ 4.2M em custo evitado, R$ 12M em revenue adicional. Time recebeu stock grant award. 2 iniciativas viraram padrão global.",
    },
    interviewQuestions: [
      "Conte sobre a meta mais difícil que você teve que entregar. Como você a alcançou?",
      "Descreva uma situação onde você teve múltiplos obstáculos mas ainda assim entregou resultados.",
    ],
  },
  {
    id: 15,
    title: "Strive to be Earth's Best Employer",
    description: "Leaders work every day to create a safer, more productive, higher performing, more diverse, and more just work environment. They lead with empathy, have fun at work, and make it easy for others to have fun.",
    color: "bg-sky-500",
    relevance: "Para criar time de alta performance",
    keyPoints: [
      "Criar ambiente seguro e inclusivo",
      "Liderar com empatia",
      "Tornar trabalho gratificante",
    ],
    starExample: {
      situation: "Time de payment ops com burnout alto (2 saídas em 3 meses), projetos atrasando, moral baixo.",
      task: "Reverter situação e criar ambiente de alta performance sustentável.",
      action: "Conduzi 1:1s com cada pessoa (listening tour), identifiquei problemas: sobrecarga, falta de reconhecimento, trabalho repetitivo. Implementei: automação de 60% tarefas manuais, rotação de projetos, recognition program mensal, flex time, no-meeting Fridays, budget para team building, career development plans individualizados.",
      result: "Em 6 meses: eNPS de 3.2 → 8.4, attrition zerado, delivery melhorou 35%. Team ganhou 'Best Team Culture Award' interno. 3 pessoas promovidas. Múltiplos candidatos citaram 'cultura do time' como razão para aceitar oferta.",
    },
    interviewQuestions: [
      "Como você cria um ambiente onde as pessoas fazem seu melhor trabalho?",
      "Conte sobre uma vez que você identificou e resolveu um problema de moral/cultura no time.",
    ],
  },
  {
    id: 16,
    title: "Success and Scale Bring Broad Responsibility",
    description: "We started in a garage, but we're not there anymore. We are big, we impact the world, and we are far from perfect. We must be humble and thoughtful about even the secondary effects of our actions.",
    color: "bg-amber-500",
    relevance: "Para impacto em LATAM",
    keyPoints: [
      "Pensar em impactos secundários",
      "Ser humilde",
      "Responsabilidade social",
    ],
    starExample: {
      situation: "Implementação de novo algoritmo de fraud detection reduziu fraude mas aumentou falsos positivos em comunidades de baixa renda (sem histórico de crédito).",
      task: "Balance segurança com inclusão financeira.",
      action: "Reconheci problema após analisar dados demográficos. Trabalhei com data science para criar modelo com features alternativas (padrão de compra, device, etc) além de score de crédito. Implementei review manual human-in-loop para casos borderline. Criei métricas de fairness (análise por faixa de renda/região).",
      result: "Redução de 67% em falsos positivos para grupo afetado, mantendo mesma eficácia contra fraude real. Aumentamos aprovação de primeiras compras em 28%. Documentamos approach e compartilhamos com indústria via paper técnico. Feature tornou-se padrão de fairness interno.",
    },
    interviewQuestions: [
      "Descreva uma situação onde você considerou impactos secundários ou não-intencionais de uma decisão.",
      "Como você balance objetivos de negócio com responsabilidade social?",
    ],
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
    <div className="container max-w-6xl py-8 space-y-6">
      <Link href="/amazon-prep" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Leadership Principles</h1>
        <p className="text-muted-foreground text-lg">
          Os 16 princípios de liderança da Amazon com exemplos STAR
        </p>
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Como usar os Leadership Principles</CardTitle>
          <CardDescription>Guia prático para entrevistas na Amazon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">📖 Para Estudo</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Memorize os 16 princípios</li>
                <li>Prepare 2-3 histórias para cada</li>
                <li>Use o método STAR sempre</li>
                <li>Quantifique resultados</li>
              </ul>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">💬 Na Entrevista</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Identifique qual LP está sendo testado</li>
                <li>Seja específico, não genérico</li>
                <li>Admita erros quando relevante</li>
                <li>Mostre aprendizado e crescimento</li>
              </ul>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Método STAR</h3>
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div>
                <Badge className="mb-1 bg-blue-500">S</Badge>
                <div className="text-xs text-muted-foreground">
                  <strong>Situation:</strong> Contexto específico
                </div>
              </div>
              <div>
                <Badge className="mb-1 bg-green-500">T</Badge>
                <div className="text-xs text-muted-foreground">
                  <strong>Task:</strong> Seu objetivo/responsabilidade
                </div>
              </div>
              <div>
                <Badge className="mb-1 bg-orange-500">A</Badge>
                <div className="text-xs text-muted-foreground">
                  <strong>Action:</strong> O que VOCÊ fez (detalhe)
                </div>
              </div>
              <div>
                <Badge className="mb-1 bg-purple-500">R</Badge>
                <div className="text-xs text-muted-foreground">
                  <strong>Result:</strong> Resultado quantificado
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Os 16 Princípios</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {principles.map((principle) => (
            <AccordionItem key={principle.id} value={`principle-${principle.id}`} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Badge className={`${principle.color} shrink-0`}>
                    {principle.id}
                  </Badge>
                  <div>
                    <div className="font-semibold text-lg">{principle.title}</div>
                    <div className="text-xs text-muted-foreground">{principle.relevance}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm italic">{principle.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">🎯 Pontos-Chave</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    {principle.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="outline">Exemplo STAR</Badge>
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-background rounded border-l-4 border-blue-500">
                      <div className="font-semibold mb-1 flex items-center gap-2">
                        <Badge className="bg-blue-500">S</Badge>
                        Situation
                      </div>
                      <p className="text-muted-foreground">{principle.starExample.situation}</p>
                    </div>
                    <div className="p-3 bg-background rounded border-l-4 border-green-500">
                      <div className="font-semibold mb-1 flex items-center gap-2">
                        <Badge className="bg-green-500">T</Badge>
                        Task
                      </div>
                      <p className="text-muted-foreground">{principle.starExample.task}</p>
                    </div>
                    <div className="p-3 bg-background rounded border-l-4 border-orange-500">
                      <div className="font-semibold mb-1 flex items-center gap-2">
                        <Badge className="bg-orange-500">A</Badge>
                        Action
                      </div>
                      <p className="text-muted-foreground">{principle.starExample.action}</p>
                    </div>
                    <div className="p-3 bg-background rounded border-l-4 border-purple-500">
                      <div className="font-semibold mb-1 flex items-center gap-2">
                        <Badge className="bg-purple-500">R</Badge>
                        Result
                      </div>
                      <p className="text-muted-foreground">{principle.starExample.result}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">❓ Perguntas Típicas</h4>
                  <div className="space-y-2">
                    {principle.interviewQuestions.map((question, idx) => (
                      <div key={idx} className="p-3 border rounded-lg text-sm">
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dicas Finais para Entrevistas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg border-green-500/50 bg-green-500/5">
              <h4 className="font-semibold mb-2 text-green-600">✓ Faça</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Seja específico com números e datas</li>
                <li>Fale sobre VOCÊ, não "nós" genérico</li>
                <li>Admita erros e mostre aprendizado</li>
                <li>Conecte suas histórias aos LPs</li>
                <li>Prepare perguntas inteligentes</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg border-red-500/50 bg-red-500/5">
              <h4 className="font-semibold mb-2 text-red-600">✗ Evite</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Respostas vagas ou genéricas</li>
                <li>Culpar outros por fracassos</li>
                <li>Histórias sem resultado mensurável</li>
                <li>Tentar encaixar LP forçadamente</li>
                <li>Mentir ou exagerar</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Pro Tip: Bar Raiser</h4>
            <p className="text-sm text-muted-foreground">
              Uma das suas entrevistas será com um "Bar Raiser" - um entrevistador sênior de outra área que tem 
              poder de veto. Eles são treinados especificamente para avaliar cultural fit e LPs. Trate todas as 
              entrevistas com máxima seriedade, mas saiba que o Bar Raiser é especialmente crítico.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
