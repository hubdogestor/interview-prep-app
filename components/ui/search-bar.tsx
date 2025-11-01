"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters: SearchFilters) => void;
  showFilters?: boolean;
  filterOptions?: {
    categories?: { value: string; label: string }[];
    sortOptions?: { value: string; label: string }[];
  };
}

export interface SearchFilters {
  category?: string;
  sortBy?: string;
  favoriteOnly?: boolean;
}

export function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  showFilters = true,
  filterOptions,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  const handleSearch = (newQuery?: string, newFilters?: SearchFilters) => {
    const searchQuery = newQuery !== undefined ? newQuery : query;
    const searchFilters = newFilters !== undefined ? newFilters : filters;
    onSearch(searchQuery, searchFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    handleSearch(query, clearedFilters);
  };

  const handleClearAll = () => {
    setQuery("");
    const clearedFilters = {};
    setFilters(clearedFilters);
    handleSearch("", clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className="pl-9 pr-9"
        />
        {query && (
          <button
            type="button"
            onClick={handleClearAll}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showFilters && (
        <Popover open={showFilterPopover} onOpenChange={setShowFilterPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium uppercase text-sm">Filtros</h4>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-auto p-1 text-xs"
                  >
                    Limpar
                  </Button>
                )}
              </div>

              {filterOptions?.categories && (
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase">
                    Categoria
                  </label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) => {
                      const newFilters = {
                        ...filters,
                        category: value === "all" ? undefined : value,
                      };
                      setFilters(newFilters);
                      handleSearch(query, newFilters);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {filterOptions.categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {filterOptions?.sortOptions && (
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase">
                    Ordenar por
                  </label>
                  <Select
                    value={filters.sortBy || "recent"}
                    onValueChange={(value) => {
                      const newFilters = {
                        ...filters,
                        sortBy: value,
                      };
                      setFilters(newFilters);
                      handleSearch(query, newFilters);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mais recentes" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium uppercase">
                  Apenas Favoritos
                </label>
                <Button
                  variant={filters.favoriteOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const newFilters = {
                      ...filters,
                      favoriteOnly: !filters.favoriteOnly,
                    };
                    setFilters(newFilters);
                    handleSearch(query, newFilters);
                  }}
                >
                  {filters.favoriteOnly ? "Sim" : "Não"}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
