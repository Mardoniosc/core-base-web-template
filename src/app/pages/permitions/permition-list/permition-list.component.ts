import { Component, OnInit } from '@angular/core';
import { Permition, PermitionService } from '../shared';
import { BaseResourceListComponent } from 'src/app/shared/components';
import { Profile, ProfileService } from '../../profiles';
import { ProfilePermitionModel, ProfilePermitionService } from 'src/app/shared';
import toastr from 'toastr';

@Component({
  selector: 'app-permition-list',
  templateUrl: './permition-list.component.html',
  styleUrls: ['./permition-list.component.css'],
})
export class PermitionListComponent
  extends BaseResourceListComponent<Permition>
  implements OnInit {
  perfils: Profile[];
  status: string;
  perfilPermi: ProfilePermitionModel;
  perfilPermissao: ProfilePermitionModel[];

  constructor(
    protected permitionService: PermitionService,
    protected perfilService: ProfileService,
    protected ppService: ProfilePermitionService
  ) {
    super(permitionService);
  }

  ngOnInit() {
    this.carregaPerfil();
    this.carregaPerfilHasPermition();
    super.ngOnInit();
  }

  carregaPerfil() {
    this.perfilService.getAll().subscribe(
      (data) => (this.perfils = data),
      (err) => alert('Erro ao carregar perfils')
    );
  }
  carregaPerfilHasPermition() {
    this.ppService.getAll().subscribe(
      (data) => (this.perfilPermissao = data),
      (err) => alert('Erro ao carregar os Perfil e Permissão')
    );
  }

  permissaDescricao(id: number): string {
    const permissao = this.resources.find((x) => x.id === id);
    return permissao.descricao;
  }

  permissaoUrl(id: number): string {
    const permissao = this.resources.find((x) => x.id === id);
    return permissao.url;
  }

  perfiNome(id: number): string {
    const perfil = this.perfils.find((x) => x.id === id);
    return perfil.nome;
  }

  alterStatusPP(pp: ProfilePermitionModel): void {
    this.perfilPermi = pp;
    this.status = pp.status === 1 ? 'desativar' : 'ativar';
    this.perfilPermi.status = pp.status === 1 ? 0 : 1;
    this.ppService.update(this.perfilPermi).subscribe(
      (data) => {
        this.status === 'ativar' ? 'Ativado' : 'Desativado';
        if (this.status === 'ativar') {
          toastr.options.progressBar = true;
          toastr.success('Permissão ativada com sucesso!');
        } else {
          toastr.options.progressBar = true;
          toastr.info('Permissão desativada com sucesso!');
        }
      },
      (err) => {
        console.log('Erro ao atualizar permissão => ', err);
      }
    );
  }
}
