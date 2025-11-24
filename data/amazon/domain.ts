import { Activity, Banknote, CreditCard, Globe, Lock, RefreshCw, ShieldAlert, Wallet } from "lucide-react";

export const domainData = {
  hero: {
    title: "Payments & Business Ops",
    subtitle: "Domain Mastery",
    description: "Domine o ecossistema de pagamentos, entenda os produtos da Amazon e aplique excelência operacional. Este é o seu core business.",
  },
  sections: [
    {
      id: "fundamentals",
      title: "Payment Fundamentals",
      description: "O ciclo de vida da transação: Auth, Capture, Settlement e os players envolvidos.",
      icon: Banknote,
      href: "/amz-pay-ops/domain/fundamentals",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: "amazon-pay",
      title: "Amazon Pay Ecosystem",
      description: "Deep dive nos produtos: Wallet, BNPL, Amazon One e expansão LATAM.",
      icon: Wallet,
      href: "/amz-pay-ops/domain/amazon-pay",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      id: "risk-fraud",
      title: "Risk & Fraud",
      description: "Amazon Fraud Detector, Chargebacks e Prevenção.",
      icon: ShieldAlert,
      href: "/amz-pay-ops/domain/risk-fraud",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: "ops-excellence",
      title: "Operational Excellence",
      description: "Lean, Six Sigma, KPIs e Gestão de Incidentes.",
      icon: Activity,
      href: "/amz-pay-ops/domain/ops-excellence",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ],
  fundamentals: {
    flow: [
      {
        step: "1. Authorization",
        desc: "O cliente clica em 'Comprar'. O emissor verifica saldo/limite e bloqueia o valor. Nenhuma movimentação financeira real ocorre ainda.",
        actors: ["Gateway", "Adquirente", "Bandeira", "Emissor"],
      },
      {
        step: "2. Capture",
        desc: "A Amazon confirma o envio do produto. O valor bloqueado é efetivamente debitado da conta do cliente.",
        actors: ["Amazon", "Gateway", "Adquirente"],
      },
      {
        step: "3. Clearing",
        desc: "Troca de informações financeiras entre Adquirente e Emissor através da Bandeira para reconciliação.",
        actors: ["Adquirente", "Bandeira", "Emissor"],
      },
      {
        step: "4. Settlement",
        desc: "O dinheiro sai do Emissor, passa pela Bandeira/Adquirente e chega na conta da Amazon (Merchant).",
        actors: ["Banco Liquidante", "Amazon"],
      },
    ],
    players: [
      { name: "Acquirer (Adquirente)", role: "Processa pagamentos em nome do lojista (ex: Cielo, Rede, Adyen).", icon: RefreshCw },
      { name: "Issuer (Emissor)", role: "Banco que emitiu o cartão do cliente (ex: Nubank, Itaú). Aprova/Reprova.", icon: CreditCard },
      { name: "Scheme (Bandeira)", role: "Define as regras e conecta Adquirentes e Emissores (ex: Visa, Mastercard).", icon: Globe },
      { name: "Gateway", role: "Porta de entrada técnica que conecta o checkout da Amazon aos Adquirentes.", icon: Lock },
    ],
  },
  amazonPay: {
    products: [
      {
        title: "Amazon Pay (Core)",
        desc: "Checkout em sites de terceiros usando credenciais Amazon. Foco em conversão e confiança.",
        status: "Global",
      },
      {
        title: "Buy Now, Pay Later (BNPL)",
        desc: "Parcerias (ex: Affirm) para parcelamento. Aumenta ticket médio e acessibilidade.",
        status: "Strategic Growth",
      },
      {
        title: "Amazon One",
        desc: "Pagamento biométrico (palma da mão). Usado em Whole Foods e Amazon Go. O futuro do omnichannel.",
        status: "Innovation",
      },
      {
        title: "Digital Wallets",
        desc: "Integração com carteiras locais (Pix no Brasil, UPI na Índia) para localização.",
        status: "Localization",
      },
    ],
  },
  opsExcellence: {
    methodologies: [
      { title: "Lean", desc: "Foco na eliminação de desperdícios (Muda). Tudo que não gera valor para o cliente deve ser removido." },
      { title: "Six Sigma", desc: "Foco na redução da variabilidade. DMAIC (Define, Measure, Analyze, Improve, Control)." },
      { title: "Kaizen", desc: "Melhoria contínua. Pequenas mudanças incrementais e constantes." },
    ],
    kpis: [
      { name: "Auth Rate", desc: "% de transações aprovadas pelo emissor. O 'Santo Graal' de pagamentos." },
      { name: "Cost of Payments (CoP)", desc: "Custo total para processar um pagamento (MDR, Gateway fees, Fraude)." },
      { name: "Chargeback Rate", desc: "% de transações contestadas pelos clientes." },
      { name: "Latency", desc: "Tempo de resposta da transação (P99). Impacta diretamente a UX." },
    ],
  },
};
