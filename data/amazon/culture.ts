import { FileText, Target, Users } from "lucide-react";

export const cultureData = {
  hero: {
    title: "The Amazonian Way",
    subtitle: "Culture, Mechanisms & Leadership",
    description: "Na Amazon, a cultura não é apenas um poster na parede. É um sistema operacional. Para ter sucesso no Day 1, você precisa dominar os mecanismos que movem a empresa.",
  },
  sections: [
    {
      id: "lps",
      title: "Leadership Principles",
      description: "Os 16 princípios que guiam cada decisão, entrevista e avaliação de performance.",
      icon: Users,
      href: "/amz-pay-ops/culture/lps",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "writing",
      title: "Writing Culture",
      description: "PowerPoint é proibido. Aprenda a arte dos 6-pagers e PR/FAQs.",
      icon: FileText,
      href: "/amz-pay-ops/culture/writing",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      id: "working-backwards",
      title: "Working Backwards",
      description: "O mecanismo de inovação da Amazon. Comece pelo cliente, não pela tecnologia.",
      icon: Target,
      href: "/amz-pay-ops/culture/working-backwards",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ],
  lps: [
    {
      title: "Customer Obsession",
      description: "Líderes começam pelo cliente e trabalham de trás para frente.",
      opsApplication: "Em Ops, isso significa não apenas resolver tickets, mas eliminar a causa raiz que gerou o contato do cliente. É priorizar a experiência de pagamento acima da conveniência operacional.",
    },
    {
      title: "Ownership",
      description: "Líderes são donos. Eles pensam a longo prazo e não sacrificam valor de longo prazo por resultados de curto prazo.",
      opsApplication: "Você não diz 'isso não é meu trabalho'. Se um processo de pagamento falha, você é dono da resolução, mesmo que a falha seja em um parceiro externo.",
    },
    {
      title: "Invent and Simplify",
      description: "Líderes esperam e exigem inovação e invenção de suas equipes e sempre encontram maneiras de simplificar.",
      opsApplication: "Automatizar processos manuais de reconciliação. Usar IA para prever picos de volume. Simplificar dashboards complexos para métricas acionáveis.",
    },
    {
      title: "Are Right, A Lot",
      description: "Líderes estão certos muitas vezes. Eles têm forte julgamento e bons instintos.",
      opsApplication: "Usar dados para validar intuições. Quando os dados são escassos, usar experiência para tomar decisões difíceis sobre riscos de fraude vs. aprovação.",
    },
    {
      title: "Learn and Be Curious",
      description: "Líderes nunca param de aprender e sempre buscam melhorar a si mesmos.",
      opsApplication: "Entender profundamente como funciona o arranjo de pagamentos no Brasil. Estudar novas tecnologias de tokenização e Pix.",
    },
    {
      title: "Hire and Develop the Best",
      description: "Líderes elevam o nível de desempenho a cada contratação e promoção.",
      opsApplication: "Mentorar analistas júnior. Participar ativamente de Bar Raisers. Criar mecanismos de desenvolvimento para o time de Ops.",
    },
    {
      title: "Insist on the Highest Standards",
      description: "Líderes têm padrões implacavelmente altos - muitas pessoas podem pensar que esses padrões são irracionalmente altos.",
      opsApplication: "Não aceitar 'workarounds' permanentes. Exigir SLA de 99.99% dos parceiros. A qualidade da documentação técnica deve ser impecável.",
    },
    {
      title: "Think Big",
      description: "Pensar pequeno é uma profecia autorrealizável. Líderes criam e comunicam uma direção ousada.",
      opsApplication: "Não apenas melhorar o processo atual, mas repensar como pagamentos B2B deveriam funcionar daqui a 5 anos.",
    },
    {
      title: "Bias for Action",
      description: "Velocidade importa nos negócios. Muitas decisões e ações são reversíveis e não precisam de estudo extensivo.",
      opsApplication: "Lançar um piloto rápido para testar um novo adquirente em vez de passar meses em análise teórica. Corrigir um bug em produção imediatamente.",
    },
    {
      title: "Frugality",
      description: "Realizar mais com menos. Restrições geram desenvoltura, autossuficiência e invenção.",
      opsApplication: "Otimizar custos de transação. Automatizar para evitar contratar mais headcount operacional desnecessário.",
    },
    {
      title: "Earn Trust",
      description: "Líderes ouvem atentamente, falam com franqueza e tratam os outros com respeito.",
      opsApplication: "Admitir falhas operacionais rapidamente. Construir relacionamentos transparentes com Stakeholders (Andreia, Sujash).",
    },
    {
      title: "Dive Deep",
      description: "Líderes operam em todos os níveis, ficam conectados aos detalhes, auditam frequentemente.",
      opsApplication: "Não confiar apenas em médias. Olhar os outliers. Investigar uma falha de transação específica para entender o padrão.",
    },
    {
      title: "Have Backbone; Disagree and Commit",
      description: "Líderes são obrigados a desafiar respeitosamente as decisões quando discordam.",
      opsApplication: "Se um lançamento de produto coloca em risco a operação, você deve levantar a mão. Mas se a decisão for tomada, apoie totalmente.",
    },
    {
      title: "Deliver Results",
      description: "Líderes focam nos principais inputs para seu negócio e os entregam com a qualidade certa e no prazo certo.",
      opsApplication: "No final do dia, o volume processado, a taxa de aprovação e a redução de custos são o que importa.",
    },
    {
      title: "Strive to be Earth's Best Employer",
      description: "Líderes trabalham todos os dias para criar um ambiente de trabalho mais seguro, produtivo, de alto desempenho, mais diversificado e mais justo.",
      opsApplication: "Cuidar do bem-estar da equipe de operações, evitando burnout em picos de sazonalidade.",
    },
    {
      title: "Success and Scale Bring Broad Responsibility",
      description: "Nós começamos em uma garagem, mas não estamos mais lá. Somos grandes, impactamos o mundo e estamos longe de ser perfeitos.",
      opsApplication: "Considerar o impacto das nossas operações de pagamento na sociedade e na economia local.",
    },
  ],
  writing: {
    principles: [
      { title: "Be Concise", desc: "Menos é mais. Remova palavras desnecessárias." },
      { title: "Be Specific", desc: "Evite 'nós melhoramos a performance'. Diga 'nós reduzimos a latência em 200ms'." },
      { title: "No Weasel Words", desc: "Evite palavras vagas como 'geralmente', 'significativamente', 'provavelmente'." },
      { title: "Narrative Structure", desc: "Use frases completas e parágrafos, não bullet points (exceto quando estritamente necessário)." },
    ],
    artifacts: [
      {
        title: "6-Pager (Narrative)",
        desc: "O documento padrão para tomada de decisão. 6 páginas de conteúdo + apêndices ilimitados. Lido em silêncio no início da reunião.",
        structure: ["Context", "Problem Statement", "Proposed Solution", "Customer Benefit", "Strategic Alignment", "FAQ"],
      },
      {
        title: "PR/FAQ",
        desc: "Press Release / Frequently Asked Questions. Escrevemos o release de lançamento antes de construir o produto para garantir foco no cliente.",
        structure: ["Heading", "Subheading", "Summary", "Problem", "Solution", "Quote from Leader", "Customer Experience", "Call to Action", "Internal FAQ", "External FAQ"],
      },
      {
        title: "2-Pager",
        desc: "Versão mais curta para atualizações de status ou decisões menores.",
      },
    ],
  },
};
