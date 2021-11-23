import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class ImovelModel {
    @JsonProperty() id: number;
    @JsonProperty() numero: number;
    @JsonProperty() numeroQuarteirao: number;
    @JsonProperty() rua: string;
    @JsonProperty() bairro: string;
    @JsonProperty() tipo: string;
    @JsonProperty() zona: string;
    @JsonProperty() cidade: string;
    @JsonProperty() lado: string;
    @JsonProperty() complemento: string;
    @JsonProperty() cep: string;
}