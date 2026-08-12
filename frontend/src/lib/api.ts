const API_URL =
  import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";


export type CatmatItem = {
  catmat_id: number;
  codigo_catmat: string | null;
  descricao_catmat: string | null;
};


export type Produto = {
  produto_id: number;
  catmat_id: number | null;
  anvisa: string | null;
  generico: string | null;
  codigo_catmat: string | null;
};


export type ResumoMedicamento = {
  estoque_total: number | string;
  instituicoes_com_registro: number | string;
  instituicoes_estoque_zerado: number | string;
  preco_medio_compra: number | string | null;
};


export type LoteVencendo = {
  instituicao_id: number | null;
  produto_id: number | null;
  numero_do_lote: string | null;
  quantidade_do_item_em_estoque: number | string | null;
  data_de_posicao_no_estoque: string | null;
  data_de_validade: string | null;
};


export type LotesVencendoResponse = {
  dias: number;
  quantidade_lotes: number;
  items: LoteVencendo[];
};


export type EstoqueUf = {
  uf: string | null;
  estoque_total: number | string;
  num_instituicoes: number | string;
};


export type EvolucaoPreco = {
  data_de_compra: string;
  preco_medio: number | string;
};


export type FornecedorCompra = {
  nome_fornecedor: string | null;
  valor_total: number | string;
};


export type FabricanteCompra = {
  nome_fabricante: string | null;
  valor_total: number | string;
};


export type CompraMedicamento = {
  data_de_compra: string | null;
  modalidade_de_compra: string | null;
  tipo_da_compra: string | null;
  quantidade_de_itens: number | string | null;
  preco_unitario: number | string | null;
  preco_total: number | string | null;
  nome_fornecedor: string | null;
  nome_fabricante: string | null;
  nome_mantenedora: string | null;
};


export type HistoricoComprasResponse = {
  limite: number;
  offset: number;
  items: CompraMedicamento[];
};


export type FiltrosCompras = {
  data_inicio: string;
  data_fim: string;
  catmat_id?: number | null;
  tipo_compra?: string;
};


export type KpisCompras = {
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
  numero_fornecedores: number | string;
  numero_fabricantes: number | string;
  numero_mantenedoras: number | string;
};


export type CompraPorMes = {
  mes: string;
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
};


export type RankingFornecedorCompra = {
  fornecedor: string;
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
};


export type RankingFabricanteCompra = {
  fabricante: string;
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
};


export type CompraPorModalidade = {
  modalidade: string;
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
};


export type CompraPorTipo = {
  tipo_compra: string;
  valor_total: number | string;
  numero_compras: number | string;
  quantidade_itens: number | string;
};


export type CompraRecente = {
  data_de_compra: string | null;
  codigo_catmat: string | null;
  descricao_catmat: string | null;
  modalidade_de_compra: string | null;
  tipo_da_compra: string | null;
  quantidade_de_itens: number | string | null;
  preco_unitario: number | string | null;
  preco_total: number | string | null;
  nome_fornecedor: string | null;
  nome_fabricante: string | null;
  nome_mantenedora: string | null;
};


