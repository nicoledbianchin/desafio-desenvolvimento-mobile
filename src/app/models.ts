export interface Produto {
    id: number;
    imagem: string;
    nome: string;
    valor: number;
}

export interface Catalogo {
    Acessorios: Produto[];
    Adesivos: Produto[];
    Placas: Produto[];
}

export interface ProdutoCarrinho {
    id: number;
    nome: string;
    quantidade: number;
    valor: number;
    key?: string;
}

export interface UserResponse {
    result?: {
        email?: string;
        uid?: string;
        user?: any;
    };
    error?: {
        code?: string;
        message?: string;
    };
}
