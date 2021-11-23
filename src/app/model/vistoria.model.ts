import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { ImovelModel } from './imovel.model';

@Serializable()
export class VistoriaModel{
    @JsonProperty() id: number;
    @JsonProperty() concluida: boolean;
    @JsonProperty() imovelFechado: boolean;
    @JsonProperty() recusada: boolean;
    @JsonProperty() dataVistoria: number;
    @JsonProperty() codigoAtividade: string;
    @JsonProperty() tipoVisita: string;
    @JsonProperty() tipo: number;
    @JsonProperty() usuarioId: number;
    @JsonProperty() imovelId: number;

    @JsonProperty() imovel: ImovelModel;
}