async function request<T>(
  path: string,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${path}`,
  );

  if (!response.ok) {
    let detail =
      `Erro HTTP ${response.status}`;

    try {
      const body =
        await response.json();

      if (body?.detail) {
        detail = body.detail;
      }
    } catch {
      // Mantém a mensagem HTTP.
    }

    throw new Error(detail);
  }

  return (await response.json()) as T;
}


function queryCompras(
  filtros: FiltrosCompras,
  adicionais: Record<string, string> = {},
) {
  const params = new URLSearchParams({
    data_inicio: filtros.data_inicio,
    data_fim: filtros.data_fim,
    ...adicionais,
  });

  if (filtros.catmat_id) {
    params.set(
      "catmat_id",
      String(filtros.catmat_id),
    );
  }

  if (filtros.tipo_compra) {
    params.set(
      "tipo_compra",
      filtros.tipo_compra,
    );
  }

  return params.toString();
}


export function buscarMedicamentos(
  termo: string,
): Promise<CatmatItem[]> {
  const query =
    new URLSearchParams({
      q: termo,
      limite: "200",
    });

  return request<CatmatItem[]>(
    `/api/medicamentos/busca?${query.toString()}`,
  );
}


export function listarProdutos(
  catmatId: number,
): Promise<Produto[]> {
  return request<Produto[]>(
    `/api/medicamentos/${catmatId}/produtos`,
  );
}


export function buscarResumoMedicamento(
  catmatId: number,
): Promise<ResumoMedicamento> {
  return request<ResumoMedicamento>(
    `/api/medicamentos/${catmatId}/resumo`,
  );
}


export function buscarLotesVencendo(
  catmatId: number,
  dias = 90,
): Promise<LotesVencendoResponse> {
  return request<LotesVencendoResponse>(
    `/api/medicamentos/${catmatId}/lotes-vencendo?dias=${dias}`,
  );
}


export function buscarEstoquePorUf(
  catmatId: number,
): Promise<EstoqueUf[]> {
  return request<EstoqueUf[]>(
    `/api/medicamentos/${catmatId}/estoque-por-uf`,
  );
}


export function buscarEvolucaoPreco(
  catmatId: number,
): Promise<EvolucaoPreco[]> {
  return request<EvolucaoPreco[]>(
    `/api/medicamentos/${catmatId}/compras/evolucao-preco`,
  );
}


export function buscarFornecedores(
  catmatId: number,
  limite = 15,
): Promise<FornecedorCompra[]> {
  return request<FornecedorCompra[]>(
    `/api/medicamentos/${catmatId}/compras/fornecedores?limite=${limite}`,
  );
}


export function buscarFabricantes(
  catmatId: number,
  limite = 15,
): Promise<FabricanteCompra[]> {
  return request<FabricanteCompra[]>(
    `/api/medicamentos/${catmatId}/compras/fabricantes?limite=${limite}`,
  );
}


export function buscarHistoricoCompras(
  catmatId: number,
  limite = 500,
  offset = 0,
): Promise<HistoricoComprasResponse> {
  return request<HistoricoComprasResponse>(
    `/api/medicamentos/${catmatId}/compras?limite=${limite}&offset=${offset}`,
  );
}


export function buscarKpisCompras(
  filtros: FiltrosCompras,
): Promise<KpisCompras> {
  return request<KpisCompras>(
    `/api/compras/kpis?${queryCompras(filtros)}`,
  );
}


export function buscarComprasPorMes(
  filtros: FiltrosCompras,
): Promise<CompraPorMes[]> {
  return request<CompraPorMes[]>(
    `/api/compras/por-mes?${queryCompras(filtros)}`,
  );
}


export function buscarRankingFornecedores(
  filtros: FiltrosCompras,
  limite = 15,
): Promise<RankingFornecedorCompra[]> {
  return request<RankingFornecedorCompra[]>(
    `/api/compras/fornecedores?${queryCompras(
      filtros,
      { limite: String(limite) },
    )}`,
  );
}


export function buscarRankingFabricantes(
  filtros: FiltrosCompras,
  limite = 15,
): Promise<RankingFabricanteCompra[]> {
  return request<RankingFabricanteCompra[]>(
    `/api/compras/fabricantes?${queryCompras(
      filtros,
      { limite: String(limite) },
    )}`,
  );
}


export function buscarComprasPorModalidade(
  filtros: FiltrosCompras,
): Promise<CompraPorModalidade[]> {
  return request<CompraPorModalidade[]>(
    `/api/compras/modalidades?${queryCompras(filtros)}`,
  );
}


export function buscarComprasPorTipo(
  filtros: FiltrosCompras,
): Promise<CompraPorTipo[]> {
  return request<CompraPorTipo[]>(
    `/api/compras/tipos?${queryCompras(filtros)}`,
  );
}


export function buscarComprasRecentes(
  filtros: FiltrosCompras,
  limite = 500,
): Promise<CompraRecente[]> {
  return request<CompraRecente[]>(
    `/api/compras/recentes?${queryCompras(
      filtros,
      { limite: String(limite) },
    )}`,
  );
}


export async function verificarBanco() {
  return request<{
    status: string;
    database: string;
    result: number;
  }>("/health/database");
}


export type ModoLeitos =
  | "ultima_competencia"
  | "ultima_instituicao";


export type IntervaloLeitos = {
  data_minima: string | null;
  data_maxima: string | null;
};


export type UfLeitos = {
  uf: string;
};


export type FiltrosLeitos = {
  modo: ModoLeitos;
  uf?: string;
};


export type KpisLeitos = {
  leitos_gerais: number | string;
  leitos_sus: number | string;
  leitos_uti: number | string;
  leitos_uti_sus: number | string;
  instituicoes_com_registro: number | string;
  competencia_minima: string | null;
  competencia_maxima: string | null;
};


export type LeitosPorUf = {
  uf: string;
  leitos_gerais: number | string;
  leitos_sus: number | string;
  leitos_uti: number | string;
  leitos_uti_sus: number | string;
  instituicoes: number | string;
};


export type TipoUti = {
  tipo_uti: string;
  total: number | string;
  sus: number | string;
};


export type EvolucaoLeitos = {
  competencia: string;
  leitos_gerais: number | string;
  leitos_sus: number | string;
  leitos_uti: number | string;
  leitos_uti_sus: number | string;
  instituicoes: number | string;
};


export type InstituicaoLeitos = {
  instituicao_id: number;
  instituicao: string;
  municipio: string;
  uf: string;
  competencia: string | null;
  leitos_gerais: number | string;
  leitos_sus: number | string;
  leitos_uti: number | string;
  leitos_uti_sus: number | string;
};


export type OpcoesLeitos = {
  data_minima: string | null;
  data_maxima: string | null;
  ufs: string[];
};


export type PainelLeitosResponse = {
  kpis: KpisLeitos;
  por_uf: LeitosPorUf[];
  tipos_uti: TipoUti[];
  evolucao: EvolucaoLeitos[];
  instituicoes: InstituicaoLeitos[];
};


function queryLeitos(
  filtros: FiltrosLeitos,
) {
  const params = new URLSearchParams({
    modo: filtros.modo,
  });

  if (filtros.uf) {
    params.set(
      "uf",
      filtros.uf,
    );
  }

  return params.toString();
}


export function buscarIntervaloLeitos(): Promise<IntervaloLeitos> {
  return request<IntervaloLeitos>(
    "/api/leitos/intervalo",
  );
}


export function buscarUfsLeitos(): Promise<UfLeitos[]> {
  return request<UfLeitos[]>(
    "/api/leitos/ufs",
  );
}


export function buscarKpisLeitos(
  filtros: FiltrosLeitos,
): Promise<KpisLeitos> {
  return request<KpisLeitos>(
    `/api/leitos/kpis?${queryLeitos(filtros)}`,
  );
}


export function buscarLeitosPorUf(
  filtros: FiltrosLeitos,
): Promise<LeitosPorUf[]> {
  return request<LeitosPorUf[]>(
    `/api/leitos/por-uf?${queryLeitos(filtros)}`,
  );
}


export function buscarTiposUti(
  filtros: FiltrosLeitos,
): Promise<TipoUti[]> {
  return request<TipoUti[]>(
    `/api/leitos/tipos-uti?${queryLeitos(filtros)}`,
  );
}


export function buscarEvolucaoLeitos(
  dataInicio: string,
  dataFim: string,
  uf = "",
): Promise<EvolucaoLeitos[]> {
  const params = new URLSearchParams({
    data_inicio: dataInicio,
    data_fim: dataFim,
  });

  if (uf) {
    params.set(
      "uf",
      uf,
    );
  }

  return request<EvolucaoLeitos[]>(
    `/api/leitos/evolucao?${params.toString()}`,
  );
}


export function buscarInstituicoesLeitos(
  filtros: FiltrosLeitos,
  limite = 100,
): Promise<InstituicaoLeitos[]> {
  const params = new URLSearchParams(
    queryLeitos(filtros),
  );

  params.set(
    "limite",
    String(limite),
  );

  return request<InstituicaoLeitos[]>(
    `/api/leitos/instituicoes?${params.toString()}`,
  );
}


export function buscarOpcoesLeitos():
Promise<OpcoesLeitos> {
  return request<OpcoesLeitos>(
    "/api/leitos/opcoes",
  );
}


export function buscarPainelLeitos(
  filtros: FiltrosLeitos,
  dataInicio: string,
  dataFim: string,
): Promise<PainelLeitosResponse> {
  const params = new URLSearchParams({
    modo: filtros.modo,
    data_inicio: dataInicio,
    data_fim: dataFim,
  });

  if (filtros.uf) {
    params.set(
      "uf",
      filtros.uf,
    );
  }

  return request<PainelLeitosResponse>(
    `/api/leitos/painel?${params.toString()}`,
  );
}