import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class TratamentoModel{
    @JsonProperty() id: number;
    @JsonProperty() depositoId: number;
    @JsonProperty() vistoriaId: number;
    @JsonProperty() quantidadeDepositosEliminados: number;
    @JsonProperty() tipoLarvicida1: string;
    @JsonProperty() quantidadeLarvicida1: number;
    @JsonProperty() tipoLarvicida2: string;
    @JsonProperty() quantidadeLarvicida2: number;
    @JsonProperty() tipoAdulticida: string;
    @JsonProperty() quantidadeCargasAdulticida: number;
    @JsonProperty() quantidadeDepositosLarvicida1: number;
    @JsonProperty() quantidadeDepositosLarvicida2: number;
}