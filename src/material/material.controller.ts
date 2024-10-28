import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialDto } from './material.dto';

@Controller('material')
export class MaterialController {
 
    constructor(private readonly materialServices:MaterialService) {}
    @Post('addMaterial')
    async creatematerial(@Body()body:MaterialDto){
        return await this.materialServices.creatematerial(body)
    }

    @Get('getAllMaterial')
     async getAllMaterial(){
        return await this.materialServices.getAllMaterial()
     }
    
     @Get('getMaterialByMaterialID/:materialID')
     async getMaterialById(@Param('id')id: string)
    { return await this.materialServices.getMaterialById(id)}

    @Get('getMaterialByCourseID/:courseID')
    async getByCourseId(@Param('id')id:string)
    {return await this.materialServices.getByCourseId(id)
    }

  @Put('updateMaterialByMaterialID/:materialID')
    async updateMaterialById(
      @Param('id') id: string,
      @Body() body:MaterialDto){
    return await this.materialServices.updateMaterialById(id,body)
  }

  @Delete('deleteMaterialByMaterialID/:materialID')
  async deleteMaterialById(@Param('Id') id: string) {
    return await this.materialServices.deleteMaterialById(id);
  }


}
