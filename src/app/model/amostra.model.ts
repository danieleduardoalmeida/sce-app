import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { DepositoModel } from './deposito.model';
import { VistoriaModel } from './vistoria.model';
import { AnaliseModel } from './analise.model';

@Serializable()
export class AmostraModel{
    @JsonProperty() id: number;
    @JsonProperty() analiseId: number;
    @JsonProperty() vistoriaId: number;
    @JsonProperty() depositoId: number;
    @JsonProperty() tipo: string;
    @JsonProperty() quantidadeTubitos: number;

    @JsonProperty() deposito: DepositoModel;
    @JsonProperty() vistoria: VistoriaModel;
    @JsonProperty() analise: AnaliseModel;
}