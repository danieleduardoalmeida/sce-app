import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { AnaliseModel } from './analise.model';
import { EspecieModel } from './especie.model';

@Serializable()
export class AnaliseEspecieModel{

    @JsonProperty() analiseId: number;
    @JsonProperty() especieId: number;

    @JsonProperty() analise: AnaliseModel;
    @JsonProperty() especie: EspecieModel;
}