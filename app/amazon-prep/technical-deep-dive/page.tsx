import { AlertTriangle, Cpu, Plug, ShieldCheck, Workflow } from "lucide-react";

import AmazonPortalSection from "@/components/amazon/portal-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "../styles.css";

const architectureLayers = [
  {
    name: "Entrada & Autorização",
    details: "Amazon API Gateway + Lambda validam requests e fazem throttling por merchant.",
    signals: "Latência <120ms, taxonomia correta por método de pagamento.",
  },
  {
    name: "Fraude & Decisão",
    details: "Amazon Fraud Detector + Step Functions orquestram regras e modelos customizados.",
    signals: "Precisão >97%, falsos positivos <1.2%.",
  },
  {
    name: "Processamento & Liquidação",
    details: "EventBridge transmite eventos para services de captura, conciliação e ledger.",
    signals: "Falhas <0.05% e reconciliação automática >92%.",
  },
  {
    name: "Notificações & Insights",
    details: "S3 + Athena + QuickSight alimentam dashboards e alertas de negócio.",
    signals: "Dashboards atualizados a cada 15min, sem gaps de dados.",
  },
];

const awsServices = [
  { name: "Lambda", use: "Orquestra validações, cálculo de taxas e enrichment de eventos." },
  { name: "EventBridge", use: "Barramento para PaymentInitiated, PaymentAuthorized, Settlement." },
  { name: "DynamoDB", use: "Estados de transação e locks de idempotência." },
  { name: "Step Functions", use: "Refunds, chargebacks e fluxos com rollback controlado." },
  { name: "KMS / Payment Cryptography", use: "Gestão de chaves e HSM compliant com PCI." },
  { name: "CloudWatch & X-Ray", use: "Observabilidade, dashboards e tracing de chamadas." },
];

const resiliencePlaybooks = [
  {
    title: "PIX Gateway",
    steps: [
      "Monitorar fila de autorização no EventBridge (lag >30s).",
      "Acionar fallback para gateway secundário (Lambda switch).",
      "Registrar incidente no PagerDuty e atualizar Andreia em 15min.",
      "Rodar post-mortem em 24h com métricas e recomendações.",
    ],
  },
  {
    title: "Adquirente Cartões",
    steps: [
      "Verificar alarmes de latência no CloudWatch (p95 >500ms).",
      "Habilitar roteamento dinâmico por approval histórica.",
      "Comunicar merchants impactados via template pronto.",
      "Atualizar dashboard de custo/approval após normalização.",
    ],
  },
];

const observability = [
  {
    category: "Alarmes críticos",
    items: [
      "Approval rate <92% (Looker + PagerDuty)",
      "Latência PIX >200ms",
      "Fila de reconciliação >15min",
      "Erros 5xx API >0.2%",
    ],
  },
  {
    category: "Dashboards",
    items: [
      "Scorecard LATAM (Looker)",
      "Operational Health (CloudWatch)",
      "AI/ML Experiments (SageMaker Studio)",
    ],
  },
];

const integrationChecklist = [
  "Confirmar contratos e chaves no AWS Secrets Manager.",
  "Configurar alarmes de SLA específicos por parceiro.",
  "Adicionar fluxos ao runbook compartilhado.",
  "Realizar sandbox test + game day antes do rollout.",
];

