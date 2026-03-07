"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelAlerta = exports.PerfilUsuario = exports.CategoriaDestino = exports.TipoMovimentacao = exports.Categoria = void 0;
var Categoria;
(function (Categoria) {
    Categoria["ALIMENTO"] = "ALIMENTO";
    Categoria["ROUPA"] = "ROUPA";
    Categoria["HIGIENE"] = "HIGIENE";
    Categoria["BRINQUEDO"] = "BRINQUEDO";
    Categoria["LIMPEZA"] = "LIMPEZA";
    Categoria["OUTRO"] = "OUTRO";
})(Categoria || (exports.Categoria = Categoria = {}));
var TipoMovimentacao;
(function (TipoMovimentacao) {
    TipoMovimentacao["ENTRADA"] = "ENTRADA";
    TipoMovimentacao["SAIDA"] = "SAIDA";
})(TipoMovimentacao || (exports.TipoMovimentacao = TipoMovimentacao = {}));
var CategoriaDestino;
(function (CategoriaDestino) {
    CategoriaDestino["FAMILIA"] = "FAMILIA";
    CategoriaDestino["EVENTO"] = "EVENTO";
    CategoriaDestino["PARCEIRO"] = "PARCEIRO";
    CategoriaDestino["OUTRO"] = "OUTRO";
})(CategoriaDestino || (exports.CategoriaDestino = CategoriaDestino = {}));
var PerfilUsuario;
(function (PerfilUsuario) {
    PerfilUsuario["ADMIN"] = "ADMIN";
    PerfilUsuario["USUARIO"] = "USUARIO";
})(PerfilUsuario || (exports.PerfilUsuario = PerfilUsuario = {}));
var NivelAlerta;
(function (NivelAlerta) {
    NivelAlerta["VERDE"] = "VERDE";
    NivelAlerta["AMARELO"] = "AMARELO";
    NivelAlerta["VERMELHO"] = "VERMELHO";
})(NivelAlerta || (exports.NivelAlerta = NivelAlerta = {}));
//# sourceMappingURL=enums.js.map