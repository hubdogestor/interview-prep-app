import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function ProgramManagementPage() {
  return (
    <div className="container max-w-6xl py-10 px-6 space-y-8">
      <Link href="/amazon-prep" className="inline-flex items-center text-base text-muted-foreground hover:text-primary transition-colors group">
        <ArrowLeftIcon className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Program Management</h1>
        <p className="text-muted-foreground text-xl max-w-3xl">
          Metodologias Amazon, KPIs e frameworks Lean/Six Sigma para excelência operacional
        </p>
      </div>

      <Tabs defaultValue="methodologies" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 h-14">
          <TabsTrigger value="methodologies" className="text-base">Metodologias Amazon</TabsTrigger>
          <TabsTrigger value="kpis" className="text-base">KPIs & Métricas</TabsTrigger>
          <TabsTrigger value="lean" className="text-base">Lean & Six Sigma</TabsTrigger>
        </TabsList>

        <TabsContent value="methodologies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Working Backwards</CardTitle>
              <CardDescription>O método de inovação da Amazon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Working Backwards é o processo central de inovação da Amazon. Em vez de começar com uma ideia ou tecnologia 
                e procurar um problema para resolver, você começa escrevendo um press release (PR) do produto como se ele já 
                estivesse lançado, sempre do ponto de vista do cliente.
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Estrutura do PR/FAQ</h3>
                <div className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>1</Badge>
                      <h4 className="font-semibold">Headline</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Título do produto/feature de forma que o cliente entenda o benefício imediatamente.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>2</Badge>
                      <h4 className="font-semibold">Sub-heading</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quem é o cliente-alvo e qual o benefício principal?
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>3</Badge>
                      <h4 className="font-semibold">Summary Paragraph</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Resumo do produto, problema que resolve, e como melhora a vida do cliente.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>4</Badge>
                      <h4 className="font-semibold">Problem Statement</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Descrever o problema que o cliente enfrenta hoje, com empatia.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>5</Badge>
                      <h4 className="font-semibold">Solution</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Como o produto resolve o problema de forma simples e elegante.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>6</Badge>
                      <h4 className="font-semibold">Customer Quote</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Citação fictícia de um cliente sobre por que ama o produto.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>7</Badge>
                      <h4 className="font-semibold">Getting Started</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Como é fácil começar a usar o produto.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>8</Badge>
                      <h4 className="font-semibold">FAQs</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perguntas frequentes antecipadas, tanto de clientes quanto internas (técnicas, jurídicas, etc).
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Por que funciona?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Força o time a pensar no cliente primeiro, não na tecnologia</li>
                  <li>Torna visível quando a proposta de valor é fraca</li>
                  <li>Alinha o time no "porquê" antes de investir no "como"</li>
                  <li>Documento vivo que guia decisões ao longo do projeto</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6-Pagers (Narratives)</CardTitle>
              <CardDescription>Documentos narrativos para tomada de decisão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Na Amazon, slides são banidos de reuniões estratégicas. Em vez disso, são usados documentos narrativos 
                de até 6 páginas que forçam o pensamento claro e estruturado.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Como funciona uma reunião com 6-Pager</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-purple-500/5 border-l-4 border-purple-500 rounded">
                    <Badge className="bg-purple-500 shrink-0">1</Badge>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Silent Reading (15-30 min)</div>
                      <div className="text-muted-foreground">
                        Reunião começa com todos lendo o documento em silêncio. Sem exceções.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-500/5 border-l-4 border-blue-500 rounded">
                    <Badge className="bg-blue-500 shrink-0">2</Badge>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Q&A e Discussão</div>
                      <div className="text-muted-foreground">
                        Discussão profunda sobre os pontos do documento. Todos têm o mesmo contexto.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-500/5 border-l-4 border-green-500 rounded">
                    <Badge className="bg-green-500 shrink-0">3</Badge>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Decisão</div>
                      <div className="text-muted-foreground">
                        Decisões são tomadas baseadas em fatos e dados apresentados.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Estrutura típica de um 6-Pager</h3>
                <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                  <div><strong>1. Contexto:</strong> Background do problema/oportunidade</div>
                  <div><strong>2. Objetivos:</strong> O que queremos alcançar e por quê</div>
                  <div><strong>3. Tenets:</strong> Princípios não-negociáveis do programa</div>
                  <div><strong>4. Estado Atual:</strong> Situação atual com dados</div>
                  <div><strong>5. Proposta:</strong> Solução detalhada</div>
                  <div><strong>6. Análise de Trade-offs:</strong> Prós, contras, alternativas</div>
                  <div><strong>7. Recursos Necessários:</strong> Time, budget, tecnologia</div>
                  <div><strong>8. Métricas de Sucesso:</strong> Como mediremos o resultado</div>
                  <div><strong>9. Timeline:</strong> Milestones e cronograma</div>
                  <div><strong>10. Riscos:</strong> O que pode dar errado e mitigações</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold mb-2 text-green-600">✓ Boas práticas</div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Use dados e evidências</li>
                    <li>Seja específico, não vago</li>
                    <li>Antecipe contra-argumentos</li>
                    <li>Escreva em prosa, não tópicos</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold mb-2 text-red-600">✗ Evite</div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Buzzwords e jargão</li>
                    <li>Afirmações sem dados</li>
                    <li>Omitir riscos óbvios</li>
                    <li>Formato de slide disfarçado</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Pizza Teams</CardTitle>
              <CardDescription>Equipes pequenas e autônomas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Jeff Bezos popularizou a regra: "Nenhum time deve ser maior do que pode ser alimentado por duas pizzas" 
                (~8-10 pessoas). Times pequenos são mais ágeis, com comunicação mais eficiente e maior ownership.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Vantagens</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-green-500/5 border-l-2 border-green-500 rounded">
                      Comunicação mais rápida e eficiente
                    </div>
                    <div className="p-2 bg-green-500/5 border-l-2 border-green-500 rounded">
                      Maior ownership e accountability
                    </div>
                    <div className="p-2 bg-green-500/5 border-l-2 border-green-500 rounded">
                      Decisões mais rápidas
                    </div>
                    <div className="p-2 bg-green-500/5 border-l-2 border-green-500 rounded">
                      Menos overhead de coordenação
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Características</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-blue-500/5 border-l-2 border-blue-500 rounded">
                      Dono de um produto/serviço end-to-end
                    </div>
                    <div className="p-2 bg-blue-500/5 border-l-2 border-blue-500 rounded">
                      Autonomia para tomar decisões
                    </div>
                    <div className="p-2 bg-blue-500/5 border-l-2 border-blue-500 rounded">
                      APIs bem definidas para integração
                    </div>
                    <div className="p-2 bg-blue-500/5 border-l-2 border-blue-500 rounded">
                      Métricas claras de sucesso
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KPIs Fundamentais de Pagamentos</CardTitle>
              <CardDescription>Indicadores-chave para Payment Operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Taxa de Autorização (Approval Rate)</h4>
                      <p className="text-sm text-muted-foreground">Transações aprovadas / Total de tentativas</p>
                    </div>
                    <Badge className="bg-green-500">Performance</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Target típico:</strong> &gt; 85-90%</div>
                    <div><strong>Impacto:</strong> Cada 1% = milhões em receita</div>
                    <div><strong>Fatores:</strong> Fraude, saldo, dados incorretos, problemas técnicos</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Diário</Badge>
                      <Badge variant="outline">Alertar: &lt; 85%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Taxa de Chargeback</h4>
                      <p className="text-sm text-muted-foreground">Chargebacks / Total de transações</p>
                    </div>
                    <Badge className="bg-red-500">Risco</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Target típico:</strong> &lt; 0.5-1%</div>
                    <div><strong>Impacto:</strong> Perda de receita + fee + penalidades de bandeiras</div>
                    <div><strong>Fatores:</strong> Fraude, insatisfação, produtos não entregues</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Semanal</Badge>
                      <Badge variant="outline">Alertar: &gt; 1%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Taxa de Fraude</h4>
                      <p className="text-sm text-muted-foreground">Transações fraudulentas / Total de transações</p>
                    </div>
                    <Badge className="bg-red-500">Risco</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Target típico:</strong> &lt; 0.1-0.3%</div>
                    <div><strong>Impacto:</strong> Chargebacks + custos operacionais + reputação</div>
                    <div><strong>Fatores:</strong> Eficácia do fraud detector, regras de negócio</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Diário</Badge>
                      <Badge variant="outline">Alertar: &gt; 0.5%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Custo por Transação</h4>
                      <p className="text-sm text-muted-foreground">Custo total / Número de transações</p>
                    </div>
                    <Badge className="bg-blue-500">Eficiência</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Inclui:</strong> MDR, gateway fees, infra AWS, equipe</div>
                    <div><strong>Impacto:</strong> Lucratividade da operação</div>
                    <div><strong>Otimização:</strong> Roteamento inteligente, negociação com adquirentes</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Mensal</Badge>
                      <Badge variant="outline">Meta: Redução trimestral</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Uptime do Sistema</h4>
                      <p className="text-sm text-muted-foreground">% tempo que serviço está disponível</p>
                    </div>
                    <Badge className="bg-purple-500">Confiabilidade</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Target típico:</strong> &gt; 99.95% (SLA)</div>
                    <div><strong>Impacto:</strong> 0.05% downtime = ~22 min/mês de indisponibilidade</div>
                    <div><strong>Fatores:</strong> Arquitetura, monitoramento, disaster recovery</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Real-time</Badge>
                      <Badge variant="outline">Alertar: &lt; 99.9%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Latência da API</h4>
                      <p className="text-sm text-muted-foreground">Tempo de resposta (p50, p95, p99)</p>
                    </div>
                    <Badge className="bg-purple-500">Confiabilidade</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Target p95:</strong> &lt; 500ms</div>
                    <div><strong>Target p99:</strong> &lt; 1000ms</div>
                    <div><strong>Impacto:</strong> Alta latência = abandono de carrinho</div>
                    <div className="pt-2">
                      <Badge variant="outline" className="mr-2">Monitorar: Real-time</Badge>
                      <Badge variant="outline">Alertar: p95 &gt; 500ms</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frameworks de Medição</CardTitle>
              <CardDescription>OKRs e Balanced Scorecard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">OKRs (Objectives and Key Results)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Framework para definir e acompanhar objetivos ambiciosos com resultados mensuráveis.
                </p>

                <div className="p-4 bg-muted rounded-lg space-y-4">
                  <div>
                    <Badge className="mb-2">Exemplo - Q1 2026</Badge>
                    <div className="space-y-3">
                      <div className="p-3 border rounded bg-background">
                        <div className="font-semibold mb-2">Objetivo: Melhorar a eficiência do processo de reconciliação</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="shrink-0">KR1</Badge>
                            <span className="text-muted-foreground">Reduzir tempo médio de reconciliação de 4h para 1h</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="shrink-0">KR2</Badge>
                            <span className="text-muted-foreground">Aumentar reconciliação automática de 70% para 90%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="shrink-0">KR3</Badge>
                            <span className="text-muted-foreground">Reduzir erros manuais de 50 para 10 por mês</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Balanced Scorecard (BSC)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visão equilibrada conectando KPIs a quatro perspectivas estratégicas.
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">💰 Financeira</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Custo por transação</li>
                      <li>Revenue recovery (chargebacks evitados)</li>
                      <li>ROI de iniciativas de otimização</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">👥 Cliente</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Taxa de sucesso de pagamento</li>
                      <li>Latência do checkout</li>
                      <li>NPS relacionado a pagamentos</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">⚙️ Processos Internos</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Taxa de autorização</li>
                      <li>Uptime do sistema</li>
                      <li>Eficiência de reconciliação</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📈 Aprendizado/Crescimento</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>% processos automatizados</li>
                      <li>Adoção de AI/ML</li>
                      <li>Capacitação da equipe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lean" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lean & Six Sigma</CardTitle>
              <CardDescription>Excelência operacional e melhoria contínua</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Lean Thinking</h3>
                  <p className="text-sm text-muted-foreground">
                    Filosofia focada em maximizar valor para o cliente eliminando desperdícios.
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Value</h4>
                      <p className="text-xs text-muted-foreground">
                        O que o cliente realmente valoriza? Ex: checkout rápido
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Value Stream</h4>
                      <p className="text-xs text-muted-foreground">
                        Mapear todos os passos do processo
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Flow</h4>
                      <p className="text-xs text-muted-foreground">
                        Fazer o processo fluir sem interrupções
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Pull</h4>
                      <p className="text-xs text-muted-foreground">
                        Produzir apenas quando há demanda
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Perfection</h4>
                      <p className="text-xs text-muted-foreground">
                        Melhoria contínua (Kaizen)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Six Sigma (DMAIC)</h3>
                  <p className="text-sm text-muted-foreground">
                    Metodologia data-driven para reduzir variação e defeitos.
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-500/5 border-l-4 border-blue-500 rounded">
                      <h4 className="font-semibold text-sm mb-1">Define</h4>
                      <p className="text-xs text-muted-foreground">
                        Definir o problema, objetivos e escopo do projeto
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/5 border-l-4 border-green-500 rounded">
                      <h4 className="font-semibold text-sm mb-1">Measure</h4>
                      <p className="text-xs text-muted-foreground">
                        Coletar dados do estado atual do processo
                      </p>
                    </div>
                    <div className="p-3 bg-purple-500/5 border-l-4 border-purple-500 rounded">
                      <h4 className="font-semibold text-sm mb-1">Analyze</h4>
                      <p className="text-xs text-muted-foreground">
                        Identificar causas-raiz dos problemas
                      </p>
                    </div>
                    <div className="p-3 bg-orange-500/5 border-l-4 border-orange-500 rounded">
                      <h4 className="font-semibold text-sm mb-1">Improve</h4>
                      <p className="text-xs text-muted-foreground">
                        Implementar e testar soluções
                      </p>
                    </div>
                    <div className="p-3 bg-pink-500/5 border-l-4 border-pink-500 rounded">
                      <h4 className="font-semibold text-sm mb-1">Control</h4>
                      <p className="text-xs text-muted-foreground">
                        Monitorar para sustentar melhorias
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">8 Tipos de Desperdício (Lean)</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">1. Transport</h4>
                    <p className="text-xs text-muted-foreground">Movimentação desnecessária de dados/informações</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">2. Inventory</h4>
                    <p className="text-xs text-muted-foreground">Excesso de work in progress, filas</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">3. Motion</h4>
                    <p className="text-xs text-muted-foreground">Movimentos extras de pessoas/sistemas</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">4. Waiting</h4>
                    <p className="text-xs text-muted-foreground">Tempo ocioso esperando aprovações/dados</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">5. Overprocessing</h4>
                    <p className="text-xs text-muted-foreground">Fazer mais do que o cliente precisa</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">6. Overproduction</h4>
                    <p className="text-xs text-muted-foreground">Produzir antes da demanda</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">7. Defects</h4>
                    <p className="text-xs text-muted-foreground">Erros que requerem retrabalho</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">8. Skills</h4>
                    <p className="text-xs text-muted-foreground">Subutilização de talentos da equipe</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Exemplo Prático: Otimização de Reconciliação</h3>
                <div className="p-4 bg-muted rounded-lg space-y-3 text-sm">
                  <div>
                    <Badge className="mb-2">Problema</Badge>
                    <p className="text-muted-foreground">Processo de reconciliação manual demora 4 horas/dia e tem 10% de erro</p>
                  </div>
                  <div>
                    <Badge className="mb-2">Abordagem Lean</Badge>
                    <p className="text-muted-foreground">
                      Mapear value stream, identificar que 60% do tempo é gasto aguardando downloads de arquivos (Waiting) 
                      e 25% em conferências duplicadas (Overprocessing)
                    </p>
                  </div>
                  <div>
                    <Badge className="mb-2">Abordagem Six Sigma</Badge>
                    <p className="text-muted-foreground">
                      Coletar dados de 100 reconciliações, identificar que 80% dos erros vêm de formato inconsistente 
                      de arquivos (causa-raiz)
                    </p>
                  </div>
                  <div>
                    <Badge className="mb-2">Solução</Badge>
                    <p className="text-muted-foreground">
                      Automatizar download via API, padronizar formato de entrada, implementar validação automática. 
                      Resultado: 4h → 30min, 10% erro → 1% erro
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
