"use client";

import DashboardPageLayout from "@/components/dashboard/layout";
import StarIcon from "@/components/icons/star";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft, Download } from "lucide-react";
import { SearchBar, SearchFilters } from "@/components/ui/search-bar";
import { useMemo, useState } from "react";
import { SkeletonGrid } from "@/components/ui/skeleton-cards";
import { exportCompetencias, downloadMarkdown } from "@/lib/export/markdown";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const categoryColors: Record<string, string> = {
  technical: "bg-chart-1",
  soft_skills: "bg-chart-2",
  leadership: "bg-chart-3",
};

export default function CompetenciasPage() {
  const router = useRouter();
  const { data, isLoading } = trpc.competencias.list.useQuery();
  const competencias = data?.items ?? [];

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const filteredCompetencias = useMemo(() => {
    let filtered = [...competencias];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (comp) =>
          comp.nome.toLowerCase().includes(query) ||
          comp.ferramentas?.some((tool) => tool.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (searchFilters.category && searchFilters.category !== "all") {
      filtered = filtered.filter(
        (comp) => comp.categoria === searchFilters.category
      );
    }

    // Sort
    if (searchFilters.sortBy === "alphabetical") {
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (searchFilters.sortBy === "nivel") {
      const nivelOrder = { expert: 4, advanced: 3, intermediate: 2, basic: 1 };
      filtered.sort(
        (a, b) =>
          (nivelOrder[b.nivel as keyof typeof nivelOrder] || 0) -
          (nivelOrder[a.nivel as keyof typeof nivelOrder] || 0)
      );
    }
    // Default is already by nivel desc, createdAt desc from the query

    return filtered;
  }, [competencias, searchQuery, searchFilters]);

  const handleExport = () => {
    if (competencias.length === 0) {
      toast.error("Não há competências para exportar");
      return;
    }

    const markdown = exportCompetencias(competencias);
    const filename = `competencias-${new Date().toISOString().split("T")[0]}`;
    downloadMarkdown(markdown, filename);
    toast.success("Competências exportadas com sucesso!");
  };

  if (isLoading) {
    return (
      <DashboardPageLayout
        header={{
          title: "Competências",
          description: "Your skills arsenal",
          icon: StarIcon,
        }}
      >
        <SkeletonGrid type="competencia" count={3} columns="1" />
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      header={{
        title: "Competências",
        description: "Your skills arsenal",
        icon: StarIcon,
        action: (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={competencias.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        ),
        search: (
          <SearchBar
            placeholder="Buscar por competência ou ferramenta..."
            onSearch={(query, filters) => {
              setSearchQuery(query);
              setSearchFilters(filters);
            }}
            filterOptions={{
              categories: [
                { value: "technical", label: "Technical" },
                { value: "soft_skills", label: "Soft Skills" },
                { value: "leadership", label: "Leadership" },
              ],
              sortOptions: [
                { value: "recent", label: "Mais recentes" },
                { value: "alphabetical", label: "Alfabética (A-Z)" },
                { value: "nivel", label: "Nível (Expert → Basic)" },
              ],
            }}
          />
        ),
      }}
    >
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredCompetencias.map((comp, index) => (
          <motion.div key={comp.id} variants={fadeInUp} custom={index}>
            <Card className="p-6 hover:bg-accent/50 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-display uppercase">{comp.nome}</h3>
                  <Badge
                    variant="outline"
                    className={`uppercase ${categoryColors[comp.categoria] ?? "bg-chart-1"}/20`}
                  >
                    {comp.categoria}
                  </Badge>
                </div>
                {comp.ferramentas && comp.ferramentas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comp.ferramentas.map((ferramenta) => (
                      <Badge key={ferramenta} variant="secondary" className="text-xs">
                        #{ferramenta}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <StarIcon className="size-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase">
                  Proficiency Level
                </span>
                <span className="font-display text-lg uppercase">{comp.nivel}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push(`/competencias/${comp.id}`)}
              >
                VIEW DETAILS
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/competencias/${comp.id}`)}
              >
                EDIT
              </Button>
            </div>
          </Card>
          </motion.div>
        ))}

        {filteredCompetencias.length === 0 && competencias.length > 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhuma competência encontrada com os filtros aplicados</p>
          </div>
        )}
        {competencias.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="uppercase">Nenhuma competência cadastrada ainda</p>
          </div>
        )}
      </motion.div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/competencias/novo")}
          className="w-full p-4 border border-dashed border-border hover:border-primary hover:bg-accent/50 rounded-lg transition-colors uppercase text-sm font-display flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          ADD NEW COMPETÊNCIA
        </button>
      </div>
    </DashboardPageLayout>
  );
}
