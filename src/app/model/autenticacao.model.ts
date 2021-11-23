import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class AutenticacaoModel {
    @JsonProperty() usuario: string;
    @JsonProperty() senha: string;
}