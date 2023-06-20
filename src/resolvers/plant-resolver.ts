import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreatePlantInput } from "../dtos/inputs/create-plant-input";
import { Plant } from "../dtos/models/plant-model";

const plants: Plant[] = []

@Resolver()
export class PlantResolver {

  @Query(() => [Plant], { nullable: true })
  async plantByLastTimeWatered(
    @Arg('data', () => Date) lastTimeWatered: Date
  ): Promise<Plant[] | null> {
    const plant = plants.filter(p => p.lastTimeWatered.getTime() === lastTimeWatered.getTime());
    console.log("----------------query-----------------", plant)
    return plant
  }
  @Query(() => [Plant], { nullable: true })
  async plants(
    @Arg('first', { nullable: true }) first: number,
    @Arg('after', { nullable: true }) after: string,
    @Arg('sort', { nullable: true }) sort: string,
  ): Promise<Plant[] | null> {
    let filteredPlants = plants;

    if (after) {
      const index = filteredPlants.findIndex(plant => plant.name === after);
      if (index === -1) {
        throw new Error(`Planta com o nome '${after}' não encontrada.`);
      }
      filteredPlants = filteredPlants.slice(index + 1);
    }

    if (sort == "CRESC") {
      filteredPlants = filteredPlants.sort((a, b) => a.lastTimeWatered.getTime() - b.lastTimeWatered.getTime());
    }
    else if (sort == "DESC") {
      filteredPlants = filteredPlants.sort((a, b) => b.lastTimeWatered.getTime() - a.lastTimeWatered.getTime());
    }

    if (first) {
      filteredPlants = filteredPlants.slice(0, first);
    }

    console.log("----------------All Plants Registered-----------------", filteredPlants);
    return filteredPlants || null;
  }

  @Mutation(() => Plant)
  async createPlant(@Arg('data') data: CreatePlantInput) {
    const plant = {
      name: data.name,
      color: data.color,
      lastTimeWatered: data.lastTimeWatered,
    }
    plants.push(plant)
    console.log("mutation", plants)
    return plant;
  }
}