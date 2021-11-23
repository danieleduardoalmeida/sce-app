import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class EspecieModel{
    @JsonProperty() id: number;
    @JsonProperty() nome: string;

    especieSelecionada: boolean = false;
}