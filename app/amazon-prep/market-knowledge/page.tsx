import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketKnowledgePage() {
  return (
    <div className="container max-w-6xl py-10 px-6 space-y-8">
      <Link href="/amazon-prep" className="inline-flex items-center text-base text-muted-foreground hover:text-primary transition-colors group">
        <ArrowLeftIcon className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Amazon Prep
      </Link>

      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Market Knowledge</h1>
        <p className="text-muted-foreground text-xl max-w-3xl">
          Conhecimento profundo do mercado brasileiro e LATAM de pagamentos, fintechs e regulamentação
        </p>
      </div>

      <Tabs defaultValue="pix" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 h-14">
          <TabsTrigger value="pix" className="text-base">PIX</TabsTrigger>
          <TabsTrigger value="cards" className="text-base">Cartões</TabsTrigger>
          <TabsTrigger value="fintechs" className="text-base">Fintechs</TabsTrigger>
          <TabsTrigger value="regulation" className="text-base">Regulamentação</TabsTrigger>
        </TabsList>

        <TabsContent value="pix" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">PIX - Pagamentos Instantâneos do Brasil</CardTitle>
              <CardDescription className="text-base">O sistema de pagamento instantâneo que revolucionou o mercado brasileiro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-500">63.8B</div>
                  <div className="text-sm text-muted-foreground">Transações em 2024</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500">R$ 26.5T</div>
                  <div className="text-sm text-muted-foreground">Volume movimentado</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-500">33%</div>
                  <div className="text-sm text-muted-foreground">Share no e-commerce</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Por que o PIX é importante?</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">⚡ Instantâneo 24/7</h4>
                    <p className="text-sm text-muted-foreground">
                      Transferências em menos de 10 segundos, disponível 24 horas por dia, 7 dias por semana, incluindo feriados.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">💰 Custo Zero para Pessoas</h4>
                    <p className="text-sm text-muted-foreground">
                      Sem tarifas para pessoas físicas. Para empresas, custo significativamente menor que cartões (típico 0.5% vs 2-4%).
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🎯 Simplicidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Pagamento via QR Code, chave PIX (CPF, e-mail, telefone) ou copia-e-cola. Sem intermediários.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔒 Segurança</h4>
                    <p className="text-sm text-muted-foreground">
                      Transações irrevogáveis (reduz fraude), sem exposição de dados bancários completos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Evolução do PIX</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-500/5 rounded">
                    <Badge className="bg-green-500">Nov 2020</Badge>
                    <div className="text-sm">
                      <div className="font-semibold">Lançamento</div>
                      <div className="text-muted-foreground">Sistema entra em operação</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-500/5 rounded">
                    <Badge className="bg-blue-500">2021</Badge>
                    <div className="text-sm">
                      <div className="font-semibold">PIX Saque e Troco</div>
                      <div className="text-muted-foreground">Saque em comércios físicos</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-l-4 border-purple-500 bg-purple-500/5 rounded">
                    <Badge className="bg-purple-500">2024</Badge>
                    <div className="text-sm">
                      <div className="font-semibold">PIX Automático</div>
                      <div className="text-muted-foreground">Pagamentos recorrentes autorizados</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-l-4 border-orange-500 bg-orange-500/5 rounded">
                    <Badge className="bg-orange-500">2025</Badge>
                    <div className="text-sm">
                      <div className="font-semibold">PIX por Aproximação (NFC)</div>
                      <div className="text-muted-foreground">Competição direta com cartões contactless</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Impacto no E-commerce</h3>
                <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Projeção para 2025:</span>
                    <span className="font-bold">PIX supera cartão de crédito</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de conversão:</span>
                    <span className="font-bold">15-20% maior que boleto</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo de confirmação:</span>
                    <span className="font-bold">&lt; 10 segundos vs 2-3 dias (boleto)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chargeback:</span>
                    <span className="font-bold">Praticamente zero (irrevogável)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  💡 Implicações para Amazon
                </h4>
                <p className="text-sm text-muted-foreground">
                  Para a Amazon operar competitivamente no Brasil, integração robusta com PIX é ESSENCIAL. 
                  Isso significa: checkout seamless, reconciliação automatizada, suporte a PIX Automático para 
                  Prime/assinaturas, e potencialmente PIX por aproximação para Whole Foods/Amazon Go no futuro.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Ecossistema de Cartões no Brasil</CardTitle>
              <CardDescription className="text-base">Bandeiras, adquirentes e tendências do mercado de cartões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Market Share - Bandeiras</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">Mastercard</span>
                      <span>51%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '51%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">Visa</span>
                      <span>31%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '31%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">Elo</span>
                      <span>14%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '14%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">Outros (Amex, Hipercard, etc)</span>
                      <span>4%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gray-500" style={{ width: '4%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Principais Adquirentes</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Cielo</div>
                    <div className="text-xs text-muted-foreground">Líder histórico, forte em retail físico</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Rede (Itaú)</div>
                    <div className="text-xs text-muted-foreground">Segunda maior, integração bancária</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Stone</div>
                    <div className="text-xs text-muted-foreground">Disruptor, foco em PMEs</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">PagSeguro</div>
                    <div className="text-xs text-muted-foreground">E-commerce + maquininha</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Mercado Pago</div>
                    <div className="text-xs text-muted-foreground">Ecossistema Mercado Livre</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">GetNet (Santander)</div>
                    <div className="text-xs text-muted-foreground">Apoio de grande banco</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contactless (NFC)</h3>
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500 mb-2">60%+</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Das transações com cartão já são por aproximação (contactless).
                  </p>
                  <div className="text-xs space-y-1">
                    <div>✓ Limite sem senha: R$ 200 (em revisão para R$ 300)</div>
                    <div>✓ Tempo de transação: &lt; 3 segundos</div>
                    <div>✓ Tecnologia: NFC (Near Field Communication)</div>
                    <div>✓ Adoção acelerada pela pandemia</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Parcelamento - Diferencial Brasileiro</h3>
                <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                  <p className="font-semibold">O Brasil é único no mundo pela massificação do parcelamento sem juros.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Padrão de mercado:</span>
                      <span className="font-bold">Até 12x sem juros</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quem paga os juros:</span>
                      <span className="font-bold">Lojista (via MDR maior)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact no AOV:</span>
                      <span className="font-bold">+40-60% em ticket médio</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expectativa do consumidor:</span>
                      <span className="font-bold">Essencial para compras &gt; R$ 200</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">MDR (Merchant Discount Rate)</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">Débito</div>
                    <div className="text-muted-foreground">0.8% - 1.5%</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">Crédito à vista</div>
                    <div className="text-muted-foreground">1.8% - 3.0%</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">Crédito parcelado</div>
                    <div className="text-muted-foreground">2.5% - 4.5%</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-2">PIX (para comparação)</div>
                    <div className="text-muted-foreground">0.3% - 0.8%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fintechs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fintechs e Bancos Digitais</CardTitle>
              <CardDescription>A revolução digital no setor financeiro brasileiro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-500">109M</div>
                  <div className="text-sm text-muted-foreground mb-2">Clientes Nubank</div>
                  <div className="text-xs text-muted-foreground">Maior banco digital do mundo</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500">66M</div>
                  <div className="text-sm text-muted-foreground mb-2">Usuários Mercado Pago</div>
                  <div className="text-xs text-muted-foreground">Super app de pagamentos</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-500">65M</div>
                  <div className="text-sm text-muted-foreground mb-2">Usuários PicPay</div>
                  <div className="text-xs text-muted-foreground">Carteira digital + social</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Principais Players e Posicionamento</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Nubank</h4>
                      <Badge className="bg-purple-600">Banco Digital</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Banco completo com conta, cartão de crédito/débito, investimentos, seguros e empréstimos.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>• Maior banco digital do mundo em base de clientes</div>
                      <div>• Forte foco em UX e tecnologia proprietária</div>
                      <div>• Roxinho icônico, NPS altíssimo</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Mercado Pago</h4>
                      <Badge className="bg-blue-600">Super App</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ecossistema de pagamentos do Mercado Livre - carteira digital, crédito, investimentos, maquininha.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>• Integração nativa com marketplace #1 da LATAM</div>
                      <div>• Forte em QR Code e pagamentos P2P</div>
                      <div>• Expansão agressiva em crédito</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">PicPay</h4>
                      <Badge className="bg-green-600">Carteira Digital</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Carteira digital com forte componente social - split de conta, cashback, marketplace.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>• Pioneer em QR Code no Brasil (antes do PIX)</div>
                      <div>• Network effect: transferências entre usuários</div>
                      <div>• Cashback e gamificação</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">C6 Bank</h4>
                      <Badge className="bg-yellow-600">Banco Digital</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Banco digital com foco em experiência premium e investimentos.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>• Respaldo do Grupo J&F (JBS)</div>
                      <div>• Plataforma de investimentos robusta</div>
                      <div>• Tag NFC sem necessidade de cartão físico</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Inter</h4>
                      <Badge className="bg-orange-600">Super App</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Banco digital que virou super app - marketplace, shopping, cashback, investimentos.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>• Estratégia de super app agressiva</div>
                      <div>• Loop Mall dentro do app</div>
                      <div>• Forte em Global Account (internacional)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Impacto das Fintechs</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">📱 Inclusão Financeira</div>
                    <div className="text-muted-foreground">Milhões de brasileiros tiveram acesso a conta bancária pela primeira vez</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">💰 Redução de Custos</div>
                    <div className="text-muted-foreground">Pressionaram bancos tradicionais a reduzirem tarifas</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">🚀 Inovação</div>
                    <div className="text-muted-foreground">Lançamento rápido de features (Open Finance, PIX, etc)</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">📊 Dados e Personalização</div>
                    <div className="text-muted-foreground">Uso de ML/AI para crédito, prevenção de fraude e UX</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ambiente Regulatório</CardTitle>
              <CardDescription>Banco Central, Open Finance e compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Banco Central do Brasil (BCB)</h3>
                <p className="text-sm text-muted-foreground">
                  Principal órgão regulador do Sistema Financeiro Nacional, responsável por definir políticas monetárias, 
                  regulamentar instituições financeiras e criar infraestruturas como o PIX.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Instituições de Pagamento (IPs)</div>
                    <div className="text-xs text-muted-foreground">
                      Regulamenta fintechs como Nubank, PicPay, Mercado Pago. Requer autorização para operar.
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Arranjos de Pagamento</div>
                    <div className="text-xs text-muted-foreground">
                      Regula infraestruturas como PIX, redes de cartão (Visa, Mastercard, Elo).
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">LGPD (Lei Geral de Proteção de Dados)</div>
                    <div className="text-xs text-muted-foreground">
                      Lei brasileira de privacidade, similar ao GDPR europeu. Impacta coleta e uso de dados.
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-semibold mb-1">Prevenção à Lavagem de Dinheiro</div>
                    <div className="text-xs text-muted-foreground">
                      KYC obrigatório, monitoramento de transações suspeitas, reporte ao COAF.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Open Finance Brasil</h3>
                <p className="text-sm text-muted-foreground">
                  Um dos ecossistemas de Open Finance mais avançados do mundo. Permite compartilhamento de dados 
                  financeiros entre instituições com consentimento explícito do cliente.
                </p>
                <div className="space-y-2">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-500/5 rounded">
                    <div className="font-semibold text-sm mb-1">Fase 1 - Dados Cadastrais</div>
                    <div className="text-xs text-muted-foreground">Informações sobre produtos e serviços das instituições</div>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-500/5 rounded">
                    <div className="font-semibold text-sm mb-1">Fase 2 - Dados do Cliente</div>
                    <div className="text-xs text-muted-foreground">Cadastro, saldos, transações, cartões, investimentos</div>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-500/5 rounded">
                    <div className="font-semibold text-sm mb-1">Fase 3 - Iniciação de Pagamentos</div>
                    <div className="text-xs text-muted-foreground">Autorizar pagamentos PIX via Open Finance</div>
                  </div>
                  <div className="p-3 border-l-4 border-orange-500 bg-orange-500/5 rounded">
                    <div className="font-semibold text-sm mb-1">Fase 4 - Dados Adicionais</div>
                    <div className="text-xs text-muted-foreground">Seguros, previdência, câmbio, outros serviços</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Oportunidades do Open Finance</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">💳 Checkout Agregado</h4>
                    <p className="text-sm text-muted-foreground">
                      Mostrar todas as contas bancárias do cliente em um único checkout, permitindo escolha da melhor opção.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🎯 Crédito Personalizado</h4>
                    <p className="text-sm text-muted-foreground">
                      Análise de crédito mais precisa baseada em histórico real de transações e saldos.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔄 Portabilidade Facilitada</h4>
                    <p className="text-sm text-muted-foreground">
                      Cliente pode migrar débitos automáticos e PIX Automático entre instituições facilmente.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📊 Gestão Financeira</h4>
                    <p className="text-sm text-muted-foreground">
                      Agregar dados de múltiplas instituições para visão consolidada das finanças.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  🎯 Estratégia para Amazon
                </h4>
                <p className="text-sm text-muted-foreground">
                  Open Finance abre portas para a Amazon oferecer experiências de checkout ainda mais seamless, 
                  integrando diretamente com contas bancárias dos clientes para pagamentos PIX com um clique. 
                  Também permite oferecer crédito mais competitivo ao avaliar o perfil real dos clientes.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Desafios Regulatórios</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg border-yellow-500/50 bg-yellow-500/5">
                    <div className="font-semibold mb-1">⚠️ Complexidade Tributária</div>
                    <div className="text-muted-foreground">Múltiplos impostos (PIS, COFINS, ISS, etc) com regras estaduais diferentes</div>
                  </div>
                  <div className="p-3 border rounded-lg border-yellow-500/50 bg-yellow-500/5">
                    <div className="font-semibold mb-1">⚠️ Mudanças Frequentes</div>
                    <div className="text-muted-foreground">Regulamentação em constante evolução, exige monitoramento</div>
                  </div>
                  <div className="p-3 border rounded-lg border-yellow-500/50 bg-yellow-500/5">
                    <div className="font-semibold mb-1">⚠️ Diferentes Estados</div>
                    <div className="text-muted-foreground">Regras podem variar por estado, complexidade operacional</div>
                  </div>
                  <div className="p-3 border rounded-lg border-yellow-500/50 bg-yellow-500/5">
                    <div className="font-semibold mb-1">⚠️ Compliance Rigoroso</div>
                    <div className="text-muted-foreground">Penalidades severas por não conformidade</div>
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
