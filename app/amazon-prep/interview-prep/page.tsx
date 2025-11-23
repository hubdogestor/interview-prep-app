import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircle2, Circle } from "lucide-react";

export default function InterviewPrepPage() {
  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <Link href="/amazon-prep" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Interview Preparation</h1>
        <p className="text-muted-foreground text-lg">
          Mock interviews, perguntas estratégicas e plano 30-60-90 dias
        </p>
      </div>

      <Tabs defaultValue="mock" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
          <TabsTrigger value="questions">Suas Perguntas</TabsTrigger>
          <TabsTrigger value="30-60-90">Plano 30-60-90</TabsTrigger>
        </TabsList>

        <TabsContent value="mock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura das Entrevistas Amazon</CardTitle>
              <CardDescription>O que esperar do processo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">5-7</div>
                  <div className="text-sm text-muted-foreground">Rounds de entrevista</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">45-60min</div>
                  <div className="text-sm text-muted-foreground">Por round</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">2-3</div>
                  <div className="text-sm text-muted-foreground">LPs por round</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">1</div>
                  <div className="text-sm text-muted-foreground">Bar Raiser</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Tipos de Entrevista</h3>
                <div className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-blue-500">Behavioral</Badge>
                      <span className="font-semibold">Leadership Principles (4-5 rounds)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Perguntas sobre experiências passadas usando método STAR. Cada round foca em 2-3 LPs específicos.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Exemplo: "Tell me about a time you had to make a difficult decision with incomplete information."
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-green-500">Technical/Functional</Badge>
                      <span className="font-semibold">Payment Operations Deep Dive (1-2 rounds)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conhecimento técnico de pagamentos, sistemas, KPIs, metodologias Lean/Six Sigma.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Exemplo: "How would you design a system to handle 10x peak volume during Black Friday?"
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-purple-500">Case Study</Badge>
                      <span className="font-semibold">Problem Solving (1 round)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Problema hipotético de negócio para resolver em tempo real. Avalia estruturação de pensamento.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Exemplo: "Our chargeback rate increased 30% last month. How would you investigate and resolve?"
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg border-orange-500/50 bg-orange-500/5">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-orange-500">Bar Raiser</Badge>
                      <span className="font-semibold">Cultural Fit + LPs (1 round)</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Entrevistador sênior de outra área com poder de veto. Foca em cultural fit e raising the bar.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Crítico: Esta pessoa decide se você está acima do bar atual da empresa.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perguntas Comportamentais - Mock Interview</CardTitle>
              <CardDescription>Pratique respondendo estas perguntas com método STAR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">🎯 Customer Obsession</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time when you went above and beyond for a customer.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a situation where you had to balance customer needs with business constraints.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Give me an example of when you used customer feedback to drive a major change.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">🏆 Ownership</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you took on something significant outside your area of responsibility.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a situation where you had to make a long-term decision that wasn't popular in the short term.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">🚀 Bias for Action</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to make a decision with incomplete information.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a calculated risk you took that didn't work out. What did you learn?
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">💡 Invent and Simplify</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you simplified a complex process.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe an innovation you introduced that others initially resisted.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">📊 Deliver Results</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to deliver results despite significant obstacles.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe your most significant professional achievement. What made it challenging?
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">🤝 Earn Trust</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    Tell me about a time you had to admit a significant mistake.
                  </div>
                  <div className="p-3 border rounded-lg">
                    Describe a situation where you had to give difficult feedback to someone more senior.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perguntas Técnicas - Payment Operations</CardTitle>
              <CardDescription>Demonstre conhecimento profundo do domínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Arquitetura e Escalabilidade</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "How would you design a payment system to handle 10x traffic during peak events?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Explain the trade-offs between consistency and availability in payment processing."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How would you implement a circuit breaker pattern for payment gateway calls?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">KPIs e Métricas</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "What are the top 5 KPIs you would track for payment operations? Why?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Our approval rate dropped from 90% to 85%. How would you investigate?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How do you calculate the ROI of a fraud detection system?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Mercado Brasileiro</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "How does PIX differ from traditional payment methods? What are the implications for Amazon?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Explain the payment flow for a PIX transaction end-to-end."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "What are the key regulatory considerations for payment operations in Brazil?"
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Program Management</h4>
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-muted rounded">
                    "Walk me through how you would use Six Sigma DMAIC to improve reconciliation process."
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "How would you write a PR/FAQ for a new payment method launch?"
                  </div>
                  <div className="p-2 bg-muted rounded">
                    "Describe how you would prioritize between 5 competing initiatives with limited resources."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Study - Live Problem Solving</CardTitle>
              <CardDescription>Exemplo de problema para resolver na entrevista</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">📋 Cenário</h3>
                <p className="text-sm mb-4">
                  "A taxa de chargeback da Amazon Brasil aumentou de 0.5% para 0.8% no último mês, 
                  concentrada em São Paulo. Isso representa uma perda adicional de R$ 3M/mês. 
                  Como Program Manager, como você abordaria esse problema?"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">💭 Framework de Resposta Sugerido</h4>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">1. Clarify</Badge>
                    <div className="text-sm text-muted-foreground">
                      Fazer perguntas de clarificação: "Isso afeta todos os métodos de pagamento ou específicos? 
                      Há algum padrão por categoria de produto? Mudou algo na nossa operação no último mês?"
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">2. Structure</Badge>
                    <div className="text-sm text-muted-foreground">
                      Estruturar hipóteses: Fraude aumentou? Problemas de entrega? Mudança em política de vendedores? 
                      Competidores incentivando chargebacks?
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">3. Analyze</Badge>
                    <div className="text-sm text-muted-foreground">
                      Análise de dados: Segmentar por produto/merchant/valor/hora/método de pagamento. 
                      Identificar 80/20 (onde está concentrado?). Comparar com período anterior.
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">4. Hypothesize</Badge>
                    <div className="text-sm text-muted-foreground">
                      Hipótese: "Dados mostram que 70% vem de categoria eletrônicos + novo seller específico. 
                      Sugere fraude de merchant ou produtos com problemas de qualidade."
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">5. Recommend</Badge>
                    <div className="text-sm text-muted-foreground">
                      <strong>Curto prazo:</strong> Pausar seller suspeito, revisar manualmente transações similares, alertar clientes.
                      <br />
                      <strong>Médio prazo:</strong> Implementar alertas automáticos, reforçar screening de sellers, melhorar tracking de entregas.
                      <br />
                      <strong>Longo prazo:</strong> ML para detectar padrões de fraude, revisão de política de sellers, partnership com bandeiras.
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Badge className="mb-2">6. Metrics</Badge>
                    <div className="text-sm text-muted-foreground">
                      Métricas de sucesso: Taxa de chargeback volta para &lt;0.5% em 30 dias, 
                      redução de 80% em chargebacks de categoria eletrônicos, zero recorrência do mesmo seller.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">💡 O que o Entrevistador Avalia</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Structured thinking (não pular para soluções)</li>
                  <li>Fazer boas perguntas antes de responder</li>
                  <li>Pensamento analítico e data-driven</li>
                  <li>Balance entre curto e longo prazo</li>
                  <li>Definição clara de métricas de sucesso</li>
                  <li>Considerar múltiplos stakeholders</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suas Perguntas para os Entrevistadores</CardTitle>
              <CardDescription>Perguntas inteligentes demonstram interesse genuíno e pesquisa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Por que fazer boas perguntas?</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Demonstra que você pesquisou sobre a empresa e o role</li>
                  <li>Mostra pensamento estratégico e curiosidade (Learn and Be Curious)</li>
                  <li>Ajuda você a avaliar se a posição é o fit certo</li>
                  <li>Oportunidade de construir rapport com entrevistador</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Andreia Guarino (Gestora Direta)</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Você liderou iniciativas que resultaram no prêmio 'Best Approval Rate' da Elo em 2021. 
                      Quais foram as principais alavancas que permitiram esse resultado?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra que você pesquisou + foco em resultados</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Considerando sua experiência com otimização de processos usando Six Sigma, quais você vê como 
                      os maiores desafios operacionais para Payment Operations nos próximos 12 meses?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Conecta expertise dela + pensamento futuro</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como você vê a evolução do PIX impactando nossa estratégia de parcerias com adquirentes e bandeiras?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Demonstra conhecimento de mercado + visão estratégica</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Quais KPIs você considera mais críticos para este role nos primeiros 90 dias?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra foco em resultados + alinhamento de expectativas</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como você equilibra iniciativas de transformação de longo prazo (AI/ML) com a necessidade de manter 
                      operações day-to-day com excelência?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Aborda desafio real do role</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Sujash Biswas (Head LATAM)</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Você tem experiência com UPI na Índia e agora com PIX no Brasil - dois dos sistemas de pagamento 
                      instantâneo mais bem-sucedidos do mundo. Quais lições da Índia são mais aplicáveis à estratégia da 
                      Amazon para LATAM?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Mostra pesquisa profunda + pensamento global</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Qual é a visão de longo prazo (3-5 anos) para Amazon Payments na América Latina? 
                      Como este role específico contribui para essa visão?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Think Big + alinhamento estratégico</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "A parceria com Oakberry é mencionada como estratégica. Como você vê a evolução do modelo de parcerias 
                      na região? Há planos de replicar esse tipo de partnership com outros players?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Demonstra atenção ao contexto + visão de ecosistema</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Quais são os maiores desafios únicos de escalar Payment Operations na LATAM comparado a outras regiões 
                      onde você já operou?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Aproveita experiência multi-regional dele</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm mb-1">
                      "Como a Amazon está se posicionando em relação a Open Finance no Brasil? Você vê isso como oportunidade 
                      ou desafio para nossa operação?"
                    </div>
                    <Badge variant="outline" className="text-xs">Por que funciona: Tópico atual + visão de oportunidade</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Para Qualquer Entrevistador</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "O que você mais gosta de trabalhar na Amazon? O que te mantém aqui?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Como o time de Payment Operations colabora com outras áreas como Product, Engineering e Finance?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Qual é o maior desafio que o time está enfrentando atualmente?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Como a Amazon mede sucesso para este role? Quais seriam os critérios de uma performance excepcional?"
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm">
                      "Pode descrever como é um dia típico neste role?"
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg border-green-500/50 bg-green-500/5">
                  <h4 className="font-semibold mb-2 text-green-600">✓ Boas Perguntas</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Específicas, não genéricas</li>
                    <li>Baseadas em pesquisa</li>
                    <li>Sobre o futuro, não só o presente</li>
                    <li>Demonstram seu expertise</li>
                    <li>Genuinamente curiosas</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg border-red-500/50 bg-red-500/5">
                  <h4 className="font-semibold mb-2 text-red-600">✗ Evite</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>"Qual é a cultura aqui?" (muito vago)</li>
                    <li>Perguntas sobre salário/benefícios cedo demais</li>
                    <li>"O que a empresa faz?" (falta de pesquisa)</li>
                    <li>Perguntas com resposta no site</li>
                    <li>Foco apenas em WLB sem contexto</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="30-60-90" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plano 30-60-90 Dias</CardTitle>
              <CardDescription>Seu roteiro para os primeiros 3 meses na Amazon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Por que ter um plano 30-60-90?</h3>
                <p className="text-sm text-muted-foreground">
                  Demonstra que você já está pensando estrategicamente sobre como ter sucesso no role. 
                  Mostra proatividade, estruturação e compreensão do que será esperado. Pode ser perguntado 
                  na entrevista: "Como você abordaria seus primeiros 90 dias?"
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-500">Primeiros 30 Dias</Badge>
                    <h3 className="text-xl font-semibold">Aprender e Conectar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Absorver contexto, construir relacionamentos, entender o estado atual
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Semana 1-2: Onboarding e Imersão</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Completar onboarding corporativo e técnico (AWS, ferramentas internas)</li>
                        <li>Agendar 1:1s com todos membros do time direto (entender histórias, desafios)</li>
                        <li>Reuniões de conhecimento com Andreia: contexto de programas atuais, prioridades, expectativas</li>
                        <li>Shadowing: acompanhar rituais existentes (standups, business reviews, incident reviews)</li>
                        <li>Ler documentação: 6-Pagers recentes, post-mortems, roadmap, OKRs do time</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Semana 3-4: Mapeamento de Stakeholders</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>1:1s com stakeholders-chave: Engineering, Product, Finance, Legal, parceiros (adquirentes/bandeiras)</li>
                        <li>Entender pain points de cada área em relação a payments</li>
                        <li>Revisar dashboards principais: KPIs, alertas, relatórios</li>
                        <li>Identificar one quick win: pequena melhoria de alto impacto para executar em 30-45 dias</li>
                        <li>Começar a construir conhecimento sobre mercado brasileiro (se ainda não tiver base completa)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 30 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Documento de síntese: "O que aprendi" (contexto atual, oportunidades, riscos)</li>
                        <li>Mapa de stakeholders atualizado com contatos e contextos</li>
                        <li>Lista priorizada de "quick wins" potenciais</li>
                        <li>Plano revisado para 60-90 dias com feedback de Andreia</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500">Dias 31-60</Badge>
                    <h3 className="text-xl font-semibold">Contribuir e Alinhar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Assumir responsabilidades, contribuir ativamente, começar a adicionar valor
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Ownership de Programa</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Assumir responsabilidade completa por 1-2 programas/iniciativas em andamento</li>
                        <li>Conduzir first weekly business review apresentando status, blockers, decisões necessárias</li>
                        <li>Começar a construir relacionamento direto com parceiros externos (se aplicável)</li>
                        <li>Participar ativamente de incident response (se houver)</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Documentação e Processos</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Escrever primeiro 6-Pager ou PR/FAQ (pode ser para "quick win" identificado)</li>
                        <li>Documentar processo ou runbook que estava missing (contribuição de valor)</li>
                        <li>Propor melhorias em rituais ou processos existentes (baseado em observação de 30 dias)</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Análise e Insights</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Deep dive em 1-2 KPIs críticos: análise de tendências, root causes, oportunidades</li>
                        <li>Apresentar primeiros insights baseados em dados para o time/Andreia</li>
                        <li>Identificar gaps em instrumentação ou dashboards e propor melhorias</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 60 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Quick win executado e mensurado (resultado quantificado)</li>
                        <li>Primeiro 6-Pager completo apresentado e discutido</li>
                        <li>Weekly business review estabelecido como ritual</li>
                        <li>Pelo menos 1 melhoria de processo implementada</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500">Dias 61-90</Badge>
                    <h3 className="text-xl font-semibold">Liderar e Impactar</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foco: Ownership completo, liderança de iniciativas, impacto mensurável
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Visão e Roadmap</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Definir roadmap detalhado para próximos 2-3 trimestres dos programas sob sua responsabilidade</li>
                        <li>Alinhar prioridades e sequenciamento com stakeholders (engineering, product, business)</li>
                        <li>Apresentar visão em monthly business review ou QBR (Quarterly Business Review)</li>
                        <li>Obter buy-in de Andreia e Sujash para iniciativas maiores</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Iniciativa Estratégica</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Liderar kickoff de uma iniciativa estratégica de médio prazo (3-6 meses)</li>
                        <li>Pode ser relacionada a AI/ML, otimização de processos, ou parceria estratégica</li>
                        <li>Montar squad ou working group, definir objetivos claros (OKRs)</li>
                        <li>Estabelecer métricas de sucesso e cadência de reporting</li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle className="h-4 w-4" />
                        <h4 className="font-semibold text-sm">Relacionamentos e Influência</h4>
                      </div>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-6">
                        <li>Expandir network: conectar com PgMs de outras regiões, participar de forums globais</li>
                        <li>Posicionar-se como subject matter expert em 1-2 áreas específicas</li>
                        <li>Mentorar ou onboardar novo membro do time (se houver hiring)</li>
                        <li>Contribuir para comunidade interna (tech talks, brown bags, documentação)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🎯 Entregáveis dos 90 dias</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Roadmap de 2-3 trimestres aprovado e socializado</li>
                        <li>Pelo menos 1 iniciativa estratégica em execução com milestones claros</li>
                        <li>Impacto mensurável em pelo menos 2 KPIs principais do time</li>
                        <li>Ritmo de reporting e comunicação estabelecido e funcionando</li>
                        <li>Feedback formal de 90 dias de Andreia solicitado e incorporado</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🎯 Metas de Sucesso por Período</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-blue-500 mb-2">30 Dias</Badge>
                      <CardTitle className="text-base">Aprender</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Contexto completo absorvido</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Relacionamentos estabelecidos</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Quick wins identificados</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-green-500 mb-2">60 Dias</Badge>
                      <CardTitle className="text-base">Contribuir</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Programas sob ownership</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Primeiro valor entregue</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Confiança do time conquistada</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge className="w-fit bg-purple-500 mb-2">90 Dias</Badge>
                      <CardTitle className="text-base">Liderar</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Impacto em KPIs mensurado</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Iniciativa estratégica liderada</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Reconhecido como líder</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">⚠️ Red Flags para Evitar</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li><strong>Dia 30:</strong> Ainda não ter clareza sobre prioridades ou não ter conectado com stakeholders-chave</li>
                  <li><strong>Dia 60:</strong> Não ter assumido ownership de nenhum programa ou não ter entregue nenhum valor</li>
                  <li><strong>Dia 90:</strong> Não ter impacto mensurável em KPIs ou não ter plano claro para próximo trimestre</li>
                  <li><strong>Geral:</strong> Ficar muito tempo "apenas observando" sem contribuir ativamente</li>
                  <li><strong>Geral:</strong> Não pedir feedback regularmente ou esperar a review formal de 90 dias</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
