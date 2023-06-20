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
  async plants(): Promise<Plant[] | null> {
    console.log("----------------All Plants Registered-----------------", plants)
    return plants || null;
  }
  @Mutation(() => Plant)
  async createPlant(@Arg('data') data: CreatePlantInput) {
    const plant = {
      name: data.name,
      color: data.color,
      lastTimeWatered: data.lastTimeWatered
    }
    plants.push(plant)
    console.log("mutation", plants)
    return plant;
  }
}