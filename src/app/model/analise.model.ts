import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class AnaliseModel{
    @JsonProperty() id: number;
    @JsonProperty() vistoriaId: number;
    @JsonProperty() dataEntrada: number;
    @JsonProperty() dataConclusao: number;
    @JsonProperty() laboratorio: string;
    @JsonProperty() laboratorista: string;

    dataEntradaFormatada: string;
    dataConclusaoFormatada: string;
}