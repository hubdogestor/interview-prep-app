import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const principles = [
  {
    id: 1,
    title: "Customer Obsession",
    description: "Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.",
    color: "bg-red-500",
    relevance: "Critical para Payment Ops",
    keyPoints: [
      "Começar pelo cliente, não pela tecnologia",
      "Trabalhar 'backwards' das necessidades do cliente",
      "Medir sucesso pelo impacto no cliente",
    ],
    starExample: {
      situation: "Cliente relatando alta taxa de falhas no checkout durante Black Friday no e-commerce anterior.",
      task: "Investigar e resolver problemas de performance que afetavam conversão.",
      action: "Implementei monitoramento em tempo real, identifiquei gargalos na API de pagamento, otimizei conexões com gateway e criei fallback automático para processadores secundários.",
      result: "Taxa de sucesso aumentou de 87% para 96%, resultando em R$ 2.3M adicional em GMV durante o evento. NPS de checkout melhorou 15 pontos.",
    },
    interviewQuestions: [
      "Conte sobre uma vez em que você teve que escolher entre o que era mais fácil tecnicamente e o que era melhor para o cliente.",
      "Descreva uma situação onde você usou dados de clientes para mudar completamente a direção de um projeto.",
    ],
  },
  {
    id: 2,
    title: "Ownership",
    description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team.",
    color: "bg-blue-500",
    relevance: "Essencial para Program Managers",
    keyPoints: [
      "Pensar no longo prazo, não apenas no trimestre",
      "Agir em nome da empresa inteira",
      "Nunca dizer 'não é minha responsabilidade'",
    ],
    starExample: {
      situation: "Notei que nossa taxa de chargeback estava aumentando 0.3% ao mês, mas não estava no escopo do meu projeto atual.",
      task: "Apesar de não ser minha responsabilidade direta, sabia que impactava toda a operação e a receita.",
      action: "Investiguei causas-raiz, descobri que 60% dos chargebacks vinham de produtos não entregues devido a problema de integração com logística. Coordenei com 4 times diferentes, criei task force, implementei alertas proativos para clientes.",
      result: "Redução de 45% em chargebacks em 3 meses, economia de R$ 480K/mês. Solução foi adotada como padrão para toda empresa.",
    },
    interviewQuestions: [
      "Conte sobre uma vez em que você tomou ownership de algo que não era formalmente sua responsabilidade.",
      "Descreva um trade-off entre resultado de curto prazo vs longo prazo que você teve que fazer.",
    ],
  },
  {
    id: 3,
    title: "Invent and Simplify",
    description: "Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by 'not invented here.'",
    color: "bg-purple-500",
    relevance: "Core para transformação com AI/ML",
    keyPoints: [
      "Inovar constantemente",
      "Simplificar processos complexos",
      "Estar aberto a ideias de qualquer lugar",
    ],
    starExample: {
      situation: "Processo de reconciliação manual de pagamentos tomava 4 horas/dia da equipe financeira, com 8-10% de erro.",
      task: "Automatizar e simplificar o processo reduzindo tempo e erros.",
      action: "Desenvolvi solução usando RPA + Machine Learning: bot baixava arquivos automaticamente, ML classificava transações ambíguas (treinado com dados históricos), sistema gerava relatório de exceções apenas. Piloto em 2 semanas, iterações baseadas em feedback.",
      result: "Tempo reduzido para 20 minutos/dia, erros caíram para 0.8%. Equipe remanejada para análise estratégica. Solução custou 15% do valor de vendor tradicional.",
    },
    interviewQuestions: [
      "Descreva uma inovação que você introduziu que simplificou significativamente um processo.",
      "Conte sobre uma vez que você pegou uma ideia de outra indústria/empresa e adaptou para seu contexto.",
    ],
  },
  {
    id: 4,
    title: "Are Right, A Lot",
    description: "Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.",
    color: "bg-green-500",
    relevance: "Crítico para decisões estratégicas",
    keyPoints: [
      "Tomar decisões corretas consistentemente",
      "Buscar perspectivas diversas",
      "Questionar suas próprias crenças",
    ],
    starExample: {
      situation: "Time queria implementar nova solução de fraud detection de vendor conhecido, mas eu tinha ressalvas sobre fit com nosso contexto.",
      task: "Validar ou refutar minha intuição antes de decisão de R$ 800K/ano.",
      action: "Organizei POC de 2 semanas com 3 vendors diferentes (incluindo o favorito do time). Testei com dados reais, envolvi 6 stakeholders de diferentes áreas, rodei análise quantitativa. Descobri que vendor 'favorito' tinha 12% falsos positivos no nosso perfil vs 3% do alternativo.",
      result: "Escolhemos alternativa que economizou R$ 240K/ano e teve melhor performance (redução de 68% em fraude vs 41% da alternativa inicial). Time reconheceu valor de validação data-driven.",
    },
    interviewQuestions: [
      "Conte sobre uma decisão importante onde você estava inicialmente errado, mas mudou de ideia com base em dados.",
      "Descreva uma situação onde sua intuição estava contrária ao consenso, mas você estava correto.",
    ],
  },
  {
    id: 5,
    title: "Learn and Be Curious",
    description: "Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.",
    color: "bg-yellow-500",
    relevance: "Fundamental em tech/payments",
    keyPoints: [
      "Aprender constantemente",
      "Curiosidade sobre novas tecnologias",
      "Melhoramento contínuo",
    ],
    starExample: {
      situation: "Amazon usa intensivamente AI/ML mas eu tinha conhecimento limitado em ML aplicado a pagamentos.",
      task: "Desenvolver expertise rapidamente para contribuir efetivamente.",
      action: "Fiz 3 cursos online (AWS ML Specialty, Fraud Detection with ML, Google's ML Crash Course), li 15+ papers acadêmicos sobre payment fraud, implementei 2 projetos práticos, participei de 4 conferências sobre payments. Criei knowledge base interno documentando aprendizados.",
      result: "Em 6 meses, propus e liderei implementação de modelo de ML para otimizar roteamento de transações que aumentou approval rate em 2.3%. Treinei 8 colegas. Convidado para palestrar em evento interno.",
    },
    interviewQuestions: [
      "Qual foi a última coisa nova e significativa que você aprendeu? Como você a aplicou?",
      "Conte sobre uma vez que seu aprendizado autodirigido levou a um resultado de negócio mensurável.",
    ],
  },
  {
    id: 6,
    title: "Hire and Develop the Best",
    description: "Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization.",
    color: "bg-pink-500",
    relevance: "Para crescimento do time",
    keyPoints: [
      "Contratar acima do bar",
      "Desenvolver talentos",
      "Reconhecer e promover os melhores",
    ],
    starExample: {
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
