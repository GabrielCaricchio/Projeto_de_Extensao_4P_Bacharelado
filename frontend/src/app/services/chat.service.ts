import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponsePayload {
  reply: string;
  sender: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/chat';

  enviarMensagem(mensagem: string): Observable<ChatResponsePayload> {
    return this.http.post<ChatResponsePayload>(this.apiUrl, { message: mensagem });
  }
}

