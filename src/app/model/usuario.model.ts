import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class UsuarioModel {
    @JsonProperty() id: number
    @JsonProperty() nome: string;
    @JsonProperty() email:string;
    @JsonProperty() tipo:string;
    @JsonProperty() login: string;
    @JsonProperty() senha: string;
    @JsonProperty() telefone: string;
}