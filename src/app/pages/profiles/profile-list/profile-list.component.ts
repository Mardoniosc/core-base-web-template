import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from '../shared';
import { BaseResourceListComponent } from 'src/app/shared/components';
import { ProfilePermitionModel } from 'src/app/shared';
import { Permition, PermitionService } from '../../permitions/shared';
import { ProfilePermitionService } from 'src/app/shared/services/profile-permition.service';
import toastr from 'toastr';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent
  extends BaseResourceListComponent<Profile>
  implements OnInit {
  perfilPermissao: ProfilePermitionModel[] = [];
  perfilPermi: ProfilePermitionModel;
  permissoes: Permition[] = [];

  constructor(
    protected profileService: ProfileService,
    protected permitionService: PermitionService,
    protected ppService: ProfilePermitionService
  ) {
    super(profileService);
  }

  ngOnInit() {
    this.carregaPP();
    this.carregaPermitions();
    super.ngOnInit();
  }

  protected carregaPermitions(): void {
    this.permitionService.getAll().subscribe(
      (data) => (this.permissoes = data),
      (err) => console.error('Erro', err)
    );
  }

  protected carregaPP(): void {
    this.ppService.getAll().subscribe(
      (data) => (this.perfilPermissao = data),
      (err) => console.error('Erro', err)
    );
  }

  verificaPermissao(perfil: number, permissao: number): boolean {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao
    );
    if (response) {
      return true;
    }
    return false;
  }

  atualizaStatus(perfil: number, permissao: number) {
    let status = '';
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao
    );

    if (!response) {
      toastr.error('Erro ao tentar atualizar', 'Erro');
      return;
    }
    this.perfilPermi = response;
    if (this.perfilPermi.status === 1) {
      status = 'desativar';
    } else {
      status = 'ativar';
    }
    this.perfilPermi.status = status === 'ativar' ? 1 : 0;
    this.ppService.update(this.perfilPermi).subscribe(
      (data) => {
        status === 'ativar' ? 'Ativado' : 'Desativado';
        if (status === 'ativar') {
          toastr.options.progressBar = true;
          toastr.success('Permissão ativada com sucesso!');
        } else {
          toastr.options.progressBar = true;
          toastr.info('Permissão desativada com sucesso!');
        }
      },
      (err) => {
        toastr.error(err.error.error);
      }
    );
  }

  pegaStatusAtual(perfil: number, permissao: number): string {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao
    );
    if (!response) {
      return 'dafault';
    }
    return response.status === 1 ? 'primary' : 'dafault';
  }
}
