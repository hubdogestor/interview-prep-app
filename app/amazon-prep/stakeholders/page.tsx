import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon, LinkedinIcon, MailIcon, BriefcaseIcon } from "lucide-react";

export default function StakeholdersPage() {
  return (
    <div className="container max-w-6xl py-10 px-6 space-y-8">
      <Link href="/amazon-prep" className="inline-flex items-center text-base text-muted-foreground hover:text-primary transition-colors group">
        <ArrowLeftIcon className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Stakeholders</h1>
        <p className="text-muted-foreground text-xl max-w-3xl">
          Perfis detalhados dos principais stakeholders: Andreia Guarino (Manager) e Sujash Biswas (Head LATAM)
        </p>
      </div>

      <Tabs defaultValue="andreia" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 h-14">
          <TabsTrigger value="andreia" className="text-base">Andreia Guarino Souza</TabsTrigger>
          <TabsTrigger value="sujash" className="text-base">Sujash Biswas</TabsTrigger>
        </TabsList>

        <TabsContent value="andreia" className="space-y-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">Andreia Guarino Souza</CardTitle>
                  <CardDescription className="text-base">
                    Senior Program Manager - Futura Gestora Direta
                  </CardDescription>
                </div>
                <Badge className="bg-purple-500">Direct Manager</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">20+ anos</div>
                  <div className="text-sm text-muted-foreground">Experiência em Pagamentos</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">3+ anos</div>
                  <div className="text-sm text-muted-foreground">Amazon Payments Brasil</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">Six Sigma</div>
                  <div className="text-sm text-muted-foreground">Yellow Belt Certified</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Background Profissional</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Amazon Payments (2021 - Presente)</div>
                        <div className="text-sm text-muted-foreground">Senior Program Manager</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Liderou iniciativas que resultaram em prêmio "Best Approval Rate" da Elo (2021)</li>
                      <li>Gerenciamento de parcerias estratégicas com bandeiras e adquirentes</li>
                      <li>Otimização de processos usando Lean e Six Sigma</li>
                      <li>Foco em KPIs de performance e eficiência operacional</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Banco BV (Grupo Votorantim)</div>
                        <div className="text-sm text-muted-foreground">Gerente de Relacionamento & Processos</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Experiência com emissão e adquirência de cartões</li>
                      <li>Gestão de relacionamento com grandes parceiros</li>
                      <li>Profundo conhecimento do mercado bancário brasileiro</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Orbitall</div>
                        <div className="text-sm text-muted-foreground">Processadora de Pagamentos</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Experiência técnica com processamento de transações</li>
                      <li>Conhecimento deep do fluxo: Authorization → Processing → Settlement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Expertise Técnica</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🎯 Domínio em Pagamentos</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Fluxo completo de transações</li>
                      <li>Redes de cartão (Visa, Mastercard, Elo)</li>
                      <li>Adquirência e processamento</li>
                      <li>Reconciliação e settlement</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">📊 Metodologias</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Six Sigma (Yellow Belt)</li>
                      <li>Lean Manufacturing</li>
                      <li>Scrum/Kanban</li>
                      <li>Modelo de Squads</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">💼 Gestão</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Relacionamento com parceiros</li>
                      <li>Gestão de KPIs complexos</li>
                      <li>Liderança de iniciativas estratégicas</li>
                      <li>Negociação com bandeiras</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🏆 Resultados</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Melhoria de approval rates</li>
                      <li>Otimização de processos</li>
                      <li>Redução de custos operacionais</li>
                      <li>Reconhecimento de parceiros</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Perfil de Liderança</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded">
                    <h4 className="font-semibold mb-2">📈 Data-Driven</h4>
                    <p className="text-sm text-muted-foreground">
                      Andreia valoriza decisões baseadas em dados concretos. Cada proposta deve vir acompanhada de análises 
                      quantitativas mostrando impacto esperado em KPIs como taxa de autorização, custo por transação e eficiência operacional.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/5 border-l-4 border-green-500 rounded">
                    <h4 className="font-semibold mb-2">🔍 Foco em Excelência Operacional</h4>
                    <p className="text-sm text-muted-foreground">
                      Com certificação Six Sigma e experiência em Lean, ela busca constantemente eliminar desperdícios e 
                      otimizar processos. Demonstre pensamento crítico para identificar ineficiências.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/5 border-l-4 border-purple-500 rounded">
                    <h4 className="font-semibold mb-2">🤝 Orientada a Relacionamentos</h4>
                    <p className="text-sm text-muted-foreground">
                      Experiência sólida em gestão de parcerias. Entende a importância de colaboração com bandeiras, 
                      adquirentes e parceiros estratégicos. Valoriza networking e diplomacia.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-500/5 border-l-4 border-orange-500 rounded">
                    <h4 className="font-semibold mb-2">🎯 Orientada a Resultados</h4>
                    <p className="text-sm text-muted-foreground">
                      O prêmio da Elo demonstra seu foco em entregar resultados tangíveis e mensuráveis. Ela espera 
                      ownership e accountability de seu time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Como se Alinhar com Andreia</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-4 border rounded-lg border-green-500/50 bg-green-500/5">
                    <h4 className="font-semibold mb-2 text-green-600">✓ Faça</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Traga dados e análises concretas</li>
                      <li>Demonstre conhecimento do ecossistema brasileiro</li>
                      <li>Proponha otimizações de processo</li>
                      <li>Mostre resultados quantificáveis de experiências passadas</li>
                      <li>Use metodologias Lean/Six Sigma</li>
                      <li>Mantenha foco em KPIs de performance</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg border-red-500/50 bg-red-500/5">
                    <h4 className="font-semibold mb-2 text-red-600">✗ Evite</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Propostas vagas sem embasamento</li>
                      <li>Ignorar o contexto do mercado brasileiro</li>
                      <li>Focar apenas em teoria sem execução</li>
                      <li>Negligenciar relacionamentos com parceiros</li>
                      <li>Subestimar complexidade operacional</li>
                      <li>Apresentar apenas problemas sem soluções</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  💡 Perguntas Inteligentes para Andreia
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Qual foi a principal alavanca que levou ao reconhecimento da Elo em 2021?"</p>
                    <p className="text-xs text-muted-foreground">Mostra interesse genuíno nas conquistas dela e oportunidade de aprender</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Considerando sua experiência, quais são os 3 principais desafios operacionais para os próximos 12 meses?"</p>
                    <p className="text-xs text-muted-foreground">Demonstra visão estratégica e desejo de contribuir</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Como você vê a evolução do PIX impactando nossa estratégia de parcerias com adquirentes?"</p>
                    <p className="text-xs text-muted-foreground">Conecta conhecimento de mercado com operações</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Quais KPIs você considera mais críticos para este role nos primeiros 90 dias?"</p>
                    <p className="text-xs text-muted-foreground">Mostra foco em resultados e alinhamento de expectativas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sujash" className="space-y-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">Sujash Biswas</CardTitle>
                  <CardDescription className="text-base">
                    Head of Payment Programs, LATAM
                  </CardDescription>
                </div>
                <Badge className="bg-blue-500">Senior Leadership</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">10+ anos</div>
                  <div className="text-sm text-muted-foreground">Carreira na Amazon</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">3 Países</div>
                  <div className="text-sm text-muted-foreground">EUA, Índia, Brasil (LATAM)</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">MBA</div>
                  <div className="text-sm text-muted-foreground">Marketing Strategy</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Trajetória na Amazon</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Head of Payment Programs - LATAM (Atual)</div>
                        <div className="text-sm text-muted-foreground">Amazon Brasil (São Paulo)</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Liderança de programas estratégicos de pagamento para toda América Latina</li>
                      <li>Gestão de parcerias como Oakberry</li>
                      <li>Escalar operações em mercados emergentes complexos</li>
                      <li>Visão regional com execução local</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Amazon Pay - Índia</div>
                        <div className="text-sm text-muted-foreground">Digital Payments Operations</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Experiência com UPI (equivalente indiano ao PIX)</li>
                      <li>Mercado de alto crescimento e inovação em payments</li>
                      <li>Gestão de operações em escala massiva</li>
                      <li>Lidou com ambiente regulatório complexo</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Operations Manager - USA</div>
                        <div className="text-sm text-muted-foreground">Seattle, WA</div>
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-8">
                      <li>Business Analyst e Operations</li>
                      <li>Base sólida em metodologias Amazon</li>
                      <li>Experiência com mercado mais maduro</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Visão Estratégica</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded">
                    <h4 className="font-semibold mb-2">🌎 Perspectiva Global com Execução Local</h4>
                    <p className="text-sm text-muted-foreground">
                      Experiência em 3 mercados distintos (EUA desenvolvido, Índia emergente de alto crescimento, LATAM emergente com desafios únicos). 
                      Ele entende que não existe "one size fits all" e busca adaptar estratégias globais para realidades locais.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/5 border-l-4 border-green-500 rounded">
                    <h4 className="font-semibold mb-2">📈 Foco em Escalabilidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Como Head da região, Sujash está focado em construir soluções que possam escalar para outros países da LATAM 
                      (Argentina, México, Chile, etc). Pensa em arquiteturas, processos e parcerias que sejam replicáveis.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/5 border-l-4 border-purple-500 rounded">
                    <h4 className="font-semibold mb-2">🚀 Inovação em Mercados Emergentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Experiência com UPI na Índia (sistema de pagamentos instantâneos similar ao PIX) mostra que ele entende 
                      o poder disruptivo de inovações em payments em mercados emergentes. Busca oportunidades similares na LATAM.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-500/5 border-l-4 border-orange-500 rounded">
                    <h4 className="font-semibold mb-2">🤝 Parcerias Estratégicas</h4>
                    <p className="text-sm text-muted-foreground">
                      A parceria com Oakberry indica foco em construir ecossistemas. Ele valoriza relacionamentos de longo prazo 
                      que criem valor mútuo e diferenciem a Amazon no mercado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Estilo de Liderança</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🎯 Think Big</h4>
                    <p className="text-xs text-muted-foreground">
                      Valoriza soluções ambiciosas que não apenas resolvem o problema imediato mas transformam a operação. 
                      Pensa em como impactar toda LATAM, não apenas um país.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">📊 Data & Results</h4>
                    <p className="text-xs text-muted-foreground">
                      Background em Business Analysis. Espera comunicação clara, baseada em fatos, com métricas de sucesso 
                      bem definidas.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🌟 Customer Obsession</h4>
                    <p className="text-xs text-muted-foreground">
                      10+ anos na Amazon significam profundo alinhamento com os Leadership Principles. Sempre volta à pergunta: 
                      "Como isso melhora a experiência do cliente?"
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🔄 Bias for Action</h4>
                    <p className="text-xs text-muted-foreground">
                      Em mercados emergentes, velocidade importa. Ele valoriza execução rápida com decisões reversíveis, 
                      testando e iterando.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Paralelos: Índia vs Brasil</h3>
                <p className="text-sm text-muted-foreground">
                  A experiência de Sujash com UPI na Índia é extremamente relevante para o contexto brasileiro com PIX.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">🇮🇳 Índia - UPI</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Lançado em 2016</li>
                      <li>✓ Pagamentos instantâneos 24/7</li>
                      <li>✓ Baseado em mobile-first</li>
                      <li>✓ Crescimento explosivo (130B+ transações/ano em 2024)</li>
                      <li>✓ Múltiplas wallets competindo (GPay, PhonePe, Paytm)</li>
                      <li>✓ Impulsionou digitalização financeira massiva</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">🇧🇷 Brasil - PIX</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Lançado em 2020</li>
                      <li>✓ Pagamentos instantâneos 24/7</li>
                      <li>✓ Integrado com sistema bancário</li>
                      <li>✓ Crescimento explosivo (63.8B+ transações em 2024)</li>
                      <li>✓ Competição com cartões e boleto</li>
                      <li>✓ Transformando e-commerce e varejo</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm">
                  <strong>Lições da Índia aplicáveis ao Brasil:</strong> Sujash vivenciou como pagamentos instantâneos podem 
                  rapidamente se tornar o método dominante. Ele sabe da importância de integração seamless, da necessidade de 
                  infraestrutura robusta para lidar com picos, e das oportunidades de criar novos produtos em cima dessa base 
                  (crédito instantâneo, Buy Now Pay Later, etc).
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Como se Alinhar com Sujash</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-4 border rounded-lg border-green-500/50 bg-green-500/5">
                    <h4 className="font-semibold mb-2 text-green-600">✓ Faça</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Pense em soluções escaláveis para LATAM</li>
                      <li>Conecte suas propostas aos Leadership Principles</li>
                      <li>Mostre visão de longo prazo</li>
                      <li>Use metodologia STAR para exemplos</li>
                      <li>Demonstre customer obsession</li>
                      <li>Traga insights de outros mercados</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg border-red-500/50 bg-red-500/5">
                    <h4 className="font-semibold mb-2 text-red-600">✗ Evite</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Soluções muito localizadas sem escalabilidade</li>
                      <li>Ignorar contexto global da Amazon</li>
                      <li>Focar apenas em tática sem estratégia</li>
                      <li>Comunicação prolixa sem clareza</li>
                      <li>Propostas que não beneficiam o cliente</li>
                      <li>Ignorar aprendizados de outros mercados</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  💡 Perguntas Inteligentes para Sujash
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Comparando UPI e PIX, quais lições da Índia você acredita que sejam mais valiosas para nossa estratégia na LATAM?"</p>
                    <p className="text-xs text-muted-foreground">Mostra que você pesquisou o background dele e conecta experiências</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Qual é a visão de longo prazo para Amazon Payments na América Latina? Como este role contribui para essa visão?"</p>
                    <p className="text-xs text-muted-foreground">Demonstra pensamento estratégico e alinhamento com objetivos maiores</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Considerando a parceria Oakberry, como você vê a evolução de parcerias estratégicas na região?"</p>
                    <p className="text-xs text-muted-foreground">Mostra interesse na estratégia de partnerships</p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="font-medium mb-1">"Quais são os maiores desafios que você enxerga para escalar Payment Operations na LATAM nos próximos 2-3 anos?"</p>
                    <p className="text-xs text-muted-foreground">Demonstra visão de longo prazo e desejo de contribuir para superá-los</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Estratégia de Comunicação</CardTitle>
          <CardDescription>Como se comunicar efetivamente com cada stakeholder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge className="bg-purple-500">Andreia</Badge>
                <span>Gestora Direta</span>
              </h3>
              <div className="text-sm space-y-2">
                <div className="p-3 border rounded-lg">
                  <strong>Frequência:</strong> Semanal (1:1s)
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Formato:</strong> Métricas detalhadas, análises de KPIs, propostas de otimização
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Tom:</strong> Técnico e data-driven, foco em execução
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Documentação:</strong> Dashboards atualizados, relatórios de status, propostas escritas
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge className="bg-blue-500">Sujash</Badge>
                <span>Senior Leadership</span>
              </h3>
              <div className="text-sm space-y-2">
                <div className="p-3 border rounded-lg">
                  <strong>Frequência:</strong> Mensal ou ad-hoc para iniciativas estratégicas
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Formato:</strong> Executive summaries, 6-Pagers para decisões importantes
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Tom:</strong> Estratégico, foco em impacto regional e alinhamento com visão
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Documentação:</strong> PR/FAQs, business cases, apresentações executivas
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
