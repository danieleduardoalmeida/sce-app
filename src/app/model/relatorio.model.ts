import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { ExemplarEspecieRelatorio } from './exemplar.especie.relatorio';

@Serializable()
export class RelatorioModel{
    @JsonProperty() concluida: boolean;
    @JsonProperty() imovelFechado: boolean;
    @JsonProperty() recusada: boolean;
    @JsonProperty() dataVistoria: number;
    @JsonProperty() codigoAtividade: string;
    @JsonProperty() tipoVisita: string;
    @JsonProperty() rua: string;
    @JsonProperty() bairro: string;
    @JsonProperty() tipo: number;
    @JsonProperty() numero: number;
    @JsonProperty() quantidadeDepositosEliminados: number;
    @JsonProperty() exemplarEspecie: ExemplarEspecieRelatorio[];
}