import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class SenhaModel {
    @JsonProperty() usuario: string;
    @JsonProperty() senhaAntiga: string;
    @JsonProperty() senhaNova: string;
}