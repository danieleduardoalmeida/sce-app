import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class ExemplarEspecieRelatorio{
    @JsonProperty() exemplar: string;
    @JsonProperty() especie: string;
}