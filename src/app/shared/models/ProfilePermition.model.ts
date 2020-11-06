import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class ProfilePermitionModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public perfilId?: number,
    public permissaoId?: number,
    public status?: number
  ) {
    super();
  }

  static fromJson(jsonData: any): ProfilePermitionModel {
    return Object.assign(new ProfilePermitionModel(), jsonData);
  }
}
