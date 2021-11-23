import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { AnaliseModel } from './analise.model';
import { EspecieModel } from './especie.model';
import { ExemplarModel } from './exemplar.model';

@Serializable()
export class ExemplarAnaliseEspecieModel{

    @JsonProperty() exemplarId: number;
    @JsonProperty() analiseId: number;
    @JsonProperty() especieId: number;
    @JsonProperty() quantidade: number;

    @JsonProperty() analise: AnaliseModel;
    @JsonProperty() especie: EspecieModel;
    @JsonProperty() exemplar: ExemplarModel;
}