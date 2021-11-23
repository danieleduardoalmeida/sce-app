import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class ExemplarModel{
    @JsonProperty() id: number;
    @JsonProperty() nome: string;
}