export default function SystemsToolingPage() {
  return (
    <AmazonPortalSection
      title="Systems & Tooling"
      description="Mapa tático da pilha AWS + integrações de pagamento usadas no LATAM. Serve como referência para incidentes, game days e revisões com Auditores/Andreia."
      kicker="Arquitetura viva"
      updatedAt="23·11·2025"
    >
      <section className="grid gap-4 md:grid-cols-2">
        {architectureLayers.map((layer) => (
          <Card key={layer.name} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cpu className="text-primary" />
                <CardTitle className="text-base">{layer.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{layer.details}</p>
              <Badge variant="outline">Sinal saudável: {layer.signals}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Workflow className="text-primary" />
          <h3 className="amazon-prep-section-title">Serviços AWS essenciais</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {awsServices.map((service) => (
            <div key={service.name} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {resiliencePlaybooks.map((playbook) => (
          <Card key={playbook.title} className="border-white/10 bg-pop/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" />
                <CardTitle className="text-base">{playbook.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {playbook.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-primary" />
          <div>
            <h3 className="amazon-prep-section-title">Observabilidade e alarmes</h3>
            <p className="text-sm text-muted-foreground">O que precisa estar verde antes do WBR.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {observability.map((block) => (
            <div key={block.category} className="amazon-portal-card">
              <p className="amazon-portal-card-title">{block.category}</p>
              <ul className="amazon-portal-list list-disc list-inside">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="amazon-portal-card">
        <div className="flex items-center gap-3 mb-4">
          <Plug className="text-primary" />
          <h3 className="amazon-prep-section-title">Checklist para novas integrações</h3>
        </div>
        <ul className="amazon-portal-list list-disc list-inside">
          {integrationChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </AmazonPortalSection>
  );
}
/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TechnicalDeepDivePage() {
  return (
    <div className="container max-w-6xl py-10 px-6 space-y-8">
      <Link href="/amazon-prep" className="inline-flex items-center text-base text-muted-foreground hover:text-primary transition-colors group">
        <ArrowLeftIcon className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Technical Deep Dive</h1>
        <p className="text-muted-foreground text-xl max-w-3xl">
          Arquitetura de sistemas de pagamento, AWS services e segurança para operações em LATAM
        </p>
      </div>

      <Tabs defaultValue="architecture" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 h-14">
          <TabsTrigger value="architecture" className="text-base">Arquitetura</TabsTrigger>
          <TabsTrigger value="aws" className="text-base">AWS Services</TabsTrigger>
          <TabsTrigger value="security" className="text-base">Segurança</TabsTrigger>
          <TabsTrigger value="apis" className="text-base">APIs & Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Payment System Architecture</CardTitle>
              <CardDescription className="text-base">Arquitetura de microsserviços e event-driven na AWS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Conceitos Fundamentais</h3>
                
                <div className="space-y-5">
                  <div className="p-5 border-2 rounded-lg hover:border-primary/30 transition-colors">
                    <h4 className="font-semibold mb-3 text-lg">🔷 Microsserviços</h4>
                    <p className="text-base text-muted-foreground mb-4">
                      Arquitetura onde cada serviço é pequeno, focado em uma responsabilidade específica e pode ser desenvolvido/deployado independentemente.
                    </p>
                    <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                      Auth Service → Payment Service → Fraud Service → Settlement Service
                    </div>
                  </div>

                  <div className="p-5 border-2 rounded-lg hover:border-primary/30 transition-colors">
                    <h4 className="font-semibold mb-3 text-lg">⚡ Event-Driven Architecture</h4>
                    <p className="text-base text-muted-foreground mb-4">
                      Serviços se comunicam através de eventos assíncronos. Um serviço publica um evento e outros serviços interessados o consomem.
                    </p>
                    <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                      <div>Event: "PaymentInitiated" → Fraud Service analisa</div>
                      <div>Event: "PaymentAuthorized" → Settlement Service processa</div>
                      <div>Event: "PaymentCompleted" → Notification Service notifica</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔄 Serverless Computing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Execução de código sem gerenciar servidores. O provedor (AWS) cuida da infraestrutura, scaling e disponibilidade.
                    </p>
                    <Badge variant="outline">AWS Lambda</Badge>
                    <Badge variant="outline" className="ml-2">Auto-scaling</Badge>
                    <Badge variant="outline" className="ml-2">Pay-per-use</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Fluxo de Transação</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-blue-500/5 border-l-4 border-blue-500 rounded">
                    <Badge className="bg-blue-500 shrink-0">1</Badge>
                    <div>
                      <div className="font-semibold">Authorization Request</div>
                      <div className="text-muted-foreground">Cliente inicia pagamento → API Gateway recebe request</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-500/5 border-l-4 border-purple-500 rounded">
                    <Badge className="bg-purple-500 shrink-0">2</Badge>
                    <div>
                      <div className="font-semibold">Fraud Detection</div>
                      <div className="text-muted-foreground">Amazon Fraud Detector analisa em tempo real usando ML</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-500/5 border-l-4 border-green-500 rounded">
                    <Badge className="bg-green-500 shrink-0">3</Badge>
                    <div>
                      <div className="font-semibold">Processing</div>
                      <div className="text-muted-foreground">Enviado para emissor/adquirente através de payment gateway</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-500/5 border-l-4 border-orange-500 rounded">
                    <Badge className="bg-orange-500 shrink-0">4</Badge>
                    <div>
                      <div className="font-semibold">Settlement</div>
                      <div className="text-muted-foreground">Reconciliação e transferência de fundos (batch process)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aws" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AWS Lambda</CardTitle>
                <CardDescription>Serverless compute</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Executar código em resposta a eventos de transação</p>
                <p><strong>Vantagem:</strong> Auto-scaling, pay-per-execution</p>
                <p><strong>Exemplo:</strong> Validação de dados, cálculo de taxas, envio de notificações</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amazon DynamoDB</CardTitle>
                <CardDescription>NoSQL Database</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Armazenar dados de sessão e metadados de transação</p>
                <p><strong>Vantagem:</strong> Baixa latência (&lt;10ms), alta disponibilidade</p>
                <p><strong>Exemplo:</strong> Cache de dados do usuário, estados de transação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amazon EventBridge</CardTitle>
                <CardDescription>Event Bus Service</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Barramento central de eventos entre serviços</p>
                <p><strong>Vantagem:</strong> Desacoplamento, routing de eventos</p>
                <p><strong>Exemplo:</strong> "PaymentAuthorized" → múltiplos consumers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AWS Step Functions</CardTitle>
                <CardDescription>Workflow Orchestration</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Orquestrar workflows complexos de pagamento</p>
                <p><strong>Vantagem:</strong> Visual workflow, error handling, retry logic</p>
                <p><strong>Exemplo:</strong> Fluxo de refund com múltiplas etapas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amazon S3</CardTitle>
                <CardDescription>Object Storage</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Armazenar logs, datasets de ML, arquivos de auditoria</p>
                <p><strong>Vantagem:</strong> Durabilidade 99.999999999%, baixo custo</p>
                <p><strong>Exemplo:</strong> Logs de transação, relatórios de reconciliação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amazon CloudWatch</CardTitle>
                <CardDescription>Monitoring & Observability</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Uso:</strong> Monitorar métricas, logs e criar alarmes</p>
                <p><strong>Vantagem:</strong> Visibilidade completa, alertas proativos</p>
                <p><strong>Exemplo:</strong> Alarme quando taxa de autorização &lt; 90%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança e Compliance</CardTitle>
              <CardDescription>PCI DSS, criptografia e fraud detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">PCI DSS Level 1</h3>
                <p className="text-sm text-muted-foreground">
                  Payment Card Industry Data Security Standard - o mais alto nível de conformidade para processamento de cartões.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold text-sm mb-1">🔐 Requirement 1-2</div>
                    <div className="text-xs text-muted-foreground">Firewall e configurações seguras</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold text-sm mb-1">🔒 Requirement 3-4</div>
                    <div className="text-xs text-muted-foreground">Criptografia de dados e transmissão segura</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold text-sm mb-1">🛡️ Requirement 5-6</div>
                    <div className="text-xs text-muted-foreground">Antivírus e sistemas seguros</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold text-sm mb-1">👤 Requirement 7-8</div>
                    <div className="text-xs text-muted-foreground">Controle de acesso e autenticação</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">AWS Payment Cryptography</h3>
                <p className="text-sm text-muted-foreground">
                  Serviço gerenciado que fornece HSMs (Hardware Security Modules) para operações criptográficas.
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <div><strong>Tokenization:</strong> Substituir número do cartão por token</div>
                  <div><strong>Encryption:</strong> AES-256 para dados em repouso</div>
                  <div><strong>Key Management:</strong> Rotação automática de chaves</div>
                  <div><strong>PIN Processing:</strong> Validação segura de PIN</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Amazon Fraud Detector</h3>
                <p className="text-sm text-muted-foreground">
                  ML-powered fraud detection baseado em 20+ anos de experiência da Amazon.
                </p>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">🎯 Account Takeover Detection</div>
                    <div className="text-sm text-muted-foreground">
                      Detecta quando uma conta foi comprometida analisando padrões de login, device fingerprint e comportamento.
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">💳 Online Fraud Detection</div>
                    <div className="text-sm text-muted-foreground">
                      Analisa transações em tempo real considerando valor, localização, histórico do cliente e device.
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">🤖 Custom ML Models</div>
                    <div className="text-sm text-muted-foreground">
                      Permite treinar modelos customizados com dados históricos da empresa.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Amazon Pay API v2</CardTitle>
              <CardDescription>RESTful API para integração de comerciantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Principais Endpoints</h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-muted rounded-lg">
                    <Badge className="bg-green-600 mb-2">POST</Badge>
                    <div className="ml-2 inline">/checkoutSessions</div>
                    <div className="text-muted-foreground mt-1 ml-2">Criar sessão de checkout</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Badge className="bg-blue-600 mb-2">GET</Badge>
                    <div className="ml-2 inline">/checkoutSessions/:id</div>
                    <div className="text-muted-foreground mt-1 ml-2">Obter status da sessão</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Badge className="bg-green-600 mb-2">POST</Badge>
                    <div className="ml-2 inline">/charges</div>
                    <div className="text-muted-foreground mt-1 ml-2">Processar pagamento</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Badge className="bg-green-600 mb-2">POST</Badge>
                    <div className="ml-2 inline">/refunds</div>
                    <div className="text-muted-foreground mt-1 ml-2">Processar reembolso</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Autenticação</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Método:</strong> Signature Version 4 (AWS SigV4)</p>
                  <p><strong>Headers:</strong> Authorization, X-Amz-Date, X-Amz-Pay-Region</p>
                  <p><strong>Segurança:</strong> HMAC-SHA256 signature de cada request</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Webhooks (IPNs)</h3>
                <p className="text-sm text-muted-foreground">
                  Instant Payment Notifications - notificações assíncronas sobre mudanças de status.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">PaymentAuthorized</div>
                    <div className="text-muted-foreground text-xs">Pagamento foi autorizado pelo emissor</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">PaymentCaptured</div>
                    <div className="text-muted-foreground text-xs">Fundos foram capturados</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">PaymentRefunded</div>
                    <div className="text-muted-foreground text-xs">Reembolso foi processado</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">ChargebackInitiated</div>
                    <div className="text-muted-foreground text-xs">Cliente contestou a transação</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">SDKs Disponíveis</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PHP</Badge>
                  <Badge variant="outline">.NET</Badge>
                  <Badge variant="outline">Java</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Ruby</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
