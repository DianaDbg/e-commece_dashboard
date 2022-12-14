import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File as FileModel } from 'src/app/protected/product/models/file';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly baseUrl = environment.baseUrl + 'files';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  saveFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<FileModel>(this.baseUrl, formData, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
