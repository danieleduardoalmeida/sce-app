import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class DepositoModel{
    @JsonProperty() id: number;
    @JsonProperty() nome: string;
    @JsonProperty() codigo: string;
}