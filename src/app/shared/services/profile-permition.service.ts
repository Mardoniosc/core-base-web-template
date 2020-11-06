import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfilePermitionModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProfilePermitionService {
  private readonly PATH: string = '/api/perfilpermissao';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProfilePermitionModel[]> {
    return this.http.get<ProfilePermitionModel[]>(this.PATH);
  }

  getId(
    perfilID: number,
    permissaoId: number
  ): Observable<ProfilePermitionModel> {
    return this.http.get<ProfilePermitionModel>(
      `${this.PATH}/${perfilID}/${permissaoId}`
    );
  }

  update(perfilPermissao: ProfilePermitionModel): Observable<any> {
    return this.http.put(
      `${this.PATH}/${perfilPermissao.perfilId}/${perfilPermissao.permissaoId}`,
      perfilPermissao
    );
  }

  insert(perfilPermissao: ProfilePermitionModel): Observable<any> {
    return this.http.post(this.PATH, perfilPermissao);
  }
}
