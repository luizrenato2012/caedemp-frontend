
export interface Empresa {
  id?: number;
  cnpj: string;
  nome: string;
  tipo: string;
  razaoSocial: string;
  contato: string;
  email: string;
  idMatriz?: number
  endereco: Endereco;
}

export interface Endereco {
  id?: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  estado: string;
  cidade: string
}