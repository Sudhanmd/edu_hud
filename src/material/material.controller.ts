import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialDto, UPdateMaterialDto } from './material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialServices: MaterialService) {}

  @Post('addMaterial')
  async creatematerial(@Body() body: MaterialDto) {
    return await this.materialServices.creatematerial(body);
  }

  @Get('getAllMaterial')
  async getAllMaterial() {
    return await this.materialServices.getAllMaterial();
  }

  @Get('getMaterialByMaterialID/:materialID')
  async getMaterialById(@Param('materialID') id: string) {
    return await this.materialServices.getMaterialById(id);
  }

  @Get('getMaterialByCourseID/:courseID')
  async getByCourseId(@Param('courseID') id: string) {
    return await this.materialServices.getByCourseId(id);
  }

  @Put('updateMaterialByMaterialID/:materialID')
  async updateMaterialById(
    @Param('materialID') id: string,
    @Body() body: UPdateMaterialDto,
  ) {
    return await this.materialServices.updateMaterialById(id, body);
  }

  @Delete('deleteMaterialByMaterialID/:materialID')
  async deleteMaterialById(@Param('materialID') id: string) {
    return await this.materialServices.deleteMaterialById(id);
  }
}
