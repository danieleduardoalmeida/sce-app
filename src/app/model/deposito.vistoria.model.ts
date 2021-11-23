import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { DepositoModel } from './deposito.model';
import { VistoriaModel } from './vistoria.model';

@Serializable()
export class DepositoVistoriaModel{
    @JsonProperty() depositoId: number;
    @JsonProperty() vistoriaId: number;

    @JsonProperty() deposito: DepositoModel;
    @JsonProperty() vistoria: VistoriaModel;
